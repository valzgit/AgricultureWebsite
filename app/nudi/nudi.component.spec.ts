import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NudiComponent } from './nudi.component';

describe('NudiComponent', () => {
  let component: NudiComponent;
  let fixture: ComponentFixture<NudiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NudiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
