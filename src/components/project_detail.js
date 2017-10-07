import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';

import MenuBar from './menu_bar';
import { editProject, deleteProject } from '../actions';

import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';


class ProjectDetail extends Component{

  id = this.props.match.params.id;
  newProject = this.props.projects[this.id];
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleClose2 = () => {
    this.setState({open: false});
    this.props.deleteProject(this.id,() => {
      this.props.history.push("/");
    })
  };

  onSubmit = ()=>{
    const f1 = () => {
      this.props.editProject(this.id,this.newProject, () => {console.log('saved');});
    }
    const f2 = ()=>{alert("proszę wypełnić wszystie pola i podać poprawne daty");}
    (this.newProject.name=='' || this.newProject.location==''||(this.newProject.date_start>this.newProject.date_end)) ? f2() : f1();

  }

  renderProcedures(){
    return this.newProject.procedures.map((procedure)=>{
      return (
        <ListItem
          key={ procedure.name }
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
          // rightIcon={<ActionInfo />}
          primaryText={ procedure.name }
          nestedItems={procedure.toDoList.map((item,i)=>{
            return <ListItem
              key={i}
              primaryText={item.text}
              leftCheckbox={<Checkbox
              defaultChecked={item.status} />}
              onChange = {(event) => {item.status=!item.status}}
            />;
          })}
        />
      );
    });
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose2}
      />,
    ];

    return (
      <div>
        <MenuBar title="Edytuj projekt" />
        <Paper zDepth={2} style={{padding:10}}>
          <TextField
            hintText="nazwa projektu"
            underlineShow={false}
            onChange={e=>{this.newProject.name=e.target.value}}
            defaultValue={this.newProject.name}
          />
          <Divider />
          <TextField
            hintText="miejsce projektu"
            underlineShow={false}
            onChange={e=>{this.newProject.location=e.target.value}}
            defaultValue={this.newProject.location}
          />
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
          <Divider style={{marginTop:20}} />
          <List>
            <Subheader inset={true}>Procedury</Subheader>
            { this.renderProcedures() }
          </List>
          <FlatButton
            label="Zapisz"
            fullWidth={true}
            onClick={() => {this.onSubmit()}}
          />
          <FlatButton
            label="Usuń projekt"
            fullWidth={true}
            onClick={this.handleOpen}
          />
          <Dialog
            title="Uwaga!!!"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          Czy na pewno chcesz usunąć projekt?
        </Dialog>
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
  return bindActionCreators({editProject:editProject,deleteProject:deleteProject},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
