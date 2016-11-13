import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
    selector: 'app-calendar',
    styleUrls: ['./calendar.scss'],
    template: `
        <div class="calendar">
            <div class="month-header">
                <a href="#" class="prev" (click)="prev($event)">
                    <md-icon class="md-24">keyboard_arrow_left</md-icon>
                </a>
                <h1 class="month">{{month}}</h1>
                <a href="#" class="next" (click)="next($event)">
                    <md-icon class="md-24">keyboard_arrow_right</md-icon>
                </a>
            </div>    
            <div class="date-headers">
                <span *ngFor="let header of headers" class="date-header">{{header}}</span>
            </div>
            <div class="dates">
                <div *ngFor="let dateRow of dates" class="date-row">
                    <div *ngFor="let date of dateRow" class="date-container" [ngClass]="{'outside-month': date.isOutsideMonth}">
                        <span class="date">{{date.display}}</span>
                        <div class="events">
                            <div *ngFor="let event of date.events" class="event">
                                <span class="event-time">{{event.datetime | date:'HH:mm'}}</span>
                                <span class="event-title">{{event.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    `
})
export class CalendarComponent implements OnChanges {

    // TODO: Event interface
    @Input() events: any[] = [];
    
    viewDate: Moment = moment();
    month: String;
    headers: String[];
    // TODO: Change to a calendar date interface 
    dates: any[][];

    ngOnChanges(changes) {
        // TODO: Check for changes
        this.generateDates();
    }

    generateDates() {

        // TODO: Pass in current date + events for the month instead
        // TODO: Sort - move to calendar day component
        const events = this.events.reduce((monthEvents, event) => {
            if (this.viewDate.isSame(event.datetime, 'month')) {
                const day = moment(event.datetime).format('D');
                const dayEvents = monthEvents[day] || [];
                monthEvents[day] = [...dayEvents, event];
            }
            return monthEvents;
        }, {});

        this.month = this.viewDate.format('MMMM YYYY');
        this.headers = [];
        this.dates = [];

        const startDate: Moment = this.viewDate.clone().startOf('month').startOf('week');
        const endDate: Moment = this.viewDate.clone().endOf('month').endOf('week');
        const curDate: Moment = startDate.clone();
        
        while (curDate.isSameOrBefore(endDate, 'day')) {
            let dateRow: any[] = [];
            for (let i = 0; i < 7; i++) {
                
                const date: any = {};

                if (this.headers.length < 7) {
                    this.headers.push(curDate.format('ddd'));
                }

                date.display = curDate.format('DD');
                if (this.viewDate.isSame(curDate, 'month')) {
                    date.events = events[curDate.format('D')] || []; 
                } else {
                    date.isOutsideMonth = true;
                }

                dateRow.push(date);
                curDate.add(1, 'day');
            }
            this.dates.push(dateRow);
        }

    }

    prev(e: Event) {
        e.preventDefault();
        this.changeMonth(-1);
    }

    next(e: Event) {
        e.preventDefault();
        this.changeMonth(1);
    }

    private changeMonth(delta: number) {
        this.viewDate = this.viewDate.add(delta, 'month');
        this.generateDates();
    }

}
