import {Action} from '@ngrx/store';
import {IEntity} from '@libcomm/common/entity/interfaces';
import {ActionProcess} from "@libcomm/app_state/state_debug/decorator";
import {EActionProcess} from "../../process/types";
import {IFormEnumState, TEnumFilters} from "@libcomm/interfaces/config/select-options.interfaces";


export namespace StoreActions {
  export enum Types {

    ADD_MANY = '[ENUM] ADD_MANY',
    ENUM_LOAD = '[ENUM] LOAD',
    ENUM_LOAD_SUCCESS = '[ENUM] LOAD_SUCCESS',
    ENUM_LOAD_ERROR = '[ENUM] LOAD_ERROR',
    UPDATE_FILTERS = '[ENUM] UPDATE_FILTERS',

  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class AddMany implements Action {
    readonly type = Types.ADD_MANY;

    constructor(public formId: string, public enums: IFormEnumState[]) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class updateFilters implements Action {
    readonly type = Types.UPDATE_FILTERS;

    constructor(public formId: string, public fieldName: string, public filters: TEnumFilters) {
    }
  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class Load implements Action {
    readonly type = Types.ENUM_LOAD;

    constructor(public formId: string, public fieldName: string) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class LoadSuccess implements Action {
    readonly type = Types.ENUM_LOAD_SUCCESS;

    constructor(public formId: string, public fieldName: string, public  items: IEntity[]) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.FORM_FIELD_SELECT_INIT,
  ])
  export class LoadError implements Action {
    readonly type = Types.ENUM_LOAD_ERROR;

    constructor(public formId: string, public fieldName: string, public  source: string, filters: any[]) {
    }
  }

  export type Actions = AddMany
    | updateFilters
    | Load
    | LoadSuccess
    | LoadError

}

