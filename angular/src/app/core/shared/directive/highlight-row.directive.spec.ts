import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HighlightRowDirective } from './highlight-row.directive';

@Component({
  template: `<div [appHighlightRow]="condition" highlightClass="custom-class">Test Row</div>`,
})
class TestComponent {
  condition = false;
}

describe('HighlightRowDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HighlightRowDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should not add the class if condition is false', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList.contains('custom-class')).toBeFalse();
  });

  it('should add the class if condition is true', () => {
    const component = fixture.componentInstance;
    const element = fixture.nativeElement.querySelector('div');

    component.condition = true;
    fixture.detectChanges();

    expect(element.classList.contains('custom-class')).toBeTrue();
  });

  it('should remove the class when condition changes from true to false', () => {
    const component = fixture.componentInstance;
    const element = fixture.nativeElement.querySelector('div');

    component.condition = true;
    fixture.detectChanges();
    expect(element.classList.contains('custom-class')).toBeTrue();

    component.condition = false;
    fixture.detectChanges();
    expect(element.classList.contains('custom-class')).toBeFalse();
  });
});
