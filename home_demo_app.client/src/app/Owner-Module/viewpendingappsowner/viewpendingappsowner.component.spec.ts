import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpendingappsownerComponent } from './viewpendingappsowner.component';

describe('ViewpendingappsownerComponent', () => {
  let component: ViewpendingappsownerComponent;
  let fixture: ComponentFixture<ViewpendingappsownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewpendingappsownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpendingappsownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
