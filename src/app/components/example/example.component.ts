import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import ExampleService from '../../services/example/example.service';

@Component({
    selector: 'app-example',
    template: `
        <div>
            Hello {{name}}! You are {{age}} years old and live in
            {{city}}. Your favourite colour is {{color}}. 
            <span *ngIf="ipAddress">Your IP Address is {{ipAddress}}</span>
        </div>
        <div>
            <label for="city">Update your city</label>
            <input [(ngModel)]="city" required #cityField="ngModel" />
            <div *ngIf="!cityField.valid">City is Required</div>
        </div>
        <div>
            <button (click)="onButtonClick()">Click Me</button>
        </div>
        <div>
            Here's a random number:<br>
            {{randomNumber}}
        </div>
    `,
    providers: [
        ExampleService
    ]
})
export class ExampleComponent {
    @Input() name: string = 'User';
    @Input() age: number;
    @Input() city: string;
    @Input('favouriteColor') color: string;
    @Output() buttonClick: EventEmitter<number> = new EventEmitter();

    ipAddress: string;
    clickCount: number = 0;

    randomNumber: number;

    constructor(private http: Http, private example: ExampleService) {
         this.randomNumber = example.randomNumber();
    }

    ngOnInit() {
        this.getIp().subscribe(
            ip => { this.ipAddress = ip; }
        );
    }

    getIp() {
        // This would be housed in a service usually
        return this.http.get('http://ip.jsontest.com/')
            .map((res: Response) => {
                return res.json().ip;
            })
            .catch((err: Response) => {
                return Observable.throw(err);
            });
    }

    onButtonClick() {
        this.buttonClick.emit(++this.clickCount);
    }

}
