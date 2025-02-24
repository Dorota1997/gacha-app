import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { IStatus } from '@interfaces/status.interface';
import { StatusResolverService } from '@services/status-resolver.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private statusService = inject(StatusResolverService);
  private destroy$ = new Subject<void>();
  userName = signal<string>('');

  ngOnInit(): void {
    this.statusService.userStatus$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (status: IStatus) => {
        this.userName.set(status.username);
      },
    });
  }

  signOut(): void {
    this.authService.signOut().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
