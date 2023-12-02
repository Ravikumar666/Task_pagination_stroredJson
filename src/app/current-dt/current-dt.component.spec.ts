import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDTComponent } from './current-dt.component';

describe('CurrentDTComponent', () => {
  let component: CurrentDTComponent;
  let fixture: ComponentFixture<CurrentDTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentDTComponent]
    });
    fixture = TestBed.createComponent(CurrentDTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
