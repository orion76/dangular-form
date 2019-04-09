import {IButtons, IFormConfig} from "@libcomm/interfaces";
import {IEntity} from "@libcomm/common/entity/interfaces";
import {IFormStateValue} from "./form-state-value";
import {IFormStateFields} from "./form-state-fields";
import {FormStateParts} from "./form-patrs-state";
import {FormStateConfig, IFormStateConfig} from "./form-state-config";
import {FormStateSelectOptions} from "./form-state-select-options";
import {FormStoreTypes} from "@libcomm/components/forms/state/form/types";
import IFormState = FormStoreTypes.IFormState;


// IFormState
// IFormPartsStateHelper
export interface IFormStateClass extends IFormState {
  stateId: string;
  actions: IButtons;
  config: IFormConfig;
  entity: IEntity;

  readonly fields?: IFormStateFields;
  readonly value?: IFormStateValue;
  // readonly form?: IFormStateFormGroup;

}


export class FormState extends FormStateParts implements IFormStateClass {

  actions: IButtons;


  private _state: IFormState;

  constructor(state: IFormState) {
    super();
    this._state = state;
    this._config = new FormStateConfig(this._state.config);
    this._selectOptions = new FormStateSelectOptions();
  }

  _config: IFormStateConfig;

  get config() {
    return this._config;
  }

  get stateId() {
    return this._state.stateId;
  }

  get entityId() {
    return this._state.entity.id;
  }

  get entity() {
    return this._state.entity;
  }

  get source() {
    return this.config.source;
  }

  get status() {
    return this._state.status;
  }
}
