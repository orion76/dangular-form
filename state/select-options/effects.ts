import {Action, Store} from '@ngrx/store';
import {Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IAppState} from '@app/app-store.module';
import {IDataService} from "@libcomm/services/data-service";
import {DATA_SERVICE} from "@libcomm/injection_tokens";
import {ILoggerProcess, LoggerFactory} from "@libcomm/services/logger";

import {EActionProcess} from "../../process/types";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ESelectOptionsStatus, IFormEnumState} from "@libcomm/interfaces/config/select-options.interfaces";
import {StoreActions as EnumsActions} from "@libcomm/components/forms/state/select-options";
import {StoreActions as EnumsStatusActions} from "@libcomm/components/forms/state/select-options-status";
import {EnumFlagged} from "@libcomm/enum-flagged";

@Injectable()
export class FormSelectOptionsEffects {


  public logger: ILoggerProcess;

  @Effect()
  AddMany: Observable<Action> = this.actions$.pipe(
    ofType<EnumsActions.AddMany>(EnumsActions.Types.ADD_MANY),
    map((action: EnumsActions.AddMany) => {
        const statuses = action.enums.map((item: IFormEnumState) => {
          return {
            formId: action.formId,
            fieldName: item.fieldName,
            status: new EnumFlagged<ESelectOptionsStatus>(ESelectOptionsStatus, ESelectOptionsStatus.ADD)
          };
        });
        return new EnumsStatusActions.AddMany(action.formId, statuses);
      }
    ));


  @Effect()
  Update: Observable<Action> = this.actions$.pipe(
    ofType<EnumsActions.Actions>(
      EnumsActions.Types.ENUM_LOAD,
      EnumsActions.Types.UPDATE_FILTERS
    ),
    map((action: EnumsActions.Load) => new EnumsStatusActions.setChanged(action.formId, action.fieldName)));

  @Effect()
  LoadSuccess: Observable<Action> = this.actions$.pipe(
    ofType<EnumsActions.LoadSuccess>(EnumsActions.Types.ENUM_LOAD_SUCCESS),
    map((action: EnumsActions.LoadSuccess) => new EnumsStatusActions.setLoaded(action.formId, action.fieldName)));

  constructor(private actions$: Actions,
              @Inject(DATA_SERVICE) private data: IDataService,
              private store: Store<IAppState>,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createProcess();
  }

  dispatchLog(log: Function, action: Action, ...args: any[]) {
    this.logger.log(log, [EActionProcess.PROCESS_SELECT_OPTIONS], `%c{color:#fa0} DISPATCH`, action, ...args);
    return action;
  }

  dispatch(log: Function, action: Action) {
    this.dispatchLog(log, action);
    this.store.dispatch(action);

  }

  // replaceStatus(action: StoreActions.Actions, statusOld: ESelectOptionsStatus, statusNew: ESelectOptionsStatus) {
  //   return of(this.dispatchLog(v => lg(...v), new StatusActions.replaceStatus(
  //     action.selectId, statusOld, statusNew,
  //   ), {
  //     statusOld: ESelectOptionsStatus[statusOld],
  //     statusNew: ESelectOptionsStatus[statusNew]
  //   }));
  // }


}
