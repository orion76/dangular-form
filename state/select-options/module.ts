import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducer';
import {FormSelectOptionsEffects} from './effects';
import {StoreState} from "./state";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
    EffectsModule.forFeature([FormSelectOptionsEffects])
  ],
  providers: [FormSelectOptionsEffects]
})
export class FormSelectOptionsStoreModule {
}
