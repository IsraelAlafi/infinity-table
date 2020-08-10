import React from "react";
import {generatePromotions, deletePromotion, editPromotion, duplicatePromotion} from '../../services/api'
import {Col, Row, NavDropdown, Nav, Button} from 'react-bootstrap'
import {Promotion} from '../interfaces'
import {ListItem} from '../listItem/index'
import {ScrollList} from '../scrollList/index'
import './style.scss';


interface State {
  promotionIds: string[];
  selectedRowsIds: string[];
  editPromotionData: Record<number, Promotion>
  isEditable: boolean;
  isGenerateBtnClicked: boolean;
}

interface Props {}

export class Home extends React.Component<Props, State> {
  promotionsData: Record<string, Promotion> = {};
  private itemHeight: number;
  constructor(props: Props) {
    super(props);
    this.itemHeight = 40;
    this.state = {
      promotionIds: [],
      selectedRowsIds: [],
      editPromotionData: {},
      isEditable: false,
      isGenerateBtnClicked: false
    };
  }
  
  onGettingTableData = async (promotionsData) => {
    this.promotionsData = promotionsData;
    this.setState({promotionIds: Object.keys(this.promotionsData),
                   isGenerateBtnClicked: false});
  }

  onGenerateTable = async () => {
    this.setState({isGenerateBtnClicked: true});
    generatePromotions().then((data) => this.onGettingTableData(data));
  }

  onEditRow = () => {
    this.setState({isEditable: true});
  }

  onEditSaveChanges = async () => {
    let editPromotions: Record<string, Promotion> = await editPromotion(this.state.editPromotionData);
    Object.keys(this.promotionsData)
    .filter(key => Object.keys(editPromotions).includes(key))
    .forEach(key => this.promotionsData[key] = editPromotions[key]);
    this.setState({isEditable: false,
                   selectedRowsIds: [],
                   editPromotionData: {}});
  }

  onDeleteRow = async () => {
    let deletedPromotionsIds: string[] = await deletePromotion(this.state.selectedRowsIds);
    Object.keys(this.promotionsData)
    .filter(key => deletedPromotionsIds.includes(key))
    .forEach(key => delete this.promotionsData[key]);
    this.setState({promotionIds: Object.keys(this.promotionsData),
                   selectedRowsIds: []});
  }

  onDuplicateRow = async () => {
    let duplicatedPromotions : Record<string, Promotion> = await duplicatePromotion(this.state.selectedRowsIds);
    this.promotionsData = {...this.promotionsData, ...duplicatedPromotions};
    this.setState({promotionIds: Object.keys(this.promotionsData)});
  }

  onChangeRowCheckBox = (val: string) => {
    var copySelectRows = [...this.state.selectedRowsIds]; 
    const index = this.state.selectedRowsIds.indexOf(val, 0);
    if (index > -1) {
      copySelectRows.splice(index, 1);
    } else {
      copySelectRows.push(val);
    }
    this.setState({selectedRowsIds: copySelectRows});
  }

  onChangePromotionName = (event: any, id: string) => {
    let editPromotionData = {...this.state.editPromotionData};
    editPromotionData[parseInt(id)] = {id: parseInt(id), name: event.target.value} as Promotion;
    this.setState({editPromotionData: editPromotionData});
  }

  generateItemList = (start: number, end: number): JSX.Element[] => {
    let dataList = this.state.promotionIds.map((id: string, index: number) => {
      if (index >= start && index <= end) {
      const isEditRowsMode = this.state.isEditable && this.state.selectedRowsIds.includes(id);
          return (
            <ListItem key={index} top={index * this.itemHeight} itemheight={this.itemHeight}>
              <Col>
                <input type="checkbox" checked={this.state.selectedRowsIds.includes(id)} value={id} onChange={() => this.onChangeRowCheckBox(id)}/>
              </Col> 
              <Col>{isEditRowsMode &&
                    <input type="text" defaultValue={this.promotionsData[id].name} onChange={(event) => this.onChangePromotionName(event, id)} className="form-control"/>
                  } 
                  {!isEditRowsMode && <span> {this.promotionsData[id].name} </span>}
              </Col> 
              <Col> {this.promotionsData[id].type} </Col> 
              <Col> {this.promotionsData[id].start}</Col> 
              <Col> {this.promotionsData[id].end} </Col> 
              <Col> {this.promotionsData[id].userGroupName}</Col> 
            </ListItem>)
        } 
    });   
    return dataList.filter(elem => typeof(elem) != 'undefined') as JSX.Element[];      
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="actions">
            <label>Actions: </label> 
              <Nav className="drop-down-action">
                    { this.state.isGenerateBtnClicked &&
                    <Button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      {` Loading...`}
                    </Button>
                    }
                    {!this.state.isGenerateBtnClicked && <Button className="generate-table-btn" onClick={this.onGenerateTable} >Generate Table</Button> }
                    {!this.state.isEditable && 
                    <NavDropdown title="Table Action"  id="nav-dropdown" disabled={this.state.selectedRowsIds.length == 0}>
                      <NavDropdown.Item onClick={this.onEditRow}>Edit</NavDropdown.Item>
                      <NavDropdown.Item onClick={this.onDeleteRow}>Delete</NavDropdown.Item>
                      <NavDropdown.Item onClick={this.onDuplicateRow}>Duplicate</NavDropdown.Item>
                    </NavDropdown>
                    }
                    {this.state.isEditable &&
                      <Button className="generate-table-btn btn-success" onClick={this.onEditSaveChanges}>Save changes</Button>
                    }
              </Nav>
          </div>
            <Row className="titles">
              <Col> Checkbox</Col> 
              <Col> Name </Col> 
              <Col> Type </Col> 
              <Col> Start Date</Col> 
              <Col> End Date</Col> 
              <Col> User Group</Col> 
            </Row>

            <ScrollList dataIds={this.state.promotionIds} itemHeight={this.itemHeight} generateListElementFunc={this.generateItemList}/>
        </div>
      </>
    );
  }
}
