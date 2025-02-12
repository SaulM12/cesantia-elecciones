import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateFormComponent } from './delegate-form.component';

describe('DelegateFormComponent', () => {
  let component: DelegateFormComponent;
  let fixture: ComponentFixture<DelegateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
