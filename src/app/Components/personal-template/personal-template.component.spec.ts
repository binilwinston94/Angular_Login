import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTemplateComponent } from './personal-template.component';

describe('PersonalTemplateComponent', () => {
  let component: PersonalTemplateComponent;
  let fixture: ComponentFixture<PersonalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
