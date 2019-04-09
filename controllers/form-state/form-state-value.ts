import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";

export interface IFormStateValue {

  readonly length: number;
  fields: TFormValue;

  has(fieldName: string): boolean;

  get(fieldName: string): any;

  set(fieldName: string, value: any);
}

export class FormStateValue implements IFormStateValue {
  private _value: TFormValue = {};


  get length() {
    return Object.keys(this._value).length ;
  }

  get fields() {
    return this._value;
  }

  set fields(value: TFormValue) {
    this._value = value;
  }

  set(fieldName: string, value: any) {
    this._value[fieldName] = value;
  }

  has(fieldName: string): boolean {
    return Boolean(this._value[fieldName]);
  }

  get(fieldName: string) {
    return this._value[fieldName];
  }
}

