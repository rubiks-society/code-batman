import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmarteditorComponent } from './smarteditor.component';

describe('SmarteditorComponent', () => {
  let component: SmarteditorComponent;
  let fixture: ComponentFixture<SmarteditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmarteditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmarteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
