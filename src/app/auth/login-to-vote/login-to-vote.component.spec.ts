import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToVoteComponent } from './login-to-vote.component';

describe('LoginToVoteComponent', () => {
  let component: LoginToVoteComponent;
  let fixture: ComponentFixture<LoginToVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginToVoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginToVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
