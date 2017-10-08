import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';


import MenuBar from '../components/menu_bar';
import {editProcedures} from '../actions';

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, red500} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


class ProcedureList extends Component{

  constructor(props){
    super(props);
    this.state = {
      open:false,
      procedures: this.props.procedures,
      dialogText: '',
      list: null,
      typListy: null
    };
  }
  componentDidUpdate(){

  }

  procedureDelete = (i)=>{
    this.state.procedures.splice(i,1);
    this.setState(this.state);
  }

  renderLabel = (string,list)=>{
    return (
      <div>
        { string }
        <FlatButton
          label="Dodaj"
          primary={true}
          onClick={()=>{
            this.state.open=true;
            this.state.list=list;
            this.state.typListy='todo';
            this.setState(this.state);
          }}
        />
      </div>

    );
  }

  renderProcedures(){
    return this.state.procedures.map((procedure,j)=>{
      return (
        <ListItem
          key={j}
          leftAvatar={<Avatar icon={<NavigationClose onClick={()=>this.procedureDelete(j)} />} backgroundColor={red500} />}
          primaryText={this.renderLabel(procedure.name,procedure.toDoList) }
          nestedItems={procedure.toDoList.map((item,i)=>{
            return <ListItem
              key={i}
              rightIcon={<NavigationClose onClick={()=>{
                console.log(i);
                this.state.procedures[j].toDoList.splice(i,1);
                this.setState(this.state);
              }} />}
              primaryText={"- "+item.text}
            />;
          })}
        />
      );
    });
  }

  render() {
    const actions = (callback)=>{
      return [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={()=>{this.setState({open:false});}}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={callback}
        />,
      ];
    }

    return (
      <div>
        <MenuBar title="Procedury" />
        { this.renderProcedures() }
        <FlatButton
          label="Dodaj Procedurę"
          fullWidth={true}
          onClick={()=>{
            this.state.typListy="procedury";
            this.state.list = this.state.procedures;
            this.state.open = true;
            this.setState(this.state);
          }}
        />
        <Dialog
          title="Wpisz nazwę"
          actions={actions(()=>{
            if(this.state.typListy=="todo"){
              this.state.list.push({text:this.state.dialogText,status:false});
            }else{
              this.state.list.push({
                name: this.state.dialogText,
                toDoList: [],
                done:0
              });
            }
            this.state.open=false;
            this.props.editProcedures(this.state.procedures);
            this.setState(this.state);
          })}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="uzupełnij"
            underlineShow={true}
            onChange={e=>{this.state.dialogText=e.target.value;console.log(e.target.value);}}
          />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state){
  window.localStorage.setItem("projectList",JSON.stringify(state));
  return {
    projects: state.projects,
    procedures: state.procedures
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({editProcedures:editProcedures},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcedureList);
