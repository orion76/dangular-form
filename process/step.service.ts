import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Steps} from "./steps";
import {filter, tap} from "rxjs/internal/operators";
import {LoggerFactory} from "../../../services/logger/logger.factory";
import {ILoggerProcess} from "../../../services/logger/logger-process";
import {EActionProcess} from "./types";

@Injectable()
export class FormStepService {
  public logger: ILoggerProcess;
  private stepSubject: BehaviorSubject<Steps.TSteps> = new BehaviorSubject<Steps.TSteps>(null);
  private step$: Observable<Steps.TSteps> = this.stepSubject.asObservable();

  constructor(loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createProcess();
  }

  next(log: any, step: Steps.TSteps) {
    const log_prefix = `%c{background-color:#4f4;color:#050;font-weight:bold;padding:1px 3px} STEP EXEC`;
    this.log(log, step.type, 'next');
    this.stepSubject.next(step);
  }

  log(log: any, step: Steps.EStep, status: 'next' | 'on' | 'execute', ...args: any[]) {

    let backColor: string, color: string;
    backColor = '#4f4';
    switch (status) {
      case 'next':

        color = '#050';
        break;
      case 'on':
        backColor = '#494';
        color = '#ff0';
        break;
      case 'execute':

        color = '#090';
        break;
    }

    const log_prefix = `%c{background-color:${backColor};color:${color};font-weight:bold;padding:1px 3px} STEP ${status.toUpperCase()}`;
    this.logger.log(log, [EActionProcess.PROCESS_STEPS], log_prefix, Steps.EStep[step], ...args);
  }

  on(onStep: Steps.EStep, formId: string, log: any) {
    this.log(log, onStep, 'on');
    return this.step$.pipe(
      filter(Boolean),
      filter((step: Steps.TSteps) => step.formId === formId),
      filter((step: Steps.TSteps) => step.type === onStep),
      tap((step: Steps.TSteps) => this.log(log, onStep, 'execute', {formId, step})),
    );
  }
}

