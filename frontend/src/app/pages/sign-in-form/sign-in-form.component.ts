import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  @Output() click = new EventEmitter<boolean>();

  signInForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  signIn() {
    this.authService.signIn(this.signInForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
