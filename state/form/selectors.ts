import {StoreState} from "./state";
import {IAppState} from "@app/app-store.module";
import {EntitySelectors} from "@xangular-store/entity";
import {MemoizedSelector} from "@ngrx/store";
import {createFeatureSelector} from "@ngrx/store";
import {FormStoreTypes} from "@libcomm/components/forms/state/form/types";


export namespace StoreSelectors {

  import State = StoreState.State;
  import featureName = StoreState.featureName;
  import IFormState = FormStoreTypes.IFormState;

  export const feature: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);
  export const {isStatus, notStatus, entity, entities, entityState, request, status} = EntitySelectors.create<IAppState, IFormState>(feature);
  const sectionFactory = EntitySelectors.sectionFactory(feature);
  export const values = sectionFactory('values');
  export const counts = sectionFactory('counts');
  export const fields = sectionFactory('fields');
  export const enums = sectionFactory('enums');

}
