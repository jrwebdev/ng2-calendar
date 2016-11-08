import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

// TODO Features:
// Angular 2 Material
// Add Event modal
// ngRx/store
// Routing - update url with month + year, edit event
// Firebase
// Tests

// TODO Issues:
// Hot module reloading
// Type checking for templates/properties

@Component({
    selector: 'app-calendar',
    styleUrls: ['./calendar.scss'],
    template: `
        <div class="calendar">
            <div class="month-header">
                <a href="#" class="prev" (click)="prev()">&lt;</a>
                <h1 class="month">{{month}}</h1>
                <a href="#" class="next" (click)="next()">&gt;</a>
            </div>    
            <div class="date-headers">
                <span *ngFor="let header of headers" class="date-header">{{header}}</span>
            </div>
            <div class="dates">
                <div *ngFor="let dateRow of dates" class="date-row">
                    <div *ngFor="let date of dateRow" class="date-container">
                        <span class="date">{{date}}</span>
                        <div class="events"></div>
                    </div>
                </div>
            </div>
        </div>    
    `
})
export class CalendarComponent implements OnInit {
    
    viewDate: Moment = moment();
    month: String;
    headers: String[];
    // TODO: Change to a calendar date interface 
    dates: String[][];

    ngOnInit(): void {
        this.generateDates();
    }

    generateDates(): void {

        this.month = this.viewDate.format('MMMM YYYY');
        this.headers = [];
        this.dates = [];

        const startDate: Moment = this.viewDate.clone().startOf('month').startOf('week');
        const endDate: Moment = this.viewDate.clone().endOf('month').endOf('week');
        const curDate: Moment = startDate.clone();
        
        while (curDate.isSameOrBefore(endDate, 'day')) {
            let dateRow: String[] = [];
            for (let i = 0; i < 7; i++) {
                if (this.headers.length < 7) {
                    this.headers.push(curDate.clone().format('ddd'));
                }
                dateRow.push(curDate.clone().format('DD'));
                curDate.add(1, 'day');
            }
            this.dates.push(dateRow);
        }

    }

    prev(): void {
        this.changeMonth(-1);
    }

    next(): void {
        this.changeMonth(1);
    }

    private changeMonth(delta: number): void {
        this.viewDate = this.viewDate.add(delta, 'month');
        this.generateDates();
    }

}
