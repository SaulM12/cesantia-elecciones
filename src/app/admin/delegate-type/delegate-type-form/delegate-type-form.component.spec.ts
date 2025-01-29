import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateTypeFormComponent } from './delegate-type-form.component';

describe('DelegateTypeFormComponent', () => {
  let component: DelegateTypeFormComponent;
  let fixture: ComponentFixture<DelegateTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegateTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
