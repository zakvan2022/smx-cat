import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, NavbarHeading, NavbarGroup, Alignment, Divider, H1, H5, H6 } from "@blueprintjs/core";
import { Container, Row, Col } from 'react-bootstrap';
import * as action_courses from "../../actions/courses";
import { Link } from "react-router-dom";
class CourseListPage extends Component {
  constructor(...args) {
    super(...args);
  }
  componentDidMount() {
    this.props.dispatch(action_courses.getCourses());
  }
  render() {
    return (
      <div className="sm-body">
        <Navbar>
          <NavbarGroup >
            <NavbarHeading><H5>CourseList</H5></NavbarHeading>
            </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
              <Button className="bp3-minimal" icon="cog" align={Alignment.RIGHT}/>
          </NavbarGroup>
        </Navbar> 
        <Container className="sm-clist-container">
          <Row>
            <Col>
              <Link to={"/cat/courses/null/details"}><Button className="sm-clist-plusbtn" intent="primary" icon="plus" text="New"/></Link> 
            </Col>
          </Row>
          <Row className="sm-clist-header">
            <Col xs={12} align={Alignment.LEFT}> <H6>Course Title</H6> </Col>
          </Row>
          <Divider />
          {this.props.courselist.map((course, index) => {
            return(
              <Row className="sm-clist-item" key={index}>
                <Col xs={12} align={Alignment.LEFT}> <a href={"/cat/courses/"+course.id+"/edit"}>{course.title}</a> </Col>
              </Row>
            )
          })}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courselist: state.courses.data,
  };
};

export default connect(mapStateToProps)(CourseListPage); 
