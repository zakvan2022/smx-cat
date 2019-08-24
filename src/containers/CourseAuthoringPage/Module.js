
import React, { Component } from 'react';
import { Button, Navbar, NavbarHeading, NavbarGroup, Alignment, EditableText, H3, H4 } from "@blueprintjs/core";
import { connect } from 'react-redux';
import * as action_lessons from "../../actions/lessons";
import * as action_modules from "../../actions/modules";
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <span className="grippy"></span>);

const SortableLessonMenu = sortableElement(({value, selected, clickHandle}) => (
  <div className="sm-noselect  Showcase__style__stylizedItem">
    {selected?
      <div className="sm-bg-gray mid-LR-padding small-TB-padding"><H4 className="sm-font-weight-normal sm-gray no-margin sm-action-cursor" onClick={clickHandle}><DragHandle />{value}</H4></div>:
      <div className="mid-LR-padding small-TB-padding"><H4 className="sm-font-weight-normal sm-gray no-margin sm-action-cursor" onClick={clickHandle}><DragHandle />{value}</H4></div>
    }
  </div>
));

const SortableLessonContainer = sortableContainer(({children}) => {
  return <div className="sm-nostyle">{children}</div>;
});

class Module extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pages: [],
    }
  }
  componentDidMount(){
    if (this.props.data)
      this.setState({pages: this.props.data.pages});
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      this.setState({
        pages: nextProps.data.pages,
      });
    }
  }
  selectLesson(id) {
    this.props.dispatch(action_lessons.get(id));
    this.props.dispatch(action_modules.requestDeselectModule());
  }
  selectModule(id){
    this.props.dispatch(action_modules.get(id));
    this.props.dispatch(action_lessons.requestDeselectLesson());
  }
  addNewLesson(module_id){
    this.props.dispatch(action_lessons.requestAddLesson(module_id));
    this.props.dispatch(action_lessons.requestEditToLesson());
    this.props.dispatch(action_modules.requestDeselectModule());
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({pages}) => ({
      pages: arrayMove(pages, oldIndex, newIndex),
    }));
    this.state.pages.map((page, index) => {
      this.props.dispatch(action_lessons.order(page.id, {order: index}));
    });
  };
  render () {
    return (
        <div className="sm-module">
            <H3 className={(this.props.modules.selected.id==this.props.data.id)?"sm-action-cursor sm-gray sm-bg-gray mid-LR-padding small-TB-padding":"sm-action-cursor sm-gray mid-LR-padding small-TB-padding"} onClick={()=>this.selectModule(this.props.data.id)}>{this.props.dranghandle}{this.props.data.title}</H3>
            <SortableLessonContainer onSortEnd={this.onSortEnd} useDragHandle>
            {this.state.pages.map((page, index) => {
                return(
                    <SortableLessonMenu key={`item-${index}`} index={index} value={page.title} selected={(this.props.lessons.selected.id==page.id)?true:false} clickHandle={()=>this.selectLesson(page.id)}/>
                )
            })}
            </SortableLessonContainer>
            <H4 className="sm-action-cursor sm-light-gray2 mid-LR-padding small-TB-padding sm-font-weight-normal" onClick={()=>this.addNewLesson(this.props.data.id)}><i>Add a new lesson ...</i></H4>
        </div>
    )
  }
}
  const mapStateToProps = state => {
    return {
      modules: state.modules,
      lessons: state.lessons,
    };
  };
  export default connect(mapStateToProps)(Module); 