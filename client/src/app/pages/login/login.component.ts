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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule,
  ],
})
export class LoginComponent {
  hide = true;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage = '';
  _authService = inject(AuthService);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);

  getErrorUsernameMess() {
    if (this.form.get('username')?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getErrorPasswordMess() {
    if (this.form.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  login() {
    if (
      this.form.valid &&
      this.form.value.username &&
      this.form.value.password
    ) {
      this._authService
        .login({
          username: this.form.value.username,
          password: this.form.value.password,
        })
        .subscribe({
          next: (res) => {
            this._authService.saveUser(res);
            this._router.navigate(['']);
            this._snackBar.open('Login successfully!', 'Close', {
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
