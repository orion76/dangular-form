import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IAppState} from "@app/app-store.module";
import {LoggerFactory} from "@libcomm/services/logger/logger.factory";
import {ILoggerProcess} from "@libcomm/services/logger/logger-process";
import {StoreActions} from "./actions";
import {StoreSelectors} from "../selectors";
import {IStatusProps} from "@xangular-store/entity";
import {switchMap} from "rxjs/internal/operators/switchMap";
import {tap} from "rxjs/internal/operators/tap";
import {FormStoreTypes} from "../types";
import Types = StoreActions.Types;
import TActions = StoreActions.Actions;
import IFormState = FormStoreTypes.IFormState;
import IFormStatus = FormStoreTypes.IFormStatus;

@Injectable()
export class FormEffects {

  public logger: ILoggerProcess;

  constructor(private actions$: Actions,
              loggerFactory: LoggerFactory,
              private store: Store<IAppState>) {
    this.logger = loggerFactory.createProcess();
  }

  notComplete = (props: IStatusProps) => this.store.pipe(StoreSelectors.isStatus(props));

  @Effect()
  sectionAdd: any = this.actions$.pipe(
    ofType(Types.SET_CONFIG, Types.SET_FIELDS, Types.LOAD_SUCCESS, Types.SET_FORM_GROUP),

    switchMap((action: TActions) => this.notComplete({stateId: action.stateId, status: 'FORM_COMPLETE', value: true})),

    tap((state: IFormState) => {
      if (this.isComplete(state)) {
        this.store.dispatch(new StoreActions.SET_INIT_COMPLETE(state.stateId));
      }
    })
  );

  isComplete(state: IFormState) {
    const statuses: (keyof IFormStatus)[] = ['CONFIG', 'FORM_GROUP', "FIELDS", "VALUES"];
    return statuses.every((status: keyof IFormStatus) => state.status[status]);
  }

}
