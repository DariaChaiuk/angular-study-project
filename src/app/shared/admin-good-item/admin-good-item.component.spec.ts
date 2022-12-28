import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodItemComponent } from './admin-good-item.component';

describe('AdminGoodItemComponent', () => {
  let component: AdminGoodItemComponent;
  let fixture: ComponentFixture<AdminGoodItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
