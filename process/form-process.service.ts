import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, switchMap, withLatestFrom} from "rxjs/internal/operators";
import {ILoggerProcess, LoggerFactory} from "@libcomm/services/logger";
import {Action, Store} from "@ngrx/store";
import {IAppState} from "@app/app-store.module";
import {EActionProcess, IFormControl, IFormProcess} from "./types";
import {lg} from "@libcomm/nglog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";
import {IFormHandler} from "../controllers/types";


import {IdProviderService} from "@libcomm/services/id.provider.service";
import {FormFieldsActions} from "../state/form-fields/actions";
import {StoreActions as FormValueActions} from "../state/form-value/actions";
import {DATA_SERVICE} from "@libcomm/injection_tokens";
import {IDataService} from "@libcomm/services/data-service/data.interfaces";
import {Steps} from "./steps";
import {ProcessSelectOptions} from "./process-select-options";
import {FormStepService} from "./step.service";
import {StoreActions as EnumsActions} from "../state/select-options";


import {logAction} from "./common";
import {FormState, IFormStateClass} from "@libcomm/components/forms/controllers/form-state/form-state";
import {IFormStateFields} from "@libcomm/components/forms/controllers/form-state/form-state-fields";
import {ESelectOptionsStatus, IFormEnumState} from "@libcomm/interfaces/config/select-options.interfaces";

import {StoreActions as FormActions, StoreSelectors as FormSelectors} from "@libcomm/components/forms/state/form";

import {IField, IFieldEnumState, IFieldReferenceConfig} from "@libcomm/interfaces/config/fields/types";
import {EntityStoreSelectors} from "@libcomm/store/entity";
import {FormStoreTypes} from "@libcomm/components/forms/state/form/types";
import IFormState = FormStoreTypes.IFormState;
import TStatusName = FormStoreTypes.TStatusName;


@Injectable()
export class FormProcess implements IFormProcess {

  public logger: ILoggerProcess;
  public processSelectOptions: ProcessSelectOptions;
  private stepSubject: BehaviorSubject<Steps.TSteps> = new BehaviorSubject<Steps.TSteps>(null);
  private step$: Observable<Steps.TSteps> = this.stepSubject.asObservable();

  private selectors = FormSelectors;

  // private processValue: ProcessValue;

  constructor(public store: Store<IAppState>,
              public step: FormStepService,
              private providerId: IdProviderService,
              // public valueEffects: FormValueEffects,
              private fb: FormBuilder,
              @Inject(DATA_SERVICE) private data: IDataService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createProcess();
    // this.processValue = new ProcessValue(valueEffects, store);
    this.processSelectOptions = new ProcessSelectOptions(store);
  }


  setValue(formId: string, fields: TFormValue) {
    debugger;
    this.dispatch(v => lg(...v), new FormValueActions.setChanged(formId, fields));
  }

  onFormStatus(status: TStatusName, value: any, stateId: string): Observable<IFormState> { // Observable<IFormStateHelper>
    return this.store.pipe(
      this.selectors.isStatus<IAppState, IFormState>({stateId, status, value}),
    );
  }

  formState(stateId: string) {
    return this.store.pipe(
      this.selectors.state({stateId}),
      withLatestFrom((state: IFormState) => {
        return {};
      })
    );
  }

  nextStep(formId: string, step: Steps.TSteps, log: any) {

    const log_prefix = `%c{background-color:#050;font-weight:bold;padding:1px 3px} STEP START`;


    this.logger.log(log, [EActionProcess.PROCESS_STEPS], log_prefix, Steps.EStep[step.type]);
    this.step.next(log, step);

  }

  setEntityId(formId: string, entityId: string) {
    // this.onFormStatus(EFormStatus.ADD_FORM, formId)
    //   .subscribe(() => this.dispatch(v => lg(...v), new FormActions.setEntityId(formId, entityId)));
  }

