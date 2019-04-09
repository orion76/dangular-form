import {Action} from "@ngrx/store";
import {ActionProcess} from "@libcomm/app_state/state_debug/decorator";
import {EActionProcess} from "../../process/types";

import * as Immutable from "immutable";
import {IField} from "@libcomm/interfaces/config/fields/types";


export namespace FormFieldsActions {

  export enum Types {
    ADD_FIELDS = 'ADD_FIELDS',
    UPDATE_FIELDS_STATE = 'UPDATE_FIELDS_STATE',
    SET_HANDLED = 'SET_HANDLED',
  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class addFields implements Action {
    readonly type = Types.ADD_FIELDS;

    constructor(public formId: string, public fields: Immutable.OrderedMap<string, IField>) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.ENTITY_CRUD,
  ])
  export class updateFieldsState implements Action {
    readonly type = Types.UPDATE_FIELDS_STATE;

    constructor(public formId: string, public fields: Immutable.OrderedMap<string, IField>) {
    }
  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
    EActionProcess.ENTITY_CRUD,
  ])
  export class setHandled implements Action {
    readonly type = Types.SET_HANDLED;

    constructor(public formId: string, public fields: Immutable.OrderedMap<string, IField>) {
    }
  }


  export type Actions = addFields | updateFieldsState | setHandled;
}
