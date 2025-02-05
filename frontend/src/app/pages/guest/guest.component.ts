import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '@services/auth.service';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HeaderComponent,
    CardModule,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css',
})
export class GuestComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
