import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantVoteComponent } from './quadrant-vote.component';

describe('QuadrantVoteComponent', () => {
  let component: QuadrantVoteComponent;
  let fixture: ComponentFixture<QuadrantVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadrantVoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadrantVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
