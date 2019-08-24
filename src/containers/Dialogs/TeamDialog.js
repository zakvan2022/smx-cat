import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, HTMLSelect, Divider, H5, Dialog, Classes, Alignment} from "@blueprintjs/core";
import {Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as action_teams from "../../actions/teams";
import "./style.css";

const OPTIONS = [
    { label: "Role", value: "" },
    { label: "Contributor", value: "Contributor" },
    { label: "PM", value: "PM" },
];
class TeamDialog extends Component {
  constructor(...args) {
    super(...args);
    this.state={
        dialogConfig: {
            autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            isOpen: false,
            usePortal: true
        },
        member: {
            email: ""
        }
    }
    this.remove = this.remove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.add = this.add.bind(this);
  }
  add() {
    this.props.dispatch(action_teams.create(this.state.member));
  }
  remove(id) {
    this.props.dispatch(action_teams.remove(this.state.member.course, id));
  }
 
  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen != nextProps.isOpen) {
        this.setState ({
            dialogConfig: {
                ...this.state.dialogConfig,
                isOpen: nextProps.isOpen
            }
        })
    }
    if (this.props.id != nextProps.id){
        this.setState({
            member: {
                ...this.state.member,
                course: nextProps.id
            }
        })
        this.props.dispatch(action_teams.getList(nextProps.id));
    }
  }
  handleClose() {
    this.props.closeHandle();
  }
  handleEmailChange(event) {
    this.setState({
        member: {
            ...this.state.member,
            email: event.target.value
        }
    })
  }
  handleRoleChange(event) {
    this.setState({
        member: {
            ...this.state.member,
            role: event.target.value
        }
    })
  }
  render() {
    return (
        <Dialog
            icon="inbox"
            onClose={this.handleClose}
            title="Manage Team"
            {...this.state.dialogConfig}
        >
            <div className="mid-TB-padding large-LR-padding">
                <H5 className="small-top-margin">Team Members</H5>
                <Divider />
                {
                    this.props.teams&&this.props.teams.list.map((member, index)=>{
                        return (
                            <Row key={index}>
                                <Col xs={5}>{member.user.display_name}</Col>
                                <Col xs={5}>{member.role.name}</Col>
                                <Col xs={2}><Button className="bp3-minimal layout-align-right" intent="danger" icon="cross" align={Alignment.RIGHT} onClick={()=>this.remove(member.user.id)}/></Col>
                            </Row>
                        )
                    })
                }
                <H5 className="mid-top-margin">Add Team Member</H5>
                <Row>
                    <Col sm={7}><input className="bp3-input .modifier sm-course-title" value={this.state.member&&this.state.member.email?this.state.member.email:""} onChange={this.handleEmailChange} type="text" placeholder="Text input" dir="auto"></input></Col>
                    <Col sm={5}><HTMLSelect value={this.state.member.role?this.state.member.role:""} options={OPTIONS} className="sm-select-role" onChange={this.handleRoleChange}/></Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="layout-align-right small-top-margin" align={Alignment.RIGHT} onClick={()=>this.add()} text="Add"/>
                    </Col>
                </Row>
            </div>
        </Dialog>
    )
  }
}
const mapStateToProps = state => {
  return {
    teams: state.teams,
  };
};
export default connect(mapStateToProps)(TeamDialog); 
