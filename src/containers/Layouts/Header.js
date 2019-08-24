import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, NavbarHeading, NavbarGroup, Alignment} from "@blueprintjs/core";
import {Row, Col } from 'react-bootstrap';
import { BrowserRouter, Redirect, Link } from "react-router-dom";
import './style.css';
import TeamDialog from '../Dialogs/TeamDialog';

class Header extends Component {
  constructor(...args) {
    super(...args);
    this.state={isOpen:false, toDashboard: false}
    this.handleTeamClick = this.handleTeamClick.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
    this.goToList = this.goToList.bind(this);
  }
  componentWillMount() {
    // console.log("header -> "+this.props.id);
    // this.setState({id: this.props.id})

  }
  handleTeamClick(){
    this.setState({
      isOpen: true
    });
  }
  handleCloseButton() {
    this.setState({
      isOpen: false
    });
  }
  goToList() {
    // this.setState({toDashboard: true});
    window.location.href="/";
  }
  render() {
    let {selected} = this.props.courses;
    // if (this.state.toDashboard === true) {
    //   return <Redirect to='/' />
    // }
    return (
      <div>
        <Row>
            <Col>
            <Navbar>
            <NavbarGroup >
                <NavbarHeading><Button className="bp3-minimal" icon="arrow-left" align={Alignment.LEFT} text={selected && selected.title} onClick={this.goToList}/></NavbarHeading>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
              {selected.id!=null?<Button className="sm-clist-plusbtn" intent="primary" text="Team" align={Alignment.RIGHT} onClick={this.handleTeamClick}/>:null}
              <Button className="bp3-minimal" icon="cog" align={Alignment.RIGHT}/>
            </NavbarGroup>
            </Navbar> 
            <Navbar>
            <NavbarGroup >
                {selected.id!=null?<Link className="sm-header-menu" to={"/cat/courses/"+selected.id+"/edit"} >Content</Link>:null}
                {/* {this.props.id!="null"?<Link className="sm-header-menu" to={"/cat/courses/"+this.props.id+"/edit"} >Content</Link>:null} */}
                <Link className="sm-header-menu" to={"/cat/courses/"+this.props.id+"/details"} >Details</Link>
            </NavbarGroup>
            </Navbar> 
            </Col>
        </Row>
        <TeamDialog id={selected.id} isOpen={this.state.isOpen} closeHandle={this.handleCloseButton}/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    courses: state.courses,
  };
};
export default connect(mapStateToProps)(Header); 
