import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
    selector: 'app-calendar',
    styleUrls: ['./calendar.scss'],
    template: `
        <div class="calendar">
            <h2 class="month">{{month}}</h2>
            <div class="headers">
                <span *ngFor="let header of headers" class="header">{{header}}</span>
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
    // TODO: Change to a calendar date interface
    month: String = this.viewDate.format('MMMM') 
    headers: String[] = [];
    dates: String[][] = [];

    // TODO: Move to onChanges
    ngOnInit() {
        
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

}
