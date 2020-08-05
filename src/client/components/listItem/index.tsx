import React from "react";
import {Row} from 'react-bootstrap'
import './style.scss';

interface Props {
  top: number;
  itemheight: number;
}

interface State {}

export class ListItem extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render () {
    return (
      <Row className="row-table" style={{top: this.props.top, height: this.props.itemheight}}> 
              {this.props.children}
      </Row>
      )
  }
}
