import {ChangeDetectorRef, Inject, OnInit} from '@angular/core';

import {IButtons, IKeyValueList} from '@libcomm/interfaces';
import {FormService} from './service/form.service';
import {FormGroup} from "@angular/forms";
import {FORM_ENTITY_CONFIG, FORM_HANDLER} from "../../injection_tokens";
import {IFormConfig} from "@libcomm/interfaces/config/form.interfaces";
import {IdProviderService} from "../../services/id.provider.service";
import {ENTITY_ID_PROVIDER, IEntityIdService} from "../../services/entity-id.service";
import {IFieldController, IFormHandler} from "./controllers/types";
import {LoggerFactory} from "../../services/logger/logger.factory";
import {ILoggerProcess} from "../../services/logger/logger-process";
import {Observable} from "rxjs";


export interface IFormEntityComponent {

}

export abstract class FormEntityComponent implements OnInit, IFormEntityComponent {
  actions$: Observable<IButtons>;
  public logger: ILoggerProcess;
  public fields: IKeyValueList<IFieldController> = {};
  protected form: FormGroup;
  protected formId: string;

  constructor(@Inject(ENTITY_ID_PROVIDER) protected entityId: IEntityIdService,
              @Inject(FORM_ENTITY_CONFIG) protected config: IFormConfig,
              @Inject(FORM_HANDLER) protected handler: IFormHandler,
              protected cdr: ChangeDetectorRef,
              public service: FormService,
              protected providerId: IdProviderService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createProcess();
  }


  debug(enable: boolean, msg: string, ...vars: any[]) {
    if (enable) {
      console.log('Form_Entity_Component.debug', msg, ...vars);
    }

  }

  ngOnInit() {

    this.formId = this.providerId.getId();
    this.handler.Init(this.formId);
    this.service.Init(this.formId, this.config);
    this.service.setEntityId(this.entityId.getId(this));

    this.service.onComplete(this.formId)
      // .subscribe((state: IFormState) => {
      //   this.logger.log((v) => lg(...v), [EActionProcess.FORM_COMPONENT], 'onComplete', state);
      //   this.form = state.form;
      //   this.service.updateFormFields(this.fields);
      // });

  }


}



