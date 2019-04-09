import {Action} from "@ngrx/store";
import {ActionProcess} from "@libcomm/app_state/state_debug/decorator";
import {EActionProcess} from "../../process/types";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";

export namespace StoreActions {
  export enum Types {
    ADD_VALUE = 'ADD_VALUE',
    SET_VALUE_CHANGED = 'SET_VALUE_CHANGED',
    SET_VALUE_HANDLED = 'SET_VALUE_HANDLED',
    HANDLE_VALUE = 'HANDLE_VALUE',

  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class handleValue implements Action {
    readonly type = Types.HANDLE_VALUE;

    constructor(public formId: string, public value: TFormValue) {
    }
  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class setChanged implements Action {
    readonly type = Types.SET_VALUE_CHANGED;

    constructor(public formId: string, public fields: TFormValue) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.ENTITY_CRUD,
  ])
  export class setHandled implements Action {
    readonly type = Types.SET_VALUE_HANDLED;

    constructor(public formId: string, public value: TFormValue) {
    }
  }


  export type Actions = handleValue | setChanged | setHandled;

}
