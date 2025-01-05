import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappointmentstenantComponent } from './viewappointmentstenant.component';

describe('ViewappointmentstenantComponent', () => {
  let component: ViewappointmentstenantComponent;
  let fixture: ComponentFixture<ViewappointmentstenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewappointmentstenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewappointmentstenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
