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
import {blue500, yellow600,red500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


class ProjectDetail extends Component{
  id = this.props.match.params.id;

  state = {
    open: false,
    openProcedury: false,
    id: this.id,
    newProject: this.props.projects[this.id],
    value:null,
    proceduresLeft: this.props.procedures
  };
  handleOpen = () => {
    this.setState({...this.state, open: true});
    console.log(this.props);
  };

  componentWillMount(){
    this.props.projects[this.id].procedures.forEach((item)=>{
      this.state.proceduresLeft.splice(item,1);
    });
  }

  onDodajProcedure = () => {
    this.setState({...this.state, openProcedury: true});
  };

  procedureDelete = (i)=>{
    let proceduresLeft = this.state.proceduresLeft.push(this.state.newProject.procedures[i]);
    let newProject = this.state.newProject.procedures.splice(i,1);
    this.setState({...this.state, value:null});
  }

  handleClose = () => {
    this.setState({...this.state, open: false,openProcedury: false});
  };

  handleClose2 = () => {
    this.setState({...this.state, open: false, openProcedury: false});
    this.props.deleteProject(this.id,() => {
      this.props.history.push("/");
    })
  };

  handleChange = (event, index, value) => this.setState({...this.state, value:value});

  onSubmit = ()=>{
    const f1 = () => {
      this.props.editProject(this.id,this.state.newProject, () => {console.log('saved');});
    }
    const f2 = ()=>{alert("proszę wypełnić wszystie pola i podać poprawne daty");}
    (this.state.newProject.name=='' || this.state.newProject.location==''||(this.state.newProject.date_start>this.state.newProject.date_end)) ? f2() : f1();

  }

  onSubmit2 = ()=>{
    let val = this.state.value;
    let newProject = this.state.newProject.procedures.push(this.state.proceduresLeft[val]);
    let index = this.state.proceduresLeft.indexOf(this.state.proceduresLeft[val]);
    let proceduresLeft = this.state.proceduresLeft.splice(index,1);
    this.setState({...this.state, value:null});
    this.handleClose();
  }

  renderProcedures(){
    return this.state.newProject.procedures.map((procedure,i)=>{
      return (
        <ListItem
          key={ procedure.name }
          leftAvatar={<Avatar icon={<NavigationClose onClick={e=>this.procedureDelete(i)} />} backgroundColor={red500} />}
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
  renderProcedures2(){
    return this.state.proceduresLeft.map((procedure,i)=>{
      return (
         <MenuItem key={i} value={i} primaryText={procedure.name} />
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

    const actions2 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.onSubmit2}
      />,
    ];

    return (
      <div>
        <MenuBar title="Edytuj projekt" />
        <Paper zDepth={2} style={{padding:10}}>
          <TextField
            hintText="nazwa projektu"
            underlineShow={false}
            onChange={e=>{this.state.newProject.name=e.target.value}}
            defaultValue={this.state.newProject.name}
          />
          <Divider />
          <TextField
            hintText="miejsce projektu"
            underlineShow={false}
            onChange={e=>{this.state.newProject.location=e.target.value}}
            defaultValue={this.state.newProject.location}
          />
          <Divider />
          <DatePicker
            onChange={(e,date)=>{this.state.newProject.date_start=date}}
            autoOk={false}
            floatingLabelText="data początkowa"
            defaultDate={this.state.newProject.date_start}
            disableYearSelection={false}
          />
          <DatePicker
            onChange={(e,date)=>{this.state.newProject.date_end=date}}
            autoOk={false}
            floatingLabelText="data końcowa"
            defaultDate={this.state.newProject.date_end}
            disableYearSelection={false}
          />
          <Divider style={{marginTop:20}} />
          <List>
            <Subheader inset={true}>
              Procedury
            </Subheader>
            { this.renderProcedures() }
          </List>
          <FlatButton
            label="Dodaj Procedurę"
            fullWidth={true}
            onClick={this.onDodajProcedure}
          />
          <Divider style={{marginTop:20}} />
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
          <Dialog
            title="Dodaj procedurę"
            actions={actions2}
            modal={false}
            open={this.state.openProcedury}
            onRequestClose={this.handleClose}
          >
            Dodaj procedurę z listy
            <SelectField
              floatingLabelText="Procedura"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.renderProcedures2()}
            </SelectField>
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
