import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsubmitComponent } from './applicationsubmit.component';

describe('ApplicationsubmitComponent', () => {
  let component: ApplicationsubmitComponent;
  let fixture: ComponentFixture<ApplicationsubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
