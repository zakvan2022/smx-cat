import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, NavbarHeading, NavbarGroup, Alignment} from "@blueprintjs/core";
import {Row, Col } from 'react-bootstrap';
import CourseEdit from "./CourseEdit";
import Header from "../Layouts/Header";
import * as action_courses from "../../actions/courses";
class CourseDetailsPage extends Component {
  constructor(...args) {
    super(...args);
    this.state={id: null}
  }
  componentWillMount() {
    const {id} = this.props.match.params
    this.setState({id: id});
    this.props.dispatch(action_courses.get(id));
  }
  render() {

    return (
      <div className="sm-body">
        <Header id={this.state.id}/>
        <Row className="sm-cedit-body">
            <Col className="nopadding" xs={12} sm={3}></Col>
            <Col className="nopadding" xs={12} sm={6}><CourseEdit /></Col>
            <Col className="nopadding" xs={12} sm={3}></Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(CourseDetailsPage); 
