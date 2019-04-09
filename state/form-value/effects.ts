import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {IAppState} from "@app/app-store.module";
import {ILoggerProcess, LoggerFactory} from "@libcomm/services/logger";

@Injectable()
export class FormValueEffects {

  // @Effect()
  // setChanged: Observable<Action> = this.actions$.pipe(
  //   ofType<FormValueActions.setChanged>(FormValueActions.Types.SET_VALUE_CHANGED),
  //   switchMap((action: FormValueActions.setChanged) => this.replaceStatus(v => lg(...v), action.formId, EFormStatus.VALUE_HANDLED, EFormStatus.VALUE_CHANGED))
  // );
  //
  //
  // @Effect()
  // setHandled: Observable<Action> = this.actions$.pipe(
  //   ofType<FormValueActions.setHandled>(FormValueActions.Types.SET_VALUE_HANDLED),
  //   switchMap((action: FormValueActions.setHandled) => this.replaceStatus(v => lg(...v), action.formId, EFormStatus.VALUE_CHANGED, EFormStatus.VALUE_HANDLED))
  // );

  public logger: ILoggerProcess;

  constructor(private actions$: Actions,
              loggerFactory: LoggerFactory,
              private store: Store<IAppState>) {
    this.logger = loggerFactory.createProcess();
  }


}
