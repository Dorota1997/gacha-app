import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
