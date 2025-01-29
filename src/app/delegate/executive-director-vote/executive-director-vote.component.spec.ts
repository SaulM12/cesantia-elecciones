import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveDirectorVoteComponent } from './executive-director-vote.component';

describe('ExecutiveDirectorVoteComponent', () => {
  let component: ExecutiveDirectorVoteComponent;
  let fixture: ComponentFixture<ExecutiveDirectorVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveDirectorVoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveDirectorVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
