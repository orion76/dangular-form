import {Store} from '@ngrx/store';
import {Inject, Injectable} from '@angular/core';
import {IAppState} from '@app/app-store.module';

import {IDataService} from "@libcomm/services/data-service";
import {DATA_SERVICE} from "@libcomm/injection_tokens";
import {ILoggerProcess, LoggerFactory} from "@libcomm/services/logger";
import {Actions} from "@ngrx/effects";


@Injectable()
export class FormSelectOptionsStatusEffects {


  public logger: ILoggerProcess;


  constructor(private actions$: Actions,
              @Inject(DATA_SERVICE) private data: IDataService,
              private store: Store<IAppState>,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createProcess();
  }


}
