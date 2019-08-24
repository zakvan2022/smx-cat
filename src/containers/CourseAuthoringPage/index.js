import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col } from 'react-bootstrap';
import CourseEdit from "./CourseEdit";
import CourseContent from "./CourseContent";
import Header from "../Layouts/Header";
import * as action_courses from "../../actions/courses";
import './editorstyle.css';
import BeforeLeave from 'react-before-leave';
class CourseAuthoringPage extends Component {
  constructor(...args) {
    super(...args);
    this.state={
      id: null,
      changed: false,
    }
    this.onChanged = this.onChanged.bind(this);
  }
  componentWillMount() {
    const {id} = this.props.match.params;
    this.setState({id: id});
    this.props.dispatch(action_courses.get(id));
  }
  onChanged(flag) {
    this.setState({
      changed: flag,
    })
  }
  render() {
    return (
      <div className="sm-body">
        {this.state.changed?<BeforeLeave
            message="Are you sure you want to leave without saving?"
            enableUnload={true}
            enableRouter={true}
            exact={true}
        />:null}
        <Header id={this.state.id}/>
        <Row className="sm-cedit-body">
            <Col className="nopadding" xs={12} sm={3}><CourseContent id={this.state.id}/></Col>
            <Col className="nopadding" xs={12} sm={6}><CourseEdit onChanged={this.onChanged} id={this.state.id}/></Col>
            <Col className="nopadding" xs={12} sm={3}></Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courselist: state.courses.data,
  };
};
export default connect(mapStateToProps)(CourseAuthoringPage); 
