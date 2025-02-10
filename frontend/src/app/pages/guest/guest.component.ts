import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInFormComponent } from '@components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '@components/sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [ReactiveFormsModule, SignInFormComponent, SignUpFormComponent],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css',
})
export class GuestComponent {
  isSignInFormActive = false;
}
