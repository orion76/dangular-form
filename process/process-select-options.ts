import {Store} from "@ngrx/store";


import {IAppState} from "@app/app-store.module";

export class ProcessSelectOptions {
  constructor(public store: Store<IAppState>) {

  }

  // getSelectIds(formId: string): Observable<string[]> {
  //
  //   const getIds = (fields: IFieldState[]) => fields.map((field: IFieldState) => field.selectId);
  //
  //   return this.store.pipe(
  //     selectNotEmpty(FormFieldsSelectors.SelectFields, {formId}),
  //     map(getIds)
  //   );
  // }
  //
  // getFormWithStatus(formId: string, status: EFormStatus, has = true) {
  //   return this.store.pipe(
  //     selectNotEmpty(FormStatusSelectors.Form, {formId}),
  //     filter((state: IFormStatus) => has === state.status.contains(status))
  //   );
  // }

  // getSelectOptionsLoaded(formId: string): Observable<IFormSelectOptionsState[]> {
  //
  //   return this.getSelectIds(formId).pipe(
  //     takeUntil(this.getFormWithStatus(formId, EFormStatus.SELECT_OPTIONS_LOADED)),
  //     switchMap((ids: string[]) => this.selectOptions(ids, ESelectOptionsStatus.LOAD_SUCCESS)),
  //     take(1)
  //   );
  // }

  // getSelectOptionsFiltersUpdated(formId: string): Observable<IFormSelectOptionsState[]> {
  //   return this.getSelectIds(formId).pipe(
  //     takeUntil(this.getFormWithStatus(formId, EFormStatus.SELECT_OPTIONS_LOADED)),
  //     switchMap((ids: string[]) => this.selectOptions(ids, ESelectOptionsStatus.FILTERS_UPDATED)),
  //     filter((options: IFormSelectOptionsState[]) => options && options.length > 0),
  //   )
  //     ;
  // }


  // selectOptions(ids: string[], status: ESelectOptionsStatus, has = true) {
  //
  //   // const filterByStatus = (options: IFormSelectOptionsState[]) => options
  //   //   .filter((field: IFormSelectOptionsState) => has === field.status.contains(status));
  //
  //   // const notEmpty = (options: IFormSelectOptionsState[]) => options && options.length === ids.length;
  //
  //   return this.store.pipe(
  //     selectNotEmpty(SelectOptionsSelectors.selectByIds, {ids}),
  //     // map(filterByStatus),
  //     take(1)
  //   );
  // }


  // getSelectOptionsNotLoaded(formId: string): Observable<IFormSelectOptionsState[]> {
  //
  //   return this.getSelectIds(formId).pipe(
  //     switchMap((ids: string[]) => this.selectOptions(ids, ESelectOptionsStatus.LOAD_SUCCESS, false)),
  //     take(1)
  //   );
  //
  // };


}
