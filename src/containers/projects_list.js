import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';


import MenuBar from '../components/menu_bar';
import {fetchProjects} from '../actions';

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

class ProjectsList extends Component{

  componentWillMount() {
    this.props.fetchProjects();
  }

  goToProject(id){
    this.props.history.push('/projekt/'+id);
  }

  renderProjects(){
    return this.props.projects.map((project,i)=>{
      return (
        <ListItem
          key={ i }
          leftAvatar={<Avatar icon={<FileFolder />} />}
          // rightIcon={<ActionInfo />}
          primaryText={ project.name }
          secondaryText={ project.date_start.toLocaleDateString() }
          onClick={ (e)=>this.goToProject(i) }
        />
      );
    });
  }

  renderProcedures(){
    return this.props.procedures.map((procedure)=>{
      return (
        <ListItem
          key={ procedure.name }
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
          // rightIcon={<ActionInfo />}
          primaryText={ procedure.name }
        />
      );
    });
  }

  render() {
    return (
      <div>
        <MenuBar title="Lista projektów" />
        <List>
          { this.renderProjects() }
        </List>
        <Divider inset={true} />
        <List>
          <Subheader inset={true}>Procedury</Subheader>
          { this.renderProcedures() }
        </List>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    projects: state.projects,
    procedures: state.procedures
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchProjects:fetchProjects},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
