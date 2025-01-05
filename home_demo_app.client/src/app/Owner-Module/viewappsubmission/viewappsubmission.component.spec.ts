import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappsubmissionComponent } from './viewappsubmission.component';

describe('ViewappsubmissionComponent', () => {
  let component: ViewappsubmissionComponent;
  let fixture: ComponentFixture<ViewappsubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewappsubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewappsubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
