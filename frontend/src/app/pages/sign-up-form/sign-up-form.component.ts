import { concatMap } from 'rxjs';
import { Router } from '@angular/router';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { ISignUp } from '@interfaces/sign-up.interface';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  @Output() navigateToForm = new EventEmitter<boolean>();

  signUpForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  signUp() {
    const { confirmPassword, ...signInPayload }: ISignUp =
      this.signUpForm.value;

    this.usersService
      .signUp({ ...signInPayload, confirmPassword })
      .pipe(concatMap(() => this.authService.signIn(signInPayload)))
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
      });
  }
}
