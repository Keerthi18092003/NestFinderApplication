import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerComponent } from './Owner-Module/owner/owner.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './Admin-Module/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AddListingComponent } from './Owner-Module/add-listing/add-listing.component';
import { ViewListingComponent } from './Owner-Module/view-listing/view-listing.component';
import { GetusersComponent } from './Admin-Module/getusers/getusers.component';
import { SuspendedusersComponent } from './Admin-Module/suspendedusers/suspendedusers.component';
import { ViewlistingadminComponent } from './Admin-Module/viewlistingadmin/viewlistingadmin.component';
import { TenantComponent } from './Tenant-Module/tenant/tenant.component';
import { ApplicationsubmitComponent } from './Tenant-Module/applicationsubmit/applicationsubmit.component';
import { ViewappsubmissionComponent } from './Owner-Module/viewappsubmission/viewappsubmission.component';
import { OwnerLayoutComponent } from './layout/owner-layout/owner-layout.component';
import { TenantLayoutComponent } from './layout/tenant-layout/tenant-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ApplicationstatusComponent } from './Tenant-Module/applicationstatus/applicationstatus.component';
import { AcceptedapplicationsComponent } from './Tenant-Module/acceptedapplications/acceptedapplications.component';
import { ViewpendingappsownerComponent } from './Owner-Module/viewpendingappsowner/viewpendingappsowner.component';
import { ViewacceptappsownerComponent } from './Owner-Module/viewacceptappsowner/viewacceptappsowner.component';
import { ViewappsadminComponent } from './Admin-Module/viewappsadmin/viewappsadmin.component';
import { LocatesuggestComponent } from './Tenant-Module/locatesuggest/locatesuggest.component';
import { ViewappointmentsComponent } from './Owner-Module/viewappointments/viewappointments.component';
import { ViewappointmentstenantComponent } from './Tenant-Module/viewappointmentstenant/viewappointmentstenant.component';

//import { NgxPageScrollModule } from 'ngx-page-scroll';




@NgModule({
  declarations: [
   
    AppComponent,
    AdminComponent,
    HomeComponent,
    OwnerComponent,
    ViewListingComponent,
    GetusersComponent,
    SuspendedusersComponent,
    ViewlistingadminComponent,
    TenantComponent,
    ApplicationsubmitComponent,
    ViewappsubmissionComponent,
    OwnerLayoutComponent,
    TenantLayoutComponent,
    AdminLayoutComponent,
    ApplicationstatusComponent,
    AcceptedapplicationsComponent,
    ViewpendingappsownerComponent,
    ViewacceptappsownerComponent,
    ViewappsadminComponent,
    LocatesuggestComponent,
    ViewappointmentsComponent,
    ViewappointmentstenantComponent,
   
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
