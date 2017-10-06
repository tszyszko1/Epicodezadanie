import React, { Component } from 'react';
import Redux from 'redux';
import { connect } from 'react-redux';

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

  renderProjects(){
    return this.props.projects.map((project)=>{
      return (
        <ListItem
          key={ project.name }
          leftAvatar={<Avatar icon={<FileFolder />} />}
          // rightIcon={<ActionInfo />}
          primaryText={ project.name }
          secondaryText={ project.date_start }
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
        <List>
          <Subheader inset={true}>Projekty</Subheader>
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

export default connect(mapStateToProps)(ProjectsList);
