import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappsadminComponent } from './viewappsadmin.component';

describe('ViewappsadminComponent', () => {
  let component: ViewappsadminComponent;
  let fixture: ComponentFixture<ViewappsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewappsadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewappsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
