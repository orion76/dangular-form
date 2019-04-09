import {IEntity} from "../../../common/entity/interfaces";
import {Observable} from "rxjs";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";
import {OnInit} from "@angular/core";
import * as Immutable from "immutable";
import {IFormStateClass} from "./form-state/form-state";
import {IFormStateParts} from "./form-state/form-patrs-state";
import {TFieldConfig, TFieldState} from "@libcomm/interfaces/config/fields/types";

export interface IFieldController {
  // readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly name: any;
  readonly type: any;
  readonly config: any;
  onValueChanges?: Observable<any>

  state: TFieldState;

  // getConfig(name: keyof IFieldReferenceConfig);

  // getState(name: keyof IFieldStateProperties);

  // onStateUpdate(): Observable<IFieldStateProperties>

  // onValueUpdate(): Observable<any>;

  // onSelectOptionsUpdate(): Observable<IEntity[]>;

  changeValue(value: any);

}



export interface IFormFieldsController {
  readonly items: Map<string, IFieldController>;

  addField(config: TFieldConfig);

  field(fieldName: string): IFieldController;
}

export interface IFormFieldsState {

  value?: any;
  state?: Immutable.OrderedMap<string, TFieldState>
}

export interface IFormHandler extends OnInit {
  // setFieldValue(field_name: string, value: any);

  // setFieldState(field_name: string, property_name: string, value: any);

  onValueChanged(changes: TFormValue, currentState: IFormStateClass, newState: IFormStateParts);

  onValueHandled(handled: TFormValue, state: IFormStateParts);


  onStateChanged(fieldName: string, propertyName: string, value: any, formValue: any, fields: Immutable.OrderedMap<string, IFieldController>);

  updateEnumFilters(changes: TFormValue, IFormStateHelper);

  Init(formId: string);
}
