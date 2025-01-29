import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveDirectorNomineeComponent } from './executive-director-nominee.component';

describe('ExecutiveDirectorNomineeComponent', () => {
  let component: ExecutiveDirectorNomineeComponent;
  let fixture: ComponentFixture<ExecutiveDirectorNomineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveDirectorNomineeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveDirectorNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
