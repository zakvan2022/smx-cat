import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, H3, H4 } from "@blueprintjs/core";
import * as action_modules from "../../actions/modules";
import * as action_lessons from "../../actions/lessons";
import Module from "./Module";
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <span className="grippy"></span>);

const SortableModuleMenu = sortableElement(({value}) => (
  <div className="sm-noselect">
    {/* <DragHandle /><Module data={value} /> */}
    <Module data={value} dranghandle={<DragHandle />}/>
  </div>
));
const SortableModuleContainer = sortableContainer(({children}) => {
  return <div className="sm-nostyle">{children}</div>;
});

class CourseContent extends Component {
  constructor(...args) {
    super(...args);
    this.state = {modulelist:[]}
  }
  componentDidMount() {
    this.props.dispatch(action_modules.getModuleList(this.props.id));
    this.addNewModule(this.props.id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.modulelist != nextProps.modulelist) {
      this.setState({
        modulelist: nextProps.modulelist,
      });
    }
  }
  addNewModule(id){
    this.props.dispatch(action_modules.requestAddModule(id));
    this.props.dispatch(action_modules.requestEditToModule());
    this.props.dispatch(action_lessons.requestDeselectLesson());
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({modulelist}) => ({
      modulelist: arrayMove(modulelist, oldIndex, newIndex),
    }));
    this.state.modulelist.map((item, index) => {
      this.props.dispatch(action_modules.order(item.id, {order: index}));
    });
  };
  render() {
    return (
      <div className="sm-course-content">
        <H4 className="sm-light-gray mid-LR-padding">COURSE CONTENT</H4>
        <SortableModuleContainer onSortEnd={this.onSortEnd} useDragHandle>
        {this.state.modulelist.map((data, index) => {
          return(
            <SortableModuleMenu key={`item-${index}`} index={index} value={data}/>
          )
        })}
        <Button className="bp3-large sm-btn-add-module" text="ADD MODULE" onClick={()=>this.addNewModule(this.props.id)}/>
        </SortableModuleContainer>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    modulelist: state.modules.data,
  };
};
export default connect(mapStateToProps)(CourseContent); 
