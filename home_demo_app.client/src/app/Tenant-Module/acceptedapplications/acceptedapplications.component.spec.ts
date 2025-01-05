import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedapplicationsComponent } from './acceptedapplications.component';

describe('AcceptedapplicationsComponent', () => {
  let component: AcceptedapplicationsComponent;
  let fixture: ComponentFixture<AcceptedapplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptedapplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
