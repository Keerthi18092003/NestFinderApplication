import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedusersComponent } from './suspendedusers.component';

describe('SuspendedusersComponent', () => {
  let component: SuspendedusersComponent;
  let fixture: ComponentFixture<SuspendedusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspendedusersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
