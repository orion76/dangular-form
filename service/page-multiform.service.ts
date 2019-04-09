import {AfterViewInit, OnInit} from '@angular/core';
import {IConfigMultiform} from '@libcomm/interfaces';
import {IdProviderService} from "../../../services/id.provider.service";


export interface IMultiformController {
    Submit(): void;
}

export abstract class MultiformController implements OnInit, AfterViewInit, IMultiformController {
    public source: string;
    public action: string;
    protected id: string;

    constructor(protected config: IConfigMultiform, protected providerId: IdProviderService) {
    }

    get tabs() {
        return this.config.tabs;
    }

    ngOnInit() {
        this.id = this.providerId.getId();
    }


    ngAfterViewInit() {

    }

    Submit() {
    }

    Cancel() {
    }

}
