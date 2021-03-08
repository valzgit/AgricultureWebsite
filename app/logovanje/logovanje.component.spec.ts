import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogovanjeComponent } from './logovanje.component';

describe('LogovanjeComponent', () => {
  let component: LogovanjeComponent;
  let fixture: ComponentFixture<LogovanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogovanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogovanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
