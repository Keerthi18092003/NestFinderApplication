import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistingadminComponent } from './viewlistingadmin.component';

describe('ViewlistingadminComponent', () => {
  let component: ViewlistingadminComponent;
  let fixture: ComponentFixture<ViewlistingadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewlistingadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewlistingadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
