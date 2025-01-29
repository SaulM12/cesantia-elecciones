import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantFormComponent } from './quadrant-form.component';

describe('QuadrantFormComponent', () => {
  let component: QuadrantFormComponent;
  let fixture: ComponentFixture<QuadrantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadrantFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadrantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
