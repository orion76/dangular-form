import {Action} from '@ngrx/store';
import {ActionProcess} from "@libcomm/app_state/state_debug/decorator";
import {EActionProcess} from "@libcomm/components/forms/process/types";
import {IFormEnumsStatus} from "@libcomm/interfaces/config/select-options.interfaces";


export namespace StoreActions {
  export enum Types {
    ADD_ONE = '[ENUMS STATUS] ADD_ONE',
    ADD_MANY = '[ENUMS STATUS] ADD_MANY',
    SET_CHANGED = '[ENUMS STATUS] SET_CHANGED',
    SET_LOADED = '[ENUMS STATUS] SET_LOADED',
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class AddMany implements Action {
    readonly type = Types.ADD_MANY;

    constructor(public formId: string, public states: IFormEnumsStatus[]) {
    }
  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class setChanged implements Action {
    readonly type = Types.SET_CHANGED;

    constructor(public formId: string, public fieldName) {
    }
  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class setLoaded implements Action {
    readonly type = Types.SET_LOADED;

    constructor(public formId: string, public fieldName: string) {
    }
  }


  export type TActions = AddMany
    | setChanged
    | setLoaded

}

