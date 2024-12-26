import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatesuggestComponent } from './locatesuggest.component';

describe('LocatesuggestComponent', () => {
  let component: LocatesuggestComponent;
  let fixture: ComponentFixture<LocatesuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocatesuggestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocatesuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
