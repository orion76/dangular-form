import {Inject, Injectable} from '@angular/core';
import {IAppState} from "../../../../../app-store.module";
import {Store} from "@ngrx/store";
import {LoggerFactory} from "../../../../services/logger/logger.factory";
import {ILogger} from "../../../../services/logger/logger";
import {ILoggerProcess} from "../../../../services/logger/logger-process";
import {EActionProcess, FORM_PROCESS_SERVICE} from "../../process/types";
import {IFormProcess} from "../../process/types";

export interface IFormSelectOptionsService {
  Init(listId: string): void;

  getOptions(listId: string, source: string, filters?: any[]): void;
}

@Injectable()
export class FormSelectOptionsService implements IFormSelectOptionsService {
  public logger: ILogger;
  public loggerProcess: ILoggerProcess;


  constructor(protected store: Store<IAppState>,
              @Inject(FORM_PROCESS_SERVICE) protected process: IFormProcess,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.create('FormSelectOptionsService');
    this.loggerProcess = loggerFactory.createProcess();

  }

  Init(listId: string) {
    // this.process.data.selectOptions(listId).subscribe((state: IFormSelectOptionsState) => {
    //   this.process.emitEvent(new eventGetOptions(state.id, state.source, state.filters), (v) => console.log(...v));
    // });
  }

  getOptions(listId: string, source: string, filters?: any[]) {

    this.loggerProcess.log(
      (v) => console.log(...v),
      [EActionProcess.FORM_INIT, EActionProcess.FORM_FIELD_SELECT_INIT],
      'FormSelectOptionsService.OPTIONS_LOAD', {listId, source, filters});

    // this.process.dispatch(new getOptions(listId, source, filters));


    // FIXME РАскомментировать и исправить
    // return this.process.onEvent(EProcessEvents.OPTIONS_LOADED).pipe(
    //   map((state: IFormSelectOptionsState) => state.items),
    //   tap((options: IEntity[]) => this.loggerProcess.log([
    //     EActionProcess.FORM_INIT,
    //     EActionProcess.FORM_FIELD_SELECT_INIT
    //   ], 'FormSelectOptionsService.OPTIONS_LOADED', options)));


  }
}
