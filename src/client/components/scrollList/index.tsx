import React from "react";

interface Props {
  itemHeight: number;
  dataIds: string[];
  generateListElementFunc: (start: number, end: number) => {};
}

interface State {
  start: number,
  end: number
}

export class ScrollList extends React.Component<Props, State> {
  private lazyscroll: React.RefObject<HTMLInputElement>;
  private numVisibleItems: number;
  constructor(props: Props) {
    super(props);
    this.lazyscroll = React.createRef();
    this.numVisibleItems= Math.round(800 / this.props.itemHeight);
    this.state = {
      start: 0,
      end: this.numVisibleItems  
    };
  }

  onScroll = () => {
    const node = this.lazyscroll.current; 
    if (node) {
      let sizeOfList = this.props.dataIds.length;
      let currentIndx = Math.round(node.scrollTop / this.props.itemHeight)
      currentIndx = (currentIndx - this.numVisibleItems >= sizeOfList) ? (currentIndx - this.numVisibleItems) : currentIndx;
      if (currentIndx !== this.state.start) {
          let start = currentIndx;
          let end = (currentIndx + this.numVisibleItems >= sizeOfList) ? (sizeOfList - 1) : currentIndx+this.numVisibleItems;
          this.setState({start: start, end: end });
       }
    }
  }

  render () {
    return (
      <div className="table-body" ref={this.lazyscroll} onScroll={this.onScroll} >
        <div className="container" style={{height: this.props.dataIds.length * this.props.itemHeight}}>
          {(this.props.generateListElementFunc(this.state.start, this.state.end))}
            {/* {this.props.dataIds.map((id: string, index: number) => {
              //if (element.index >= this.state.start && element.index <= this.state.end) {
                    return (this.props.generateListElementFunc(this.state.start, this.state.end))
              //    }       
              })};         */}
          </div>
      </div>
      )
  }
}
