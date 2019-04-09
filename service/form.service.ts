import {FormControl, FormGroup} from '@angular/forms';
import {IButton, IButtons, IFormConfig} from '@libcomm/interfaces';
import {Inject} from "@angular/core";
import {DATA_SERVICE, TITLE_SERVICE} from "@libcomm/injection_tokens";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";
import {IDataService} from "@libcomm/services/data-service/data.interfaces";
import {IEntity} from "@libcomm/common/entity/interfaces";

import {LoggerFactory} from "@libcomm/services/logger/logger.factory";
import {prepareButton} from "@libcomm/common/entity/form-actions";

import {ILoggerProcess} from "@libcomm/services/logger/logger-process";
import {BehaviorSubject, Observable} from "rxjs";
import {EActionProcess, FORM_PROCESS_SERVICE, IFormProcess} from "../process/types";

import {lg} from "@libcomm/nglog";
import {ITitleService} from "@libcomm/services/title.service";
import {StoreActions} from "../state/form/init/actions";
import {IField, TFieldState} from "@libcomm/interfaces/config/fields/types";


export interface IFormService {
  value: any;
  stateId: string;
  form: FormGroup;
  actions$: Observable<IButtons>;

  // updateFormFields(formFields: IKeyValueList<IFieldController>);

  formControls();

  Init(id: string, config: IFormConfig);

  isFieldValueChanged(value_old: any, value_new: any);

  initActions(buttons: IButtons);

  // updateFieldsState(fields: Immutable.OrderedMap<string, IField>);

  updateValues(entity: IEntity);

  onComplete(formId: string);

  // onFieldStateUpdate(fieldName: string);

  // onFieldValueUpdate(fieldName: string);

  // onSelectOptionsUpdate(selectId: string);

  changeValue(fieldName: string, value: any);
}


export class FormService implements IFormService {

  public value: any;
  public form: FormGroup;

  public logger: ILoggerProcess;
  public stateId: string;
  private actionsSubject = new BehaviorSubject<IButtons>(null);
  public actions$ = this.actionsSubject.asObservable();
  private _fields: Map<string, IField> = new Map();

  constructor(@Inject(DATA_SERVICE) private data: IDataService,
              @Inject(TITLE_SERVICE) public titleService: ITitleService,
              loggerFactory: LoggerFactory,
              @Inject(FORM_PROCESS_SERVICE) protected process: IFormProcess,
              // private events: FormProcessEventsService,
              ) {

    this.logger = loggerFactory.createProcess();

    // this.subscribeEvents();

  }

  changeValue(fieldName: string, value: any) {
    this.process.setValue(this.stateId, {[fieldName]: value});
  }

  // updateFormFields(formFields: IKeyValueList<IFieldController>) {
  //   Array.from(this._fields.entries())
  //
  //     .filter(([fieldName, field]) => !formFields[fieldName])
  //     .forEach(([fieldName, field]) => {
  //       formFields[fieldName] = field;
  //     });
  // }

  Init(formId: string, config: IFormConfig) {
    this.stateId = formId;

    this.process.dispatch(v => lg(...v), new StoreActions.SET_CONFIG(this.stateId, config));

    // this.events.onEntityLoaded(formId)
    //   .subscribe((entity: IEntity) => {
    //
    //     this.titleService.setTitle(entity.label);
    //   });

  }

  onComplete(formId: string) {

    // return this.process.onFormStatus(EFormStatus.FORM_COMPLETE, true, formId)
    //   .subscribe((state: IFormStateClass) => {
    //     this.form = state.form;
    //     // this.updateFieldsState(state.fields.changes);
    //     this.updateValues(state.value.fields);
    //   });

  }

  setEntityId(entityId: string) {
    this.process.setEntityId(this.stateId, entityId);
  }


  debug(...vars: any[]) {
    lg('FormControllerService', ...vars);
  }

  onFieldValueChanged() {
    this.logger.log((v) => lg(...v), [EActionProcess.EVENT], 'onFieldValueChanged', this.value);
  }

  onSubmit() {
    this.logger.log((v) => lg(...v), [EActionProcess.EVENT], 'onSubmit', this.value);
  }

  onClose() {
    this.logger.log((v) => lg(...v), [EActionProcess.EVENT], 'onClose', this.value);
  }

  onSaveAndClose() {
    this.logger.log((v) => lg(...v), [EActionProcess.EVENT], 'onSaveAndClose', this.value);
    this.onSubmit();
    this.onClose();
  }

  // onFieldStateUpdate(fieldName: string) {
  //   return this.events.onFieldStateUpdate(this.stateId, fieldName);
  // }

  // onFieldValueUpdate(fieldName: string) {
  //   return this.events.onFieldValueUpdate(this.stateId, fieldName);
  // }

  // onSelectOptionsUpdate(fieldName: string) {
  //   return this.events.onSelectOptionsUpdate(this.stateId, fieldName);
  // }

  // updateFieldsState(changes: OrderedMap<string, IField>) {
  //
  //   changes.forEach((state_new: IField) => {
  //     if (this._fields.has(state_new.name)) {
  //
  //       const state_old: IField = this._fields.get(state_new.name);
  //
  //
  //       this.logger.log((v) => lg(...v), [EActionProcess.FORM_SERVICE], 'updateFieldsState: update', state_new);
  //       this._fields.field(state_new.name).state = state_new.state;
  //
  //     }
  //   });
  //
  // }

  /**
   * @param {IButtons} buttons
   */
  public initActions(buttons: IButtons) {

    buttons.items.forEach((button: IButton) => {
      prepareButton(button);
      switch (button.name) {
        case 'save':
          button.command = ((event: any) => this.onSubmit());
          break;
        case 'close':
          button.command = ((event: any) => this.onClose());
          break;
        case 'save_and_close':
          button.command = ((event: any) => this.onSaveAndClose());
          break;
      }
    });
    return buttons;
  }

  public formControls() {
    if (!this.form) {
      return [];
    }
    return Object.keys(this.form.controls)
      .map((fieldName: string) => ({fieldName, control: this.form.controls[fieldName]}));
  }

  public updateValues(fields: TFormValue) {

    this.formControls().forEach(({fieldName, control}: { fieldName: string, control: FormControl }) => {
      const value = fields[fieldName];
      const value_old = control.value;
      // this.logger.debug('initValues', fieldName, value);

      if (this.isFieldValueChanged(value_old, value)) {
        control.setValue(value);
        this.logger.log((v) => lg(...v), [EActionProcess.FORM_SERVICE], 'initValues.value_changed', fieldName, value);
      }

    });

    return fields;
  }

  public isFieldValueChanged(value_old: any, value_new: any) {

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


  private isEmpty(value: any) {
    return value === null || value === undefined;
  }

  private isFieldStateEqual(state_old: TFieldState, state_new: TFieldState) {
    return [
      'required',
      'editable',
      'title',
      'description',
      'hidden'
    ].every((stateName: string) => state_old.state[stateName] === state_new.state[stateName]);
  }

  private isFieldStateChanged(state_old: TFieldState, state_new: TFieldState) {
    if (this.isEmpty(state_old) && this.isEmpty(state_new)) {
      return false;
    }

    if (this.isEmpty(state_old) || this.isEmpty(state_new)) {
      return true;
    }

    return this.isFieldStateEqual(state_old, state_new) === false;


  }

}
