import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Switch, TextArea, NumericInput} from "@blueprintjs/core";
import * as action_courses from "../../actions/courses";
import FormGroup from "../../components/FormGroup";
import { Row, Col } from 'react-bootstrap';
import Editor from "../../components/Editor";
import './style.css';

class CourseEdit extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      course: {}
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSlugChange = this.handleSlugChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.handlePublicChange = this.handlePublicChange.bind(this);
    this.createOrUpdated = this.createOrUpdated.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.courses.selected != nextProps.courses.selected) {
      this.setState({
        course: nextProps.courses.selected,
      });
    }
  }
  handlePublicChange() {
    this.setState({
      course:{
        ...this.state.course,
        is_published: !this.state.course.is_published
      },
      is_changed: true
    });
  }
  handleTitleChange(event){
    this.setState({
      course:{
        ...this.state.course,
        title: event.target.value
      },
      is_changed: true
    });
  };
  handlePriceChange(text){
    this.setState({
      course:{
        ...this.state.course,
        price: text
      },
      is_changed: true
    });
  };
  handleSlugChange(event){
    this.setState({
      course:{
        ...this.state.course,
        slug: event.target.value
      },
      is_changed: true
    });
  };
  handleDescChange(event){
    this.setState({
      course:{
        ...this.state.course,
        description: event.target.value
      },
      is_changed: true
    });
  };
  contentChange(text) {
    this.setState({
      course:{
        ...this.state.course,
        sales_copy: text,
      },
      is_changed: true
    });
  }
  createOrUpdated(){
    if (this.state.course.id == null){
      this.props.dispatch(action_courses.create(this.state.course));
    } else  if (this.state.course.id != null){
      this.props.dispatch(action_courses.update(this.state.course.id, this.state.course));
    }
  }
  remove(){
    if (this.state.course.id != null){
      this.props.dispatch(action_courses.remove(this.state.course.id));
    }
  }

  render() {
    let selected = this.state.course;
    return (
      <div className="sm-cedit-content mid-top-padding large-LR-padding">
        <FormGroup labelFor="Course(required)">
          <input className="bp3-input .modifier sm-course-title" onChange={this.handleTitleChange} type="text" placeholder="Text input" dir="auto" value={selected.title?selected.title:""}/>
        </FormGroup>
        <Row>
          <Col><FormGroup labelFor="Price(required)">
            <NumericInput className="sm-course-price" fill={true} max={300} min={0} onValueChange={this.handlePriceChange} placeholder="Enter a number ... " value={selected.price?selected.price:""} />
          </FormGroup></Col>
          <Col><FormGroup labelFor="Slug(required)">
            <input className="bp3-input .modifier sm-course-slug" onChange={this.handleSlugChange} type="text" placeholder="Text input" dir="auto" value={selected.slug?selected.slug:""} />
          </FormGroup></Col>
        </Row>
        <FormGroup labelFor="Desc(required)">
          <TextArea growVertically={true} large={true} className = "sm-course-desc" onChange={this.handleDescChange} value={selected.description}/>
        </FormGroup>
        <FormGroup labelFor="Sales Copy(required)">
          <Editor className="sm-course-salescopy" onContentChange = {this.contentChange} value={selected.sales_copy}/>
        </FormGroup>
        <div className="sm-fixed-bottom mid-LR-padding">
            <Button className="bp3-minimal layout-align-left" intent="danger" onClick={this.remove} disabled={this.state.course.id?false:true}>Delete</Button>
            <Button className="small-margin layout-align-right sm-clist-plusbtn" intent="primary" text="Save" disabled={!this.state.is_changed} onClick={this.createOrUpdated}/> 
            <Switch className="small-margin layout-align-right" checked={this.state.course.is_published?true:false} label="Published" onChange={this.handlePublicChange}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};
export default connect(mapStateToProps)(CourseEdit); 