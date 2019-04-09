import {Component, Input, NgModule, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {IButtons} from "@libcomm/interfaces";

@Component({
    selector: 'form-buttons',
    template: `
        <div class="button-group-right">
            <p-button *ngFor="let btn of buttons" [label]="btn.label" [styleClass]=btn.styleClass></p-button>
        </div>

    `
})

export class FormButtonsComponent implements OnInit {
    @Input() actions: IButtons;


    constructor() {
    }

    get buttons() {
        return this.actions.items;
    }



    ngOnInit() {
        const n = 0;
    }
}


@NgModule({
    imports: [CommonModule, ButtonModule],
    exports: [FormButtonsComponent],
    declarations: [FormButtonsComponent],
    providers: [],
})
export class FormButtonsModule {
}
