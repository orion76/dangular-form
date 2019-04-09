import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";
import {IFormEnumState} from "@libcomm/interfaces/config/select-options.interfaces";


export interface IFormStateSelectOptions {

  readonly length: number;
  readonly state: TFormValue;

  get(fieldName: string): any;

  set(fieldName: string, item: IFormEnumState);
}

export class FormStateSelectOptions implements IFormStateSelectOptions {
  private _items: Map<string, IFormEnumState> = new Map();

  constructor() {

  }

  get length() {
    return Object.keys(this._items).length;
  }

  get state() {
    return this._items;
  }

  get(fieldName: string) {
    return this._items.get(fieldName);
  }

  set(fieldName: string, item: IFormEnumState) {
    this._items.set(fieldName, item);
  }
}

