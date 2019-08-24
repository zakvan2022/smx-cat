import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, H3, Alignment, Icon,H5, Dialog, InputGroup, Spinner} from "@blueprintjs/core";

import {Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from "react-router-dom";

import "./style.css";
import {Transition, CSSTransition} from 'react-transition-group';

import { FetchUtils } from "../../utils/FetchUtils";
import { ApiUtils } from "../../utils/ApiUtils";
import axios from 'axios';

class ContentDialog extends Component {
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
        searchPannel: true,
        keyword : "",
        loading: false,
        searchResults: [],
        detailIndex: null
    }
    this.goToDetail = this.goToDetail.bind(this);
    this.goToSearch = this.goToSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.renderSearchPanel = this.renderSearchPanel.bind(this);
    this.renderDetailPanel = this.renderDetailPanel.bind(this);
    this.insertContent = this.insertContent.bind(this);
  }
 
  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen != nextProps.isOpen) {
        this.setState ({
            dialogConfig: {
                ...this.state.dialogConfig,
                isOpen: nextProps.isOpen
            },
            searchPannel: true
        })
    }
  }
  goToDetail(id) {
      this.setState({
          searchPannel: false,
          detailIndex: id
      });
      console.log(id);
  }
  goToSearch() {
    this.setState({
        searchPannel: true
    });
    console.log("Clicked goTo Search")
  }
  handleClose() {
    this.props.closeHandle();
  }
  handleSearchChange(event) {
    this.setState({keyword: event.target.value});
  }
  handleKeyDown(event){
    if (event.key === "Enter"){
        this.setState({loading: true});
        axios.get(ApiUtils.uriApiLessonSearch(this.state.keyword), {
          headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
        }).then((response) => {
            this.setState({
                searchResults: response.data.results,
                loading: false
            });
        })
        .catch((error) => {
            this.setState({
                loading: false
            })
        });
    }
  }
  insertContent(body) {
      this.props.insertContent(body);
      this.props.closeHandle();
  }
  renderSearchPanel() {
    //   console.log("SearchPanel")
      console.log(this.state.searchResults);
      return (
        <div>
            <InputGroup
                disabled={this.state.loading}
                large={true}
                leftIcon="search"
                onChange={this.handleSearchChange}
                onKeyPress={this.handleKeyDown}
                placeholder="Search..."
                rightElement={this.state.loading ? <Spinner size={Icon.SIZE_STANDARD} /> : null}
                value={this.state.keyword}
                style = {{marginBottom: 20 + "px"}}
            />
            {   this.state.searchResults.length?<div>{this.state.searchResults.length} Results Exists</div>:<div>No Search Results</div>}
            {
                this.state.searchResults.map((item, index)=>{
                    return(
                        <Row className="small-TB-padding" key={index}>
                            <Col sm={10}>
                                <H5 className="sm-search-title" onClick={()=>this.goToDetail(index)}>{item.title}</H5>
                                <p className="sm-search-body">{item.body}</p>
                            </Col>
                            <Col sm={2}><Button className="sm-insert-button" text="Insert" onClick={()=>this.insertContent(item.body)}/></Col>
                        </Row>
                    )
                })
            }
        </div>
      )
  }
  renderDetailPanel() {
      var detailInfo = this.state.searchResults[this.state.detailIndex];
      return(
        <div>
            <Button className="bp3-minimal nopadding sm-content-title" icon="chevron-left" align={Alignment.LEFT} text={"Back to search results..."} onClick={this.goToSearch}></Button>
            <Button className="sm-insert-button mid-top-margin" text="Insert" onClick={()=>this.insertContent(detailInfo.body)}/>            
            <H3 className="large-top-margin">{detailInfo.title}</H3>
            <div>{detailInfo.body}</div>
        </div>
      )
  }
  render() {
    return (
        <Dialog
            icon="inbox"
            onClose={this.handleClose}
            title="Insert Content"
            {...this.state.dialogConfig}
            style = {{width: 35+"%"}}
        >
            <div className="sm-content-dialog">
            {
                this.state.searchPannel?this.renderSearchPanel():this.renderDetailPanel()
            }
            </div>
        </Dialog>
    )
  }
}
const mapStateToProps = state => {
  return {
  };
};
export default connect(mapStateToProps)(ContentDialog); 
