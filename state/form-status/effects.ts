import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IAppState} from "@app/app-store.module";
import {StoreActions as EnumsStatusActions} from "@libcomm/components/forms/state/select-options-status";
import {map} from "rxjs/operators";
import {StoreActions as StatusActions} from "./actions";
import {IFormEnumsStatus} from "@libcomm/interfaces/config/select-options.interfaces";

@Injectable()
export class FormStatusEffects {


  @Effect()
  setEnumsAdded: any = this.actions$.pipe(
    ofType<EnumsStatusActions.AddMany>(EnumsStatusActions.Types.ADD_MANY),
    map((action: EnumsStatusActions.AddMany) => {
      const fieldNames = action.states.map((state: IFormEnumsStatus) => state.fieldName);
      return new StatusActions.addEnums(action.formId, fieldNames);
    })
  );


  @Effect()
  setEnumStatusLoaded: any = this.actions$.pipe(
    ofType<EnumsStatusActions.setLoaded>(EnumsStatusActions.Types.SET_LOADED),
    map((action: EnumsStatusActions.setLoaded) => {
      return new StatusActions.addEnumLoaded(action.formId, action.fieldName);

    })
  );

  @Effect()
  setEnumStatusChanged: any = this.actions$.pipe(
    ofType<EnumsStatusActions.setChanged>(EnumsStatusActions.Types.SET_CHANGED),
    map((action: EnumsStatusActions.setChanged) => {
      return new StatusActions.addEnumChanged(action.formId, action.fieldName);

    })
  );


  constructor(private actions$: Actions,
              private store: Store<IAppState>) {

  }


}
