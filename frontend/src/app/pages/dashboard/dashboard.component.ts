import { Component } from '@angular/core';
import { NavbarComponent } from '@layout/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