  initStepsFormInit(formId: string) {
    this.step.on(Steps.EStep.ADD_FORM, formId, v => lg(...v))
      .subscribe((step: Steps.addForm) => {
        const {state} = step;

        state.fields.addFields(state.config.fields);

        this.dispatch(v => lg(...v), new FormFieldsActions.addFields(state.stateId, state.fields.state));

        // this.onFormStatus(EFormStatus.FIELDS_STATE_CHANGED, formId).subscribe((state: IFormStateHelper) => {
        //   this.nextStep(formId, new Steps.initForm(formId, state), v => lg(...v));
        // });
      });

    this.step.on(Steps.EStep.INIT_FORM, formId, v => lg(...v))
      .subscribe((step: Steps.initForm) => {
        const {state} = step;

        this.createEnums(formId, state);

        this.dispatch(v => lg(...v),
          new FormActions.SET_FORM_GROUP(formId, this.createFormGroup(formId, state.fields))
        );


        // this.onFormStatus(EFormStatus.SET_FORM_GROUP, formId).subscribe((state: IFormStateHelper) => {
        //   this.nextStep(formId, new Steps.entityIdComplete(formId, state.source, state.entityId), v => lg(...v));
        // });

      });

    this.step.on(Steps.EStep.ENTITY_ID_COMPLETE, formId, v => lg(...v))
      .subscribe((step: Steps.entityIdComplete) => {
        const {source, entityId} = step;
        this.dispatch(v => lg(...v), new FormActions.LOAD(formId, {source, entityId}));


        // this.onFormStatus(EFormStatus.LOAD_ENTITY_SUCCESS, formId).subscribe((state: IFormStateHelper) => {
        //   this.nextStep(formId, new Steps.entityLoadSuccess(formId, state.entity), v => lg(...v));
        //   this.nextStep(formId, new Steps.entityLoadError(formId, state.source, state.entityId), v => lg(...v));
        // });

      });

    this.step.on(Steps.EStep.ENTITY_LOAD_SUCCESS, formId, v => lg(...v))
      .subscribe((step: Steps.entityLoadSuccess) => {
        const {entity} = step;


        this.dispatch(v => lg(...v), new FormValueActions.setChanged(formId, entity.values));


        // this.onFormStatus(EFormStatus.VALUE_CHANGED, formId).subscribe((state: IFormStateHelper) => {
        //   this.nextStep(formId, new Steps.entityValueChanged(formId, state.value), v => lg(...v));
        // });

      });

  }


  initHandler(formId: string, handler: IFormHandler) {

    // this.onFormStatus(EFormStatus.ADD_FORM, formId)
    //   .subscribe((state: IFormStateHelper) => {
    //
    //     state.fields.filterEnums();
    //
    //     this.nextStep(formId, new Steps.addForm(formId, state), v => lg(...v));
    //   });

    this.initStepsFormInit(formId);

    this.step.on(Steps.EStep.ENTITY_VALUE_CHANGED, formId, v => lg(...v))
      .subscribe((step: Steps.entityValueChanged) => {

        //    this.store.pipe(
        //     selectNotEmpty(FormSelectors.FormFull, {formId}),
        //      take(1)
        //    ).subscribe((formState: IFormStateHelper) => {
        //
        //      const {changes} = step;
        //
        //      const stateChanges = new FormPartsStateHelper();
        //
        //      handler.onValueChanged(changes, formState, stateChanges);
        //
        //
        //      this.dispatch(v => lg(...v), new FormValueActions.setHandled(formId, stateChanges.value.fields));
        //      this.dispatch(v => lg(...v), new FormFieldsActions.setHandled(formId, stateChanges.fields.state));


        // this.onFormStatus(EFormStatus.VALUE_HANDLED, formId).subscribe((state: IFormStateHelper) => {
        //
        //   this.nextStep(formId, new Steps.entityValueHandled(formId, state), v => lg(...v));
        // });

        // });
        //
      });

    this.step.on(Steps.EStep.ENTITY_VALUE_HANDLED, formId, v => lg(...v))
      .subscribe((step: Steps.entityValueHandled) => {
        const {formState} = step;

        const fields = formState.fields;

        handler.updateEnumFilters(formState.value, formState);

        const updatedFilters = fields.changes;


        if (updatedFilters.size > 0) {
          updatedFilters.forEach((field: IField) => {
            this.dispatch(v => lg(...v), new EnumsActions.updateFilters(formId, field.name, fields.getFilter(field.name)));
          });
        }


        fields.filterEnums().forEach((field: IFieldEnumState) => {
          // this.onEnumStatus(ESelectOptionsStatus.FILTERS_UPDATED, formId, field.name)
          //   .subscribe((select: IFormEnumState) => {
          //     this.nextStep(formId, new Steps.selectOptionsLoad(formId, select), v => lg(...v));
          //   });

        });


      });


    // this.step.on(Steps.EStep.SELECT_OPTIONS_LOAD, formId, v => lg(...v))
    //   .subscribe((step: Steps.selectOptionsLoad) => {
    //     const {field} = step;
    //     this.dispatch(v => lg(...v), new SelectOptionsActions.Load(field.selectId));
    //
    //
    //     this.onSelectOptionsStatus(ESelectOptionsStatus.LOAD_SUCCESS, field.selectId)
    //       .subscribe((select: IFormSelectOptionsState) => {
    //         debugger;
    //         this.nextStep(formId, new Steps.selectOptionsLoad(formId, select), formFull, v => lg(...v));
    //       });
    //   });

    this.step.on(Steps.EStep.SELECT_OPTIONS_LOADED, formId, v => lg(...v))
      .subscribe((step: Steps.selectOptionsLoaded) => {
        const {options} = step;

        // this.onFormStatus(EFormStatus.ENUMS_LOADED, formId).subscribe((state: IFormStateHelper) => {
        //   this.nextStep(formId, new Steps.formComplete(formId), v => lg(...v));
        // });

      });


    this.step.on(Steps.EStep.FORM_COMPLETE, formId, v => lg(...v))
      .subscribe((step: Steps.formComplete) => {

        // this.dispatch(v => lg(...v), new FormStore.actions.setFormStatus(formId, EFormStatus.FORM_COMPLETE));

        // this.startStep(Steps.EStep.FORM_COMPLETE, formId);

      });


  }

