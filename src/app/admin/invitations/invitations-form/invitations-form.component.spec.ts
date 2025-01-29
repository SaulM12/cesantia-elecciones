import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsFormComponent } from './invitations-form.component';

describe('InvitationsFormComponent', () => {
  let component: InvitationsFormComponent;
  let fixture: ComponentFixture<InvitationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
