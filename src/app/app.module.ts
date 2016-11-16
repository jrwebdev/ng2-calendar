import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import 'hammerjs'; // Needed for Angular Material

import { ExampleComponent } from './components/example/example.component';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EventFormComponent } from './components/event-form/event-form.component';

import eventReducer from './state/event';

@NgModule({
  declarations: [
    ExampleComponent,
    AppComponent,
    CalendarComponent,
    DialogComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore({event: eventReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
