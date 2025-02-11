import { Router } from '@angular/router';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  private usersService = inject(UsersService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  @Output() click = new EventEmitter<boolean>();

  signUpForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  signUp() {
    this.usersService.signUp(this.signUpForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
