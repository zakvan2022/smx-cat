import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Button, Switch, H1,H2, EditableText, Tab, Tabs, NumericInput, FormGroup,Classes, Divider } from "@blueprintjs/core";
import * as action_lessons from "../../actions/lessons";
import * as action_modules from "../../actions/modules";
import Editor from "../../components/Editor";
import ContentDialog from '../Dialogs/ContentDialog';
import './editorstyle.css'
class CourseEdit extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      lesson:{},
      module:{},
      is_changed: false,
      first: false,
      isOpen: false,
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePublicChange = this.handlePublicChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.infraContentChange = this.infraContentChange.bind(this);
    this.policyContentChange = this.policyContentChange.bind(this);
    this.handleLabIdChange = this.handleLabIdChange.bind(this);
    this.handleLapCreditChange = this.handleLapCreditChange.bind(this);
    this.handleAvailableTimeChange = this.handleAvailableTimeChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.createOrUpdated = this.createOrUpdated.bind(this);
    this.remove = this.remove.bind(this);
    this.changeLabEnabled = this.changeLabEnabled.bind(this);
    this.insertContentDialogOpen = this.insertContentDialogOpen.bind(this);
    this.handleContentDialogClose = this.handleContentDialogClose.bind(this);
  }

  insertContentDialogOpen(){
    this.setState({
      isOpen: true
    })
  }
  handleContentDialogClose() {
    this.setState({
      isOpen: false
    })
  }
  componentDidMount() {
    // this.setState({title: this.props.lesson.title});
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.lessons.selected != nextProps.lessons.selected) {
      this.setState({
        lesson: nextProps.lessons.selected,
        is_changed: false,
        first: false
      });
    }
    if (this.props.modules.selected != nextProps.modules.selected) {
      this.setState({
        module: nextProps.modules.selected,
        is_changed: false,
        first: false
      });
    }
  }
  handlePublicChange() {
    if(this.props.status.whatfor == "LESSON"){
      this.setState({
        lesson:{
          ...this.state.lesson,
          is_published: !this.state.lesson.is_published
        },
        is_changed: true
      });
    }else if(this.props.status.whatfor == "MODULE"){
      this.setState({
        module:{
          ...this.state.module,
          is_published: !this.state.module.is_published
        },
        is_changed: true
      });
    }
    this.props.onChanged(true);
  }
  handleTitleChange(title){
    if(this.props.status.whatfor == "LESSON"){
      this.setState({
        lesson:{
          ...this.state.lesson,
          title: title
        },
        is_changed: true
      });
    }else if(this.props.status.whatfor == "MODULE"){
      this.setState({
        module:{
          ...this.state.module,
          title: title
        },
        is_changed: true
      });
    }
    this.props.onChanged(true);
  }
  contentChange(text) {
    this.setState({first: true});
    if (this.state.first){
      if(this.props.status.whatfor == "LESSON"){
        this.setState({
          lesson:{
            ...this.state.lesson,
            body: text,
            html: text
          },
          is_changed: true
        });
      }else if(this.props.status.whatfor == "MODULE"){
        this.setState({
          module:{
            ...this.state.module,
            description: text,
          },
          is_changed: true
        });
      }
      this.props.onChanged(true);
    }
  }  
  changeLabEnabled() {
    if(this.props.status.whatfor == "LESSON"){
      if (this.state.lesson.type!=5){
        this.setState({
          lesson:{
            ...this.state.lesson,
            type: 5
          },
          is_changed: true
        });
      } else {
        this.setState({
          lesson:{
            ...this.state.lesson,
            type: 1
          },
          is_changed: true
        });
      }
    }
    this.props.onChanged(true);
  }
  infraContentChange(text) {
    this.setState({
      lesson:{
        ...this.state.lesson,
        lab_infra_code: text,
      },
      is_changed: true
    });
    this.props.onChanged(true);
  }  
  policyContentChange(text) {
    this.setState({
      lesson:{
        ...this.state.lesson,
        lab_access_policy: text,
      },
      is_changed: true
    });
    this.props.onChanged(true);
  }  

  getEditor() {
    return(
      this.props.status.whatfor == "LESSON"?
      <div className="sm-edit-tabcontent">
        <Editor onContentChange = {this.contentChange} value={this.state.lesson.body}/>
      </div>
      :
      <div className="sm-edit-tabcontent">
        <Editor onContentChange = {this.contentChange} value={this.state.module.description}/>
      </div>
    )
  }
  getInfra() {
    return(
      <div className="sm-edit-tabcontent">
        <Editor onContentChange = {this.infraContentChange} value={this.state.lesson.lab_infra_code}/>
      </div>
    )
  }
  getPolicy() {
    return(
      <div className="sm-edit-tabcontent">
        <Editor onContentChange = {this.policyContentChange} value={this.state.lesson.lab_access_policy}/>
      </div>
    )
  }
  handleLabIdChange(labId){
    if (labId === 0) {
        this.setState({ labId: null });
    } else {
        this.setState({ lesson: {
          ...this.state.lesson,
          lab_id: labId
        }});
    }
    this.props.onChanged(true);
  };
  handleAvailableTimeChange(availableTime){
    if (availableTime === 0) {
        this.setState({ availableTime: null });
    } else {
        this.setState({ lesson: {
          ...this.state.lesson,
          lab_time_available_min: availableTime
        }});
    }
    this.props.onChanged(true);
  };
  handleLapCreditChange(lapCredit){
    if (lapCredit === 0) {
        this.setState({ lapCredit: null });
    } else {
        this.setState({ lesson: {
          ...this.state.lesson,
          lab_credits_required: lapCredit
        }});
    }
    this.props.onChanged(true);
  };
  handleScroll(event){
    const node = ReactDOM.findDOMNode(this);
    if (node instanceof HTMLElement){
      const toolbar = node.querySelector(".sm-edit-tabcontent .ql-toolbar");
      var rect = toolbar.getBoundingClientRect()
      var scrolltop = node.scrollTop;
      if (scrolltop > 80) {
        toolbar.setAttribute('style', `top: 1px; position: absolute;`);
      } else {
        toolbar.setAttribute('style', '');
      }
    }
  }
  getSettings() {
    return(
      <div className="sm-settings-tabcontent">
        <FormGroup label="Lab ID" labelFor="labId">
          <NumericInput
            className="sm-settings"
            fill={true}
            id="labId"
            max={300}
            min={0}
            onValueChange={this.handleLabIdChange}
            placeholder="Enter a number ... "
            value={this.state.lesson.lab_id?this.state.lesson.lab_id:""}
          />
        </FormGroup>
        <FormGroup label="Allowed Time" labelFor="allowedTime">
          <NumericInput
            className="sm-settings"
            fill={true}
            id="allowedTime"
            max={300}
            min={0}
            onValueChange={this.handleAvailableTimeChange}
            placeholder="Enter a number ... "
            value={this.state.lesson.lab_time_available_min?this.state.lesson.lab_time_available_min:""}
          />
        </FormGroup>
        <FormGroup label="Required Credits" labelFor="requiredCredits">
          <NumericInput
            className="sm-settings"
            fill={true}
            id="requiredCredits"
            max={300}
            min={0}
            onValueChange={this.handleLapCreditChange}
            placeholder="Enter a number ... "
            value={this.state.lesson.lab_credits_required || ""}
          />
        </FormGroup>
      </div>
    )
  }
  createOrUpdated(){
    if (this.props.status.whatfor == "LESSON"){
      if (this.state.lesson.id == null){
        this.props.dispatch(action_lessons.create(this.state.lesson, this.props.id));
      } else  if (this.state.lesson.id != null){
        this.props.dispatch(action_lessons.update(this.state.lesson.id, this.state.lesson, this.props.id));
      }
    } else if (this.props.status.whatfor == "MODULE"){
      if (this.state.module.id == null){
        this.props.dispatch(action_modules.create(this.state.module, this.props.id));
      } else  if (this.state.module.id != null){
        this.props.dispatch(action_modules.update(this.state.module.id, this.state.module, this.props.id));
      }
    }
    this.props.onChanged(false);
  }
  remove(){
    if (this.props.status.whatfor == "LESSON"){
      if (this.state.lesson.id != null){
        this.props.dispatch(action_lessons.remove(this.state.lesson.id, this.props.id));
      }
    } else if (this.props.status.whatfor == "MODULE"){
      if (this.state.module.id != null){
        this.props.dispatch(action_modules.remove(this.state.module.id));
      }
    }
    this.props.onChanged(false);
  }

  render() {
    return (
      <div className="sm-cedit-content" onScroll={this.handleScroll}>
        <div className="mid-LR-padding">
          <H2 className="mid-top-padding mid-LR-padding sm-heavy-gray">
            <EditableText
                maxLength="222"
                placeholder={this.props.status.whatfor=="LESSON"?"Enter Lesson Name...":"Enter Module Name..."}
                value={this.props.status.whatfor=="LESSON"?(this.state.lesson.title?this.state.lesson.title:""):(this.state.module.title?this.state.module.title:"")}
                onChange={this.handleTitleChange}
            />
          </H2>
          {this.props.status.whatfor=="LESSON"?<Button className={this.state.lesson.type==5?"bp3-minimal sm-edit-lab":"bp3-minimal sm-edit-lab sm-light-gray"} icon="glass" onClick={this.changeLabEnabled}/>:null}
          {
            this.props.status.whatfor=="LESSON"&&this.state.lesson.type==5?
            <Tabs
              animate={true}
              id="labTabs"
              key="horizontal"
              renderActiveTabPanelOnly={false}
            >
              <Tab id="lesson" title="Lesson" panel={this.getEditor()} />
              <Tab id="infra" title="Infra" panel={this.getInfra()} />
              <Tab id="policy" title="Policy" panel={this.getPolicy()} />
              <Tab id="settings" title="Settings" panel={this.getSettings()} />
              <Tabs.Expander />
            </Tabs>:this.getEditor()
          }
          {this.props.status.whatfor=="LESSON"?<Button className={"bp3-minimal sm-edit-addcon"} icon="add-to-artifact" onClick={this.insertContentDialogOpen}/>:null}
          <ContentDialog isOpen={this.state.isOpen} closeHandle={this.handleContentDialogClose} insertContent={this.contentChange}/>
        </div>
        <div className="sm-fixed-bottom mid-LR-padding">
            <Button className="bp3-minimal layout-align-left" intent="danger" onClick={this.remove} disabled={this.state.lesson.id || this.state.module.id?false:true}>Delete</Button>
            <Button className="small-margin layout-align-right sm-clist-plusbtn" intent="primary" text="Save" disabled={!this.state.is_changed} onClick={this.createOrUpdated}/> 
            <Switch className="small-margin layout-align-right" checked={this.props.status.whatfor=="LESSON"?(this.state.lesson.is_published?true:false):(this.state.module.is_published?true:false)} label="Published" onChange={this.handlePublicChange}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lessons: state.lessons,
    modules: state.modules,
    status: state.status
  };
};
export default connect(mapStateToProps)(CourseEdit); 