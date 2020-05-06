import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider'; 
import {HomeComponent} from './home/home.component';
import {PatientsComponent} from './patients/patients.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { HttpClientModule } from '@angular/common/http';
import { QuestionsServices } from './services/QuestionsServices';
import {MatRadioModule} from '@angular/material/radio'; 
import {TestComponent} from './test/test.component';
import {Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'patients', component: PatientsComponent },
  { path: 'test', component: TestComponent },
  { path: '', component: PatientsComponent },
];
@NgModule({
  declarations: [
    HomeComponent,
    PatientsComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    HttpClientModule,
    MatRadioModule,
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule],
  bootstrap: [HomeComponent],
  providers: [QuestionsServices,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})

export class AppModule { }
