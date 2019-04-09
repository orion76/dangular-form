import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormProcess} from "./form-process.service";
import {FORM_PROCESS_SERVICE} from "./types";
import {FormStepService} from "./step.service";
import {FormProcessEventsService} from "./events";


@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class FormProcessModule {
  static forRoot(): ModuleWithProviders {

    return {
      ngModule: FormProcessModule,
      providers: [
        FormProcessEventsService,
        FormStepService,
        {provide: FORM_PROCESS_SERVICE, useClass: FormProcess},
      ],
    };
  }

  static forChild(): ModuleWithProviders {

    return {
      ngModule: FormProcessModule,
      providers: [],
    };
  }
}
