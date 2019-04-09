import {FormStateFields, IFormStateFields} from "./form-state-fields";
import {FormStateValue, IFormStateValue} from "./form-state-value";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";
import * as Immutable from "immutable";
import {IFormStateSelectOptions} from "./form-state-select-options";
import {IField} from "@libcomm/interfaces/config/fields/types";
import {FormGroup} from "@angular/forms";

export interface IFormStateParts {
  readonly fields?: IFormStateFields;
  readonly value?: IFormStateValue;
  readonly form?: FormGroup;
  readonly selectOptions?: IFormStateSelectOptions;

  setFields(fields: Immutable.OrderedMap<string, IField>);

  setValue(value: TFormValue);
}

export class FormStateParts implements IFormStateParts {

  constructor() {
    this._value = new FormStateValue();
    this._fields = new FormStateFields();
  }

  _selectOptions: IFormStateSelectOptions;

  get selectOptions(): IFormStateSelectOptions {
    return this._selectOptions;
  }

  _fields: IFormStateFields;

  get fields() {
    return this._fields;
  }

  private _value: IFormStateValue;

  get value(): IFormStateValue {
    return this._value;
  }

  private _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  setValue(value: TFormValue) {
    this.value.fields = value;
  }

  setFields(fieldsState: Immutable.OrderedMap<string, IField>) {

    this.fields.state = fieldsState;
  }

}
