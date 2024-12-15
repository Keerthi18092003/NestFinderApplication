import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseagreementComponent } from './leaseagreement.component';

describe('LeaseagreementComponent', () => {
  let component: LeaseagreementComponent;
  let fixture: ComponentFixture<LeaseagreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaseagreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaseagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
