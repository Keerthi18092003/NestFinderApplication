import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerComponent } from './owner/owner.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { LeaseagreementComponent } from './leaseagreement/leaseagreement.component';
import { GetusersComponent } from './getusers/getusers.component';
import { SuspendedusersComponent } from './suspendedusers/suspendedusers.component';
import { ViewlistingadminComponent } from './viewlistingadmin/viewlistingadmin.component';
import { TenantComponent } from './tenant/tenant.component';
import { ApplicationsubmitComponent } from './applicationsubmit/applicationsubmit.component';
import { ViewappsubmissionComponent } from './viewappsubmission/viewappsubmission.component';
import { OwnerLayoutComponent } from './layout/owner-layout/owner-layout.component';
import { TenantLayoutComponent } from './layout/tenant-layout/tenant-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    OwnerComponent,
    ViewListingComponent,
    LeaseagreementComponent,
    GetusersComponent,
    SuspendedusersComponent,
    ViewlistingadminComponent,
    TenantComponent,
    ApplicationsubmitComponent,
    ViewappsubmissionComponent,
    OwnerLayoutComponent,
    TenantLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
