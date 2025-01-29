import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateHomeComponent } from './delegate-home.component';

describe('DelegateHomeComponent', () => {
  let component: DelegateHomeComponent;
  let fixture: ComponentFixture<DelegateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegateHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
