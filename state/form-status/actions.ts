import {Action} from "@ngrx/store";
import {ActionProcess} from "@libcomm/app_state/state_debug/decorator";
import {EActionProcess} from "../../process/types";

export namespace StoreActions {
  export enum Types {
    ADD_FORM = '[FORM_STATUS] ADD_FORM',
    SET_COMPLETE = '[FORM_STATUS] SET_COMPLETE',
    STATUS_ADD = '[FORM_STATUS] STATUS_ADD',
    STATUS_TOGGLE = '[FORM_STATUS] STATUS_TOGGLE',
    STATUS_SET = '[FORM_STATUS] STATUS_SET',
    ADD_ENUMS = '[FORM_STATUS] ADD_ENUMS',
    ADD_ENUM_LOADED = '[FORM_STATUS] ADD_ENUM_LOADED',
    ADD_ENUM_CHANGED = '[FORM_STATUS] ADD_ENUM_CHANGED',
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class addForm implements Action {
    readonly type = Types.ADD_FORM;

    constructor(public formId: string) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class addEnums implements Action {
    readonly type = Types.ADD_ENUMS;

    constructor(public formId: string, public fieldNames: string[]) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class addEnumLoaded implements Action {
    readonly type = Types.ADD_ENUM_LOADED;

    constructor(public formId: string, public fieldName: string) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class addEnumChanged implements Action {
    readonly type = Types.ADD_ENUM_CHANGED;

    constructor(public formId: string, public fieldName: string) {
    }
  }


  export type Actions = addForm
    | addEnums
    | addEnumLoaded
    | addEnumChanged;

}
