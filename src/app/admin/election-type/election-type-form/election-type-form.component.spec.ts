import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionTypeFormComponent } from './election-type-form.component';

describe('ElectionTypeFormComponent', () => {
  let component: ElectionTypeFormComponent;
  let fixture: ComponentFixture<ElectionTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
