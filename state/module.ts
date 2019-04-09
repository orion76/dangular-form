import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducer as formReducer, StoreState as FormState} from "./form";
import {reducer as formStatusReducer, StoreState as FormStatusState} from "./form-status";
import {FormValue} from "./form-value";
import {FormFields} from "./form-fields";
import {EffectsModule} from "@ngrx/effects";
import {FormEffects} from "./form/init/effects";
import {FormValueEffects} from "./form-value/effects";
import {FormFieldsEffects} from "./form-fields/effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FormState.featureName, formReducer),
    StoreModule.forFeature(FormStatusState.featureName, formStatusReducer),
    StoreModule.forFeature(FormValue.featureName, FormValue.reducer),
    StoreModule.forFeature(FormFields.featureName, FormFields.reducer),
    EffectsModule.forFeature([FormEffects, FormValueEffects, FormFieldsEffects])
  ],
  providers: []
})
export class FormStoreModule {
}
