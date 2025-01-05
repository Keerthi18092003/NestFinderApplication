import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewacceptappsownerComponent } from './viewacceptappsowner.component';

describe('ViewacceptappsownerComponent', () => {
  let component: ViewacceptappsownerComponent;
  let fixture: ComponentFixture<ViewacceptappsownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewacceptappsownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewacceptappsownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
