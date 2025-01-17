import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent); // Create component instance
    component = fixture.componentInstance;
    fixture.detectChanges(); // change detection
  });

  it('should create the app', () => {
    expect(component).toBeTruthy(); // Check component is created successfully
  });

  it('should have as title "user-management-frontend"', () => {
    expect(component.title).toEqual('user-management-frontend');
  });

  it('should render title in h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('User Management System');
  });
});
