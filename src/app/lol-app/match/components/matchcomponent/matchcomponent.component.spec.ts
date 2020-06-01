import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchcomponentComponent } from './matchcomponent.component';

describe('MatchcomponentComponent', () => {
  let component: MatchcomponentComponent;
  let fixture: ComponentFixture<MatchcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
