import {Injectable} from '@angular/core';
import {IAppState} from "@app/app-store.module";
import {Store} from "@ngrx/store";

interface IFormProcessEventsService {
  // onEntityLoaded(formId: string): Observable<IEntity>;

  // onFieldStateUpdate(formId: string, fieldName: string): void;

  // onFieldValueUpdate(formId: string, fieldName: string): void;

  // onSelectOptionsUpdate(formId: string, fieldName: string): void;
}

@Injectable()
export class FormProcessEventsService implements IFormProcessEventsService {

  constructor(public store: Store<IAppState>) {
  }

  // onStatus(stateId: string, status: TStatusName): Observable<IFormStateClass> {
  //   return this.store
  //     .pipe(FormSelectors.stateStatus({stateId, status, value: true}));
  // }

  // onEntityLoaded(formId: string): Observable<IEntity> {
  //   return this.onStatus(formId, EFormStatus.LOAD_SUCCESS)
  //     .pipe(
  //       map((state: IFormStateClass) => state.entity)
  //     );
  // }

  // onFieldStateUpdate(formId: string, fieldName: string): Observable<IFieldStateProperties> {
  //
  //   return this.store.pipe(
  //     selectForm({formId, status: EFormStatus.FIELDS_STATE_CHANGED}),
  //     map((form: IFormStateClass) => form.fields.getIn([fieldName, 'state']))
  //   );
  //
  // }


  // onFieldValueUpdate(formId: string, fieldName: string) {
  //
  //   this.store.pipe(
  //     selectForm({formId, status: EFormStatus.VALUE_HANDLED}),
  //     map((form: IFormStateClass) => form.value.get(fieldName)),
  //   );
  // }
  //
  // onSelectOptionsUpdate(formId: string, fieldName: string) {
  //   return this.store.pipe(
  //     FormSelectors.selectNotEmpty(SelectOptionsSelectors.selectItem, {formId, fieldName}),
  //     // filter((state: IFormSelectOptionsState) => state.status.contains(ESelectOptionsStatus.LOAD_SUCCESS)),
  //     map((state: IFormEnumState) => state.items)
  //   );
  // }
}


