import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dialog',
    styleUrls: ['./dialog.scss'],
    template: `
        <div class="overlay">
            <div class="dialog">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class DialogComponent {}
