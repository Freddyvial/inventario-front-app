import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { AgmCoreModule } from '@agm/core';
import {FooterComponent} from './footer/footer.component';
import { ChartsModule } from 'ng2-charts';
import {ArticleComponent} from './article/article.component';
import {ArticleServices} from './services/ArticleServices';
import {RoomComponent} from './room/room.component';
import {RoomServices} from './services/RoomServices';
import {CampusComponent} from './campus/campus.component';
import {CampusService} from './services/CampusService';
import {MenuServices} from './services/MenuServices';
import {ReportComponent} from './report/report.component';
import {MatListModule} from '@angular/material/list';
import {ReportService} from './services/ReportService';
import {UserComponent} from './user/user.component';
import {InventoryMovement} from './inventoryMovement/inventoryMovement.component'
import {InventoryMovementService} from './services/InventoryMovementServices'
  import { from } from 'rxjs';
const routes: Routes = [
  { path: 'articles', component: ArticleComponent ,canActivate: [AuthGuard]},// canActivate: [AuthGuard]
  { path: 'rooms', component: RoomComponent ,canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard]},
  { path: 'campus', component: CampusComponent,canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent,canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryMovement ,canActivate: [AuthGuard] },


];
@NgModule({
    declarations: [
      InventoryMovement,
      UserComponent,
      ReportComponent,
      CampusComponent,
      RoomComponent,
      FooterComponent,
    HomeComponent,
    ArticleComponent,
    LoginComponent,
    AdminComponent,
  ],
  imports: [
    MatListModule,
    ChartsModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatSnackBarModule,
    NgxSpinnerModule,
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
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    })

  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
  bootstrap: [HomeComponent],
  providers: [InventoryMovementService,ReportService,RoomServices,ArticleServices,CampusService,MenuServices,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})

export class AppModule { }
