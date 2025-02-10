import { map } from 'rxjs';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css',
})
export class GuestComponent {
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  isLogged = false;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  login() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }

  register() {
    this.usersService
      .signUp(this.registerForm.value)
      .pipe(
        map((data) => {
          if (data) {
            this.loginForm.patchValue({
              username: this.registerForm.get('username')?.value,
              password: this.registerForm.get('password')?.value,
            });
            this.login();
          }
        })
      )
      .subscribe();
  }
}
