export const ADD_PROJECT = 'add_project';
export const EDIT_PROJECT = 'edit_project';
export const DELETE_PROJECT = 'delete_project';
export const FETCH_PROJECTS = 'fetech_projects';
export const EDIT_PROCEDURES = 'edit_procedures';

export function addProject(project,callback){
  callback();
  return {
    type : ADD_PROJECT,
    payload: project
  };
}

export function editProject(id,project,callback){
  callback();
  return {
    type : EDIT_PROJECT,
    payload:{id:id,project:project}
  };
}

export function deleteProject(id,callback){
  callback();
  return {
    type : DELETE_PROJECT,
    payload:id
  };
}

export function fetchProjects(){
  return {
    type : FETCH_PROJECTS,
    payload: {}
  };
}
export function editProcedures(procedures){
  return {
    type : EDIT_PROCEDURES,
    payload: procedures
  };
}
