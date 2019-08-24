/* 
 * Simple editor component that takes placeholder text as a prop 
 */
import React, { Component } from 'react';
import './style.css';
class FormGroup extends React.Component {
    constructor (props) {
      super(props)
    }
    render () {
      return (
        <div>
          <p className="sm-form-label">{this.props.labelFor}</p>
          <div className="sm-form-content">
            {this.props.children}
          </div>
        </div>
       )
    }
  }
  
  export default FormGroup; 