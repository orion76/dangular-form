import {EActionProcess} from "../../../process/types";
import {Action} from "@ngrx/store";
import {IFormConfig} from "@libcomm/interfaces";
import {ActionProcess} from "@libcomm/app_state/state_debug/decorator";
import {FormGroup} from "@angular/forms";
import {IEntity} from "@libcomm/common/entity/interfaces";
import * as Immutable from "immutable";
import {IFieldController} from "../../../controllers/types";
import {ILoad, ILoadError, ILoadSuccess, IRequest} from "@libcomm/store/entity/actions";
import {EntityStoreTypes} from "@libcomm/store/entity/types";


export namespace StoreActions {


  import IEntityRequest = EntityStoreTypes.IEntityRequest;


  export enum Types {
    REQUEST = '[FORM] REQUEST',
    LOAD = '[FORM] LOAD',
    LOAD_SUCCESS = '[FORM] LOAD_SUCCESS',
    LOAD_ERROR = '[FORM] LOAD_ERROR',
    SET_CONFIG = '[FORM] SET_CONFIG',
    SET_FIELDS = '[FORM] SET_FIELDS',
    SET_FORM_GROUP = '[FORM] SET_FORM_GROUP',
    SET_INIT_COMPLETE = '[FORM] SET_INIT_COMPLETE'
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class REQUEST implements IRequest {
    readonly type: Types.REQUEST;

    constructor(public stateId: string, public request: IEntityRequest) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class LOAD implements ILoad {
    readonly type = Types.LOAD;

    constructor(public stateId: string, public request: IEntityRequest) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class LOAD_SUCCESS implements ILoadSuccess {
    readonly type = Types.LOAD_SUCCESS;

    constructor(public stateId: string, public entity: IEntity) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class LOAD_ERROR implements ILoadError {
    readonly type = Types.LOAD_ERROR;

    constructor(public stateId: string, public request: IEntityRequest) {
    }
  }


  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class SET_CONFIG implements Action {
    readonly type = Types.SET_CONFIG;

    constructor(public stateId: string, public config: IFormConfig) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class SET_FIELDS implements Action {
    readonly type = Types.SET_FIELDS;

    constructor(public stateId: string, public fields: Immutable.OrderedMap<string, IFieldController>) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class SET_FORM_GROUP implements Action {
    readonly type = Types.SET_FORM_GROUP;

    constructor(public stateId: string, public formGroup: FormGroup) {
    }
  }

  @ActionProcess([
    EActionProcess.FORM_INIT,
  ])
  export class SET_INIT_COMPLETE implements Action {
    readonly type = Types.SET_INIT_COMPLETE;

    constructor(public stateId: string) {
    }
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR
    | SET_FORM_GROUP
    | SET_CONFIG
    | SET_FIELDS
    | SET_INIT_COMPLETE

}
