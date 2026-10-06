import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/sample-data.service';
import { BarangayDataService } from '../core/services/sample-data.service';
import { PortalPreferencesService } from '../core/services/portal-preferences.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly dataService = inject(BarangayDataService);
  private readonly preferencesService = inject(PortalPreferencesService);
  preferences = this.preferencesService.preferences;
  sidebarCollapsed = false;
  showNotifications = false;
  showProfileMenu = false;
  showSignOutConfirmation = false;
  user = this.auth.getCurrentUser();

  navItems = [
    { label: 'Dashboard', route: '/dashboard', icon: '▣' },
    { label: 'Residents', route: '/residents', icon: '👥' },
    { label: 'Puroks', route: '/puroks', icon: '📍' },
    { label: 'Concerns', route: '/concerns', icon: '⚠️' },
    { label: 'Documents', route: '/documents', icon: '📄' },
    { label: 'Announcements', route: '/announcements', icon: '📣' },
    { label: 'Reports', route: '/reports', icon: '📊' },
    { label: 'Authorized Users', route: '/users', icon: '🧑‍💼' },
    { label: 'Profile', route: '/profile', icon: '👤' },
    { label: 'Settings', route: '/settings', icon: '⚙️' },
  ];

  constructor(
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  get notifications() {
    return this.dataService.getNotifications();
  }

  get unreadNotificationCount(): number {
    return this.dataService.getUnreadNotificationCount();
  }

  toggleNotifications(): void {
    if (this.preferences().notifications.inApp) {
      this.showNotifications = !this.showNotifications;
    }
  }

  markNotificationRead(id: string): void {
    this.dataService.markNotificationRead(id);
  }

  markAllNotificationsRead(): void {
    this.dataService.markAllNotificationsRead();
  }

  dismissNotification(id: string): void {
    this.dataService.dismissNotification(id);
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  requestSignOut(): void {
    this.showProfileMenu = false;
    this.showSignOutConfirmation = true;
  }

  cancelSignOut(): void {
    this.showSignOutConfirmation = false;
  }

  confirmSignOut(): void {
    this.showSignOutConfirmation = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
