import {featureName} from "./state";
import {reducer} from './reducer';
import * as selectors from './selectors';
import {StoreActions as actions} from './actions';

export const FormValue = {
  featureName,
  reducer,
  selectors,
  actions
};
