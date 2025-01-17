import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let mockData: any;

  beforeEach(async () => {
    // Set up mock data for the test
    mockData = {
      id: 1,
      fullName: 'John Doe',
      displayName: 'John',
      email: 'john@example.com',
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule,
        UserDetailsComponent,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data from MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual(mockData);
  });
});
