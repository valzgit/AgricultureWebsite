import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaroviComponent } from './barovi.component';

describe('BaroviComponent', () => {
  let component: BaroviComponent;
  let fixture: ComponentFixture<BaroviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaroviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaroviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
