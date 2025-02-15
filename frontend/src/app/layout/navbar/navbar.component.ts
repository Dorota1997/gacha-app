import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  signOut() {
    this.authService.signOut().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
