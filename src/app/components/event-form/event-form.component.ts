import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-event-form',
    styleUrls: ['./event-form.scss'],
    template: `
        <div>
            <h2>Add Event</h2>
            <form name="event" (submit)="onAdd()">
                <div class="field">
                    <label for="title">Title</label>
                    <input id="title" [(ngModel)]="title" name="title" />
                </div>
                <div class="field">
                    <label for="date">Date</label>
                    <input type="date" id="date" [(ngModel)]="date" name="date" />
                </div>
                <div class="field">
                    <label for="time">Time</label>
                    <input type="time" id="time" [(ngModel)]="time" name="time" />
                </div>        
                <div class="field">
                    <label for="description">Description</label>
                    <textarea id="description" [(ngModel)]="description" name="description"></textarea>                
                </div>
                <div class="btn-row">
                    <button md-button type="button" (click)="onCancel()">Cancel</button>
                    <button md-raised-button color="primary" type="submit">Add</button>
                </div>
            </form>
        </div>
    `
})
export class EventFormComponent {

    @Output() cancel: EventEmitter<undefined> = new EventEmitter();
    @Output() add: EventEmitter<any> = new EventEmitter();
    
    title: string;
    date: string;
    time: string;
    description: string;
    
    private reset() {
        this.title = '';
        this.date = '';
        this.time = '';
        this.description = '';
    }

    onCancel() {
        this.cancel.emit();
        this.reset();
    }

    onAdd() {
        // TODO: Event interface
        const event = {
            title: this.title,
            datetime: new Date(`${this.date} ${this.time}`),
            description: this.description
        };
        this.add.emit(event);
        this.reset();
    }
}
