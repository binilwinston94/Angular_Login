import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalReactiveComponent } from './personal-reactive.component';

describe('PersonalReactiveComponent', () => {
  let component: PersonalReactiveComponent;
  let fixture: ComponentFixture<PersonalReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
