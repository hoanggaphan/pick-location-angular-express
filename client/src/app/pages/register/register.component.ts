import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import AuthService from '../../services/auth.service';
import matchPassword from '../../shared/matchPassword.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule,
    MatSelectModule,
  ],
})
export class RegisterComponent {
  hideP = true;
  hideCP = true;
  form = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16),
        Validators.pattern(
          /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/
        ),
      ]),
      confirm_password: new FormControl('', [Validators.required]),
      role: new FormControl('user', [Validators.required]),
    },
    [matchPassword('password', 'confirm_password')]
  );
  errorMessage = '';
  _authService = inject(AuthService);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);

  getErrorUsernameMess() {
    if (this.form.get('username')?.hasError('required')) {
      return 'You must enter a value';
    }

    if (
      this.form.get('username')?.hasError('minlength') ||
      this.form.get('username')?.hasError('maxlength')
    ) {
      return 'Limited to 3-16 characters';
    }

    if (this.form.get('username')?.hasError('pattern')) {
      return 'Do not contain special characters';
    }

    return '';
  }

  getErrorPasswordMess() {
    if (this.form.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.get('password')?.hasError('minlength')) {
      return 'Has at least 6 characters';
    }

    if (this.form.get('password')?.hasError('pattern')) {
      return 'Include uppercase letters, numbers and special characters';
    }

    return '';
  }

  getErrorCPasswordMess() {
    if (this.form.get('confirm_password')?.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form.get('confirm_password')?.hasError('passwordMissmatch')) {
      return 'Passwords do not match';
    }

    return '';
  }

  register() {
    if (
      this.form.valid &&
      this.form.value.username &&
      this.form.value.password &&
      this.form.value.confirm_password &&
      this.form.value.role
    ) {
      this._authService
        .register({
          username: this.form.value.username,
          password: this.form.value.password,
          confirm_password: this.form.value.confirm_password,
          role: this.form.value.role,
        })
        .subscribe({
          next: (res) => {
            this._router.navigate(['/login']);
            this._snackBar.open('register successfully!', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 5000,
              panelClass: 'alert-type-fill-success',
            });
          },
          error: (error) => {
            this.errorMessage = error.error.message;
          },
        });
    }
  }
}
