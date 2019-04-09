import {ILoggerProcess, LoggerFactory} from "@libcomm/services/logger";
import {Inject, Injectable, OnInit} from "@angular/core";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";
import {FORM_PROCESS_SERVICE, IFormProcess} from "../process/types";
import {IFieldController, IFormHandler} from "./types";
import {JSONAPIFilter} from "@libcomm/interfaces";
import {IFormStateClass} from "./form-state/form-state";
import {IFormStateParts} from "./form-state/form-patrs-state";
import * as Immutable from "immutable";
import {IFormStateFields} from "./form-state/form-state-fields";


@Injectable()
export abstract class FormHandler implements IFormHandler, OnInit {
  public loggerProcess: ILoggerProcess;

  protected formId: string;


  constructor(@Inject(FORM_PROCESS_SERVICE) protected process: IFormProcess,
              loggerFactory: LoggerFactory) {

    this.loggerProcess = loggerFactory.createProcess();

  }

  Init(formId: string) {

    this.formId = formId;

    this.process.initHandler(this.formId, this);


  }


  abstract onValueChanged(changes: TFormValue, currentState: IFormStateClass, newState: IFormStateParts);


  updateEnumFilters(changes: TFormValue, newFilters: Map<string, JSONAPIFilter[]>) {
    return null;
  }

  abstract onStateChanged(fieldName: string,
                          propertyName: string,
                          value: any,
                          formValue: any,
                          fields: Immutable.OrderedMap<string, IFieldController>);


  ngOnInit(): void {
    console.log('c%FormHandler.ngOnInit', 'color:red');

  }

  onValueHandled(handled: TFormValue, state: IFormStateParts) {
  }

  protected hideField(fields: IFormStateFields, fieldName: string) {
    this._setFieldState(fields, fieldName, 'hidden', true);
  }

  protected showField(fields: IFormStateFields, fieldName: string) {
    this._setFieldState(fields, fieldName, 'hidden', false);
  }

  private _setFieldState(fields: IFormStateFields, fieldName: string, state: string, value: any) {
    fields.setIn([fieldName, 'state', state], value);
  }
}
