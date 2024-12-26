import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { GetusersComponent } from '../../getusers/getusers.component';
import { SuspendedusersComponent } from '../../suspendedusers/suspendedusers.component';
import { ViewlistingadminComponent } from '../../viewlistingadmin/viewlistingadmin.component';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild('dynamiComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;

  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void { }

  loadComponent(section: string) {
    this.dynamicComponentContainer.clear();
    if (section === 'view') {
      this.viewUsers();
    }
    else if (section === 'suspend') {
      this.suspendAccount();
    }
    else if (section === 'view_prop') {
      this.viewProperties();
    }
  }

  viewUsers(): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(GetusersComponent);
    this.dynamicComponentContainer.createComponent(componentFactory);
  }

  // Other methods remain the same
  suspendAccount():void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(SuspendedusersComponent);
    // Clear previous components if needed
    this.dynamicComponentContainer.createComponent(componentFactory);
  }


  // Handles viewing all property listings
  viewProperties(): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(ViewlistingadminComponent);
    // Clear previous components if needed
    this.dynamicComponentContainer.createComponent(componentFactory); 
    

  }
  // Handles tracking rental applications
  trackApplications() {
    console.log('Opening applications...');
  }

  // Opens the help desk for user support
  openHelpDesk() {
    console.log('Opening help desk...');

  }

  // Handles sending a message to users
  sendMessage() {
    console.log('Sending a message...');

  }
}
