import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsExecutiveDirectorComponent } from './elections-executive-director.component';

describe('ElectionsExecutiveDirectorComponent', () => {
  let component: ElectionsExecutiveDirectorComponent;
  let fixture: ComponentFixture<ElectionsExecutiveDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionsExecutiveDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionsExecutiveDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
