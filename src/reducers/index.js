import { combineReducers } from 'redux';
import ProjectsReducer from './projects_reducer';
import ProceduresReducer from './procedures_reducer';

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  procedures: ProceduresReducer
});

export default rootReducer;