  onEnumStatus(status: ESelectOptionsStatus, formId: string, fieldName: string) { // Observable<IFormEnumState>
    // return this.store.pipe(
    //   selectNotEmpty(EnumsStatusSelectors.Entity, {formId, fieldName}),
    //   tap((item: IFormEnumsStatus) => console.log('111111111', {item, status})),
    //   filter((item: IFormEnumsStatus) => item.status.contains(status)),
    //   tap((item: IFormEnumsStatus) => console.log('22222222', item)),
    //   switchMap((item: IFormEnumsStatus) => this.store.pipe(
    //     selectNotEmpty(EnumsSelectors.selectItem, {formId, fieldName}))
    //   ),
    //
    //   tap((enumState) => console.log('333333333', {enumState})),
    // );
  }

  dispatch(log: Function, action: Action) {
    this.dispatchLog(log, action);

    this.store.dispatch(action);
  }

  dispatchLog(log: Function, action: Action) {
    return logAction(log, action, this.logger);
  }


  createFormGroup(formId: string, fields: IFormStateFields): FormGroup {

    const form_fields = fields.state.reduce((acc, field: IField) => {
      acc[field.name] = null;
      return acc;
    }, {});

    const form: FormGroup = this.fb.group(form_fields);

    this.subscribeFormEvents(formId, form);

    return form;
  }

  subscribeFormEvents(formId: string, form: FormGroup) {
    const controls = this._formControls(form);

    /**
     * Subscribe USER changes
     *
     * filter(() => control.dirty)
     */
    controls.forEach(({fieldName, control}) => {
      control.valueChanges
        .pipe(filter(() => control.dirty))
        .subscribe((value: any) => {
          // this.dispatch(new changeFieldValueUser(formId, fieldName, value));
        });
    });

    /**
     * Subscribe PROGRAMM changes
     *
     * filter(() => control.pristine)
     */
    controls.forEach(({fieldName, control}) => {
      control.valueChanges.pipe(
        filter(() => control.pristine),
        map((value) => {

          // this.dispatch(new changeFieldValueProgramm(formId, fieldName, value));
        })
      );
    });


  }

  _formControls(form: FormGroup): IFormControl[] {
    return Object.keys(form.controls)
      .map((fieldName: string): IFormControl => ({fieldName, control: form.controls[fieldName]}));
  }

  createEnums(formId: string, state: IFormStateClass) {
    const {fields} = state;

    const enums: IFormEnumState[] = [];

    fields.filterEnums().forEach((field: IField) => {
      enums.push({
        formId,
        fieldName: field.name,
        source: (field.config as IFieldReferenceConfig).source.id,
        filters: state.fields.getFilter(field.name),
        items: []
      });
    });

    this.dispatch(v => lg(...v), new EnumsActions.AddMany(formId, enums));
  }


}
