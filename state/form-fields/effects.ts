import {Action, Store} from '@ngrx/store';
import {Inject, Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';

import {DATA_SERVICE} from "@libcomm/injection_tokens";
import {IDataService} from "@libcomm/services/data-service/data.interfaces";
import {IAppState} from "@app/app-store.module";
import {ILoggerProcess, LoggerFactory} from "@libcomm/services/logger";
import {logAction} from "../../process/common";


@Injectable()
export class FormFieldsEffects {



  public logger: ILoggerProcess;

  constructor(private actions$: Actions,
              @Inject(DATA_SERVICE) private data: IDataService,
              loggerFactory: LoggerFactory,
              private store: Store<IAppState>) {
    this.logger = loggerFactory.createProcess();
  }



  dispatchLog(log: Function, action: Action) {

    return logAction(log, action, this.logger);
  }

}
