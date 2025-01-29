import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveDirectorNomineeFormComponent } from './executive-director-nominee-form.component';

describe('ExecutiveDirectorNomineeFormComponent', () => {
  let component: ExecutiveDirectorNomineeFormComponent;
  let fixture: ComponentFixture<ExecutiveDirectorNomineeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveDirectorNomineeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveDirectorNomineeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
