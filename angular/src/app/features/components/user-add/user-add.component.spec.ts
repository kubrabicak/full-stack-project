import { TestBed } from '@angular/core/testing';
import { UserAddComponent } from './user-add.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../user.model';

describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserAddComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [UserAddComponent, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy }],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog and return newUser when saveUser is called with valid data', () => {
    const validUser: User = { fullName: 'John Doe', displayName: 'John', email: 'john.doe@example.com', details: '' };
    component.newUser = validUser;

    component.saveUser();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(validUser);
  });

  it('should not close the dialog when saveUser is called with incomplete data', () => {
    component.newUser = { fullName: '', displayName: '', email: '', details: '' };

    component.saveUser();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
