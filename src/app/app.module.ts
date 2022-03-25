import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './overview/overview.component';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { ListComponent } from './list/list.component';
import {MatListModule} from '@angular/material/list';
import { ConversationItemComponent } from './list/conversation-item/conversation-item.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { LogInComponent } from './log-in/log-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackComponent } from './feedback-list/feedback/feedback.component';
import { DashboardComponent } from './overview/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ListComponent,
    ConversationItemComponent,
    LogInComponent,
    FeedbackListComponent,
    FeedbackComponent,
    DashboardComponent,
    MonacoEditorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
