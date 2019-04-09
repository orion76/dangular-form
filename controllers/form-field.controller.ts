import {IFieldController} from "./types";
import {IFormService} from "@libcomm/components/forms/service/form.service";
import {TFieldConfig, TFieldState} from "@libcomm/interfaces/config/fields/types";

export class FormFieldController implements IFieldController {

  constructor(private _config: TFieldConfig, private service: IFormService) {

  }

  private _state: TFieldState;

  get state() {
    return this._state;
  }

  set state(newState: TFieldState) {
    this._state = newState;
  }

  get config() {
    return this._config;
  }

  get title(): string {
    return this._state.state.title;
  };

  get description(): string {
    return this._state.state.description;
  };

  get name() {
    return this._state.config.name;
  }

  get type() {
    return this._state.config.type;
  }

  // onStateUpdate(): Observable<IFieldStateProperties> {
  //   return this.service.onFieldStateUpdate(this.name);
  // }
  //
  // onValueUpdate(): Observable<any> {
  //   return this.service.onFieldValueUpdate(this.name);
  // }

  // onSelectOptionsUpdate(): Observable<IEntity[]> {
  //   return this.service.onSelectOptionsUpdate(this.name);
  // }

  // getValue(name: keyof IFormFieldStateValue) {
  //   return this.getProperty(['value', name]);
  // }

  // getOptions(name: keyof IFormFieldListConfig) {
  //   return this.getProperty(['select', name]);
  // }

  changeValue(value: any) {
    this.service.changeValue(this.name, value);
  }


}
