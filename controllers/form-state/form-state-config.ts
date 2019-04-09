import {IFormConfig} from "@libcomm/interfaces";
import {IButtons} from "@libcomm/interfaces";
import {IHTMLElementConfig} from "@libcomm/interfaces/config/html-element.interfaces";
import {TFieldConfig} from "@libcomm/interfaces/config/fields/types";

export interface IFormStateConfig {


  readonly state: IFormConfig;
  readonly source: string;
  readonly actions: IButtons;
  readonly fields: TFieldConfig[];
  readonly elements: IHTMLElementConfig[];


}

/**
 *   source?: string,
 actions?: IButtons,
 fields: IFormFieldConfig[],
 elements?: IHTMLElementConfig[],
 */
export class FormStateConfig implements IFormStateConfig {

  constructor(private _config: IFormConfig) {

  }


  get state(): IFormConfig {
    return this._config;
  }

  get source(): string {
    return this._config.source;
  }

  get actions(): IButtons {
    return this._config.actions;
  }

  get fields(): TFieldConfig[] {
    return this._config.fields;
  }

  get elements(): IHTMLElementConfig[] {
    return this._config.elements;
  }
}

