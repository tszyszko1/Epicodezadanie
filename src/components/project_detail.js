import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';

import MenuBar from './menu_bar';
import { editProject, deleteProject } from '../actions';

// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

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
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


class ProjectDetail extends Component{

  id = this.props.match.params.id;

  state = {
    open: false,
    openProcedury: false,
    openUsterki: false,
    id: this.id,
    newProject: this.props.projects[this.id],
    value:null,
    proceduresLeft: this.props.procedures,
    nowausterka: {name:'',desc:''}
  };

  componentWillMount(){
    this.props.projects[this.id].procedures.forEach((item)=>{
      this.state.proceduresLeft.splice(item,1);
    });
  }

  procedureDelete = (i)=>{
    let proceduresLeft = this.state.proceduresLeft.push(this.state.newProject.procedures[i]);
    let newProject = this.state.newProject.procedures.splice(i,1);
    this.setState({...this.state, value:null});
  }

  failureDelete = (i)=>{
    this.state.newProject.failure.splice(i,1);
    this.setState(this.state);
  }

  handleClose = () => {
    this.setState({...this.state, open: false,openProcedury: false, openUsterki:false});
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
    if(val!==null){
      let newProject = this.state.newProject.procedures.push(this.state.proceduresLeft[val]);
      let index = this.state.proceduresLeft.indexOf(this.state.proceduresLeft[val]);
      let proceduresLeft = this.state.proceduresLeft.splice(index,1);
      this.state.value = null;
      this.setState(this.state);
      this.handleClose();
    }
  }

  renderProcedures(){
    return this.state.newProject.procedures.map((procedure,i)=>{
      return (
        <ListItem
          nestedItems={procedure.toDoList.map((item,i)=>{
            return <ListItem
              key={i}
              primaryText={item.text}
              leftCheckbox={<Checkbox
              checked={item.status} />}
              onChange = {() => {
                item.status=!item.status;
                item.status ? ++procedure.done:--procedure.done;
                this.setState(this.state);
              }}
            />;
          })}
          key={ procedure.name }
          leftAvatar={<Avatar icon={<NavigationClose onClick={()=>this.procedureDelete(i)} />} backgroundColor={red500} />}
          primaryText={ procedure.name  +' '+procedure.done+'/'+procedure.toDoList.length}
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
  renderFailure(){
    return this.state.newProject.failure.map((item,i)=>{
      return (
        <Card key={i}>
            <CardHeader
              title={item.name}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              <Checkbox
                checked={item.status}
                onCheck={() => {item.status=!item.status;this.setState(this.state)}}
                label="naprawiono"
              />
              <FlatButton label="Usuń usterkę" onClick={()=>this.failureDelete(i)}/>
            </CardActions>
            <CardText expandable={true}>
              {item.desc}
            </CardText>
          </Card>
      );
    });
  }

  render(){

    const actions = (callback)=>{
      return [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
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
            onClick={()=>this.setState({...this.state, openProcedury: true})}
          />
          <Dialog
            title="Uwaga!!!"
            actions={actions(()=>{this.handleClose2()})}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Czy na pewno chcesz usunąć projekt?
          </Dialog>
          <Dialog
            title="Dodaj procedurę"
            actions={actions(()=>{this.onSubmit2()})}
            modal={false}
            open={this.state.openProcedury}
            onRequestClose={this.handleClose}
          >
            Dodaj procedurę z listy <br/>
            <SelectField
              floatingLabelText="Procedura"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.renderProcedures2()}
            </SelectField>
          </Dialog>
          <Divider />
          <List>
            <Subheader inset={true}>
              Usterki
            </Subheader>
            { this.renderFailure() }
          </List>
          <FlatButton
            label="Dodaj usterkę"
            fullWidth={true}
            onClick={()=>{this.setState({...this.state,openUsterki:true})}}
          />
          <Dialog
            title="Dodaj usterkę"
            actions={actions(()=>{
              this.state.newProject.failure.push({name:this.state.nowausterka.name,img:null,status:false,desc:this.state.nowausterka.desc});
              this.setState(this.state);
              this.handleClose();
            })}
            modal={false}
            open={this.state.openUsterki}
            onRequestClose={this.handleClose}
          >
            <TextField
              hintText="usterka"
              underlineShow={false}
              onChange={e=>{this.state.nowausterka.name=e.target.value}}
            />
            <TextField
              hintText="opis"
              underlineShow={false}
              onChange={e=>{this.state.nowausterka.desc=e.target.value}}
            />
          </Dialog>
          <Divider style={{marginTop:20,marginBottom:20}} />
          <FlatButton
            label="Zapisz zmiany"
            fullWidth={true}
            onClick={() => {this.onSubmit()}}
          />
          <FlatButton
            label="Usuń projekt"
            fullWidth={true}
            onClick={()=>this.setState({...this.state, open: true})}
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
  return bindActionCreators({editProject:editProject,deleteProject:deleteProject},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
