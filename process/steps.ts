import {Action} from "@ngrx/store";
import {EActionProcess} from "./types";
import {ActionProcess} from "../../../app_state/state_debug/decorator";
import {IKeyValueList} from "@libcomm/interfaces";
import {IEntity} from "../../../common/entity/interfaces";
import {IFormEnumState} from "@libcomm/interfaces/config/select-options.interfaces";
import {IFormStateClass} from "../controllers/form-state/form-state";

export namespace Steps {

  export enum EStep {
    PROCESS_START = 'PROCESS_START',
    ADD_FORM = 'ADD_FORM',
    INIT_FORM = 'INIT_FORM',
    ENTITY_ID_COMPLETE = 'ENTITY_ID_COMPLETE',

    ENTITY_LOAD_SUCCESS = 'ENTITY_LOAD_SUCCESS',
    ENTITY_LOAD_ERROR = 'ENTITY_LOAD_ERROR',

    ENTITY_VALUE_CHANGED = 'ENTITY_VALUE_CHANGED',
    ENTITY_VALUE_HANDLED = 'ENTITY_VALUE_HANDLED',

    ENTITY_FIELDS_CHANGED = 'ENTITY_FIELDS_CHANGED',
    ENTITY_FIELDS_HANDLED = 'ENTITY_FIELDS_HANDLED',

    SELECT_OPTIONS_LOAD = 'SELECT_OPTIONS_LOAD',
    SELECT_OPTIONS_LOADED = 'SELECT_OPTIONS_LOADED',

    FORM_COMPLETE = 'FORM_COMPLETE',
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class addForm implements Action {
    readonly type = EStep.ADD_FORM;

    constructor(public formId: string, public state: IFormStateClass) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class initForm implements Action {
    readonly type = EStep.INIT_FORM;

    constructor(public formId: string, public state: IFormStateClass) {

    }
  }


  @ActionProcess([EActionProcess.FORM_INIT])
  export class entityIdComplete implements Action {
    readonly type = EStep.ENTITY_ID_COMPLETE;

    constructor(public formId: string, public  source: string, public entityId: string) {

    }
  }


  @ActionProcess([EActionProcess.FORM_INIT])
  export class entityLoadSuccess implements Action {
    readonly type = EStep.ENTITY_LOAD_SUCCESS;

    constructor(public formId: string, public  entity: IEntity) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class entityLoadError implements Action {
    readonly type = EStep.ENTITY_LOAD_ERROR;

    constructor(public formId: string, public  source: string, public entityId: string) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class entityValueChanged implements Action {
    readonly type = EStep.ENTITY_VALUE_CHANGED;

    constructor(public formId: string, public changes: IKeyValueList<any>) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class entityValueHandled implements Action {
    readonly type = EStep.ENTITY_VALUE_HANDLED;

    constructor(public formId: string, public formState: IFormStateClass) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class entityFieldsChanged implements Action {
    readonly type = EStep.ENTITY_FIELDS_CHANGED;

    constructor(public formId: string, public fields: any) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class entityFieldsHandled implements Action {
    readonly type = EStep.ENTITY_FIELDS_HANDLED;

    constructor(public formId: string, public fields: any) {

    }
  }


  @ActionProcess([EActionProcess.FORM_INIT])
  export class selectOptionsLoad implements Action {
    readonly type = EStep.SELECT_OPTIONS_LOAD;

    constructor(public formId: string, public field: IFormEnumState) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class selectOptionsLoaded implements Action {
    readonly type = EStep.SELECT_OPTIONS_LOADED;

    constructor(public formId: string, public options: IFormEnumState[]) {

    }
  }

  @ActionProcess([EActionProcess.FORM_INIT])
  export class formComplete implements Action {
    readonly type = EStep.FORM_COMPLETE;

    constructor(public formId: string) {

    }
  }


  export type TSteps = addForm
    | initForm
    | entityIdComplete
    | entityLoadSuccess
    | entityLoadError
    // ENTITY_VALUE
    | entityValueChanged
    | entityValueHandled
    // ENTITY_FIELDS
    | entityFieldsChanged
    | entityFieldsHandled
    // SELECT_OPTIONS
    | selectOptionsLoad
    | selectOptionsLoaded

    | formComplete

}
