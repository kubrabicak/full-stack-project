import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUpdateComponent } from './user-update.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mocked data for the test
const mockUser = {
  id: 1,
  fullName: 'John Doe',
  displayName: 'John',
  email: 'john@example.com',
  details: 'Some user details',
};

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<UserUpdateComponent>>;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        UserUpdateComponent,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockUser },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the provided user data', () => {
    expect(component.user).toEqual(mockUser);
  });

  it('should call onNoClick and close the dialog', () => {
    component.onNoClick();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should call saveChanges and close the dialog with the updated user', () => {
    // Modify the user data
    component.user.fullName = 'Jane Doe';
    component.saveChanges();
    expect(dialogRefMock.close).toHaveBeenCalledWith(component.user);
  });
});
