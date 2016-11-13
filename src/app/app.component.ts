import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {addEvent, openAddEvent, closeAddEvent} from './state/event';

// TODO Features:
// Persist events
// Interfaces/types
// Routing - update url with month + year, edit event
// Firebase
// Tests
// Form validation/parsing
// i18n

// TODO Issues:
// Hot module reloading
// Type checking for templates/properties

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private eventStore;
  private isAddingEvent: boolean;
  private events: any[] = [];

  constructor(private store: Store<any>) {
    
    this.eventStore = store.select('event');

    // TODO: Update on change only/pure rendering
    // TODO: Store types
    this.eventStore.subscribe(event => {
      this.events = event.list;
      this.isAddingEvent = event.isAddingEvent;
    });

  }

  openAddEvent() {
    this.store.dispatch(openAddEvent());
  }

  cancelAddEvent() {
    this.store.dispatch(closeAddEvent());
  }

  // TODO: Event interface
  addEvent(event) {
    this.store.dispatch(addEvent(event));
  }

}
