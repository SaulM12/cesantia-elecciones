import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsMenuComponent } from './elections-menu.component';

describe('ElectionsMenuComponent', () => {
  let component: ElectionsMenuComponent;
  let fixture: ComponentFixture<ElectionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
