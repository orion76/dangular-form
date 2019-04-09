import {FormControl, FormGroup} from "@angular/forms";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";

export interface IFormStateFormGroup {
  readonly state: FormGroup;

  setForm(form: FormGroup): void;

  updateValues(fields: TFormValue);
}

export class FormStateFormGroup implements IFormStateFormGroup {

  private _form: FormGroup;

  constructor() {

  }

  get state() {
    return this._form;
  }

  setForm(form: FormGroup) {
    this._form = form;
  }

  public updateValues(fields: TFormValue) {

    this.formControls().forEach(({fieldName, control}: { fieldName: string, control: FormControl }) => {
      const value = fields[fieldName];
      const value_old = control.value;
      // this.logger.debug('initValues', fieldName, value);

      if (this.isFieldValueChanged(value_old, value)) {
        control.setValue(value);

      }

    });

    return fields;
  }

  private isFieldValueChanged(value_old: any, value_new: any) {

    if (this.isEmpty(value_old) && this.isEmpty(value_new)) {
      return false;
    }

    if (this.isEmpty(value_old) || this.isEmpty(value_new)) {
      return true;
    }

    if (typeof value_old === 'object') {
      if (value_old.hasOwnProperty('id') && value_old.hasOwnProperty('id')) {
        return value_old.id !== value_new.id;
      }
      return value_old !== value_new;
    }

    return value_old !== value_new;

  }

  private formControls() {
    if (!this._form) {
      return [];
    }
    return Object.keys(this._form.controls).map((fieldName: string) => ({
        fieldName,
        control: this._form.controls[fieldName]
      })
    );
  }

  private isEmpty(value: any) {
    return value === null || value === undefined;
  }

}
