import {EntityStoreSelectors} from "@libcomm/store/entity";


import {EntityStoreTypes} from "@libcomm/store/entity/types";
import {FormGroup} from "@angular/forms";
import {IEntity} from "@libcomm/common/entity/interfaces";
import {IButtons, IFormConfig} from "@libcomm/interfaces";
import * as Immutable from "immutable";


export namespace FormStoreTypes {


  import IEntityStatus = EntityStoreTypes.IEntityStatus;
  import IStateProps = EntityStoreTypes.IStateProps;
  import IEntitySelectors = EntityStoreSelectors.IEntitySelectors;
  import IState = EntityStoreTypes.IState;


  export interface IFormState extends IState {
    config: IFormConfig,
    form?: FormGroup | null,
    entity?: IEntity,
    actions?: IButtons,
    fields?: any,
    enums?: any,
    values?: any,
    counts?: IFormStatusCounts,
    status?: IFormStatus,

  }

  export interface IFormStatusCount {
    list: Immutable.Set<string>,
    changed: Immutable.Set<string>,
    handled: Immutable.Set<string>,
  }

  export interface IFormStatusCounts {
    fields: IFormStatusCount,
    enums: IFormStatusCount,
    values: IFormStatusCount,
  }

  export interface IFormStatus extends IEntityStatus {
    CONFIG?: boolean,
    FORM_GROUP?: boolean,
    FIELDS?: boolean,
    VALUES?: boolean,
    INIT_COMPLETE?: boolean,
    FIELDS_CHANGED?: boolean,
    FIELDS_HANDLED?: boolean,

    // Enums
    ENUMS_CHANGED?: boolean,
    ENUMS_HANDLED?: boolean,

    // Values
    VALUES_CHANGED?: boolean,
    VALUES_HANDLED?: boolean,

  }


  export type TStatusName = keyof IFormStatus;
  export type TSelectorNames = keyof IEntitySelectors<IFormState, TStatusName>;
  export type TSelectors = IEntitySelectors<IFormState, TStatusName>[TSelectorNames];


  export interface IStatusProps extends IStateProps {
    status: TStatusName;
    value: any
  }

}


