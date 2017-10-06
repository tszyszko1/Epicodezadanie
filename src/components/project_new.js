import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';


import MenuBar from './menu_bar';
import { addProject } from '../actions';

import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';



class ProjectNew extends Component{
  newProject = {
    name: '',
    location: '',
    date_start: new Date(),
    date_end: new Date(),
    procedures: [],
    failure: []
  }



  onSubmit = ()=>{
    const f1 = () => {
      this.props.addProject(this.newProject, () => {
        this.props.history.push("/");
      });
    }
    const f2 = ()=>{alert("proszę wypełnić wszystie pola i podać poprawne daty");}
    (this.newProject.name=='' || this.newProject.location==''||(this.newProject.date_start>this.newProject.date_end)) ? f2() : f1();

  }

  render(){
    return (
      <div>
        <MenuBar title="Nowy projekt" />
        <Paper zDepth={2} style={{padding:10}}>
          <TextField hintText="nazwa projektu" underlineShow={false}  onChange={e=>{this.newProject.name=e.target.value}}/>
          <Divider />
          <TextField hintText="miejsce projektu" underlineShow={false}  onChange={e=>{this.newProject.location=e.target.value}}/>
          <Divider />
          <DatePicker
            onChange={(e,date)=>{this.newProject.date_start=date}}
            autoOk={false}
            floatingLabelText="data początkowa"
            defaultDate={this.newProject.date_start}
            disableYearSelection={false}
          />
          <DatePicker
            onChange={(e,date)=>{this.newProject.date_end=date}}
            autoOk={false}
            floatingLabelText="data końcowa"
            defaultDate={this.newProject.date_end}
            disableYearSelection={false}
          />
          <FlatButton
            label="Dodaj"
            fullWidth={true}
            onClick={() => {this.onSubmit()}}
          />
        </Paper>
      </div>
    );
  }
};


function mapStateToProps(state){
  return {
    projects: state.projects,
    procedures: state.procedures
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addProject:addProject},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNew);
