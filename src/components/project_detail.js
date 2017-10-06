import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProjectDetail extends Component{

  componentDidMount(){
    console.log(this.props);
  }

  render(){
    const id = this.props.match.params.id;

    return (
      <div>
        <div>{this.props.projects[id].name}</div>
        <Link to="/">Back</Link>
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

export default connect(mapStateToProps)(ProjectDetail);
