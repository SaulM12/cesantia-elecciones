import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateTypeComponent } from './delegate-type.component';

describe('DelegateTypeComponent', () => {
  let component: DelegateTypeComponent;
  let fixture: ComponentFixture<DelegateTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegateTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
