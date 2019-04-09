import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducer';
import {FormSelectOptionsStatusEffects} from './effects';
import {StoreState} from "./state";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
    EffectsModule.forFeature([FormSelectOptionsStatusEffects])
  ],
  providers: [FormSelectOptionsStatusEffects]
})
export class FormSelectOptionsStatusStoreModule {
}
