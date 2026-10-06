import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/sample-data.service';
import { PortalPreferences, PortalPreferencesService } from '../core/services/portal-preferences.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private readonly preferencesService = inject(PortalPreferencesService);
  private readonly auth = inject(AuthService);

  preferences: PortalPreferences = structuredClone(this.preferencesService.preferences());
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  preferenceMessage = '';
  passwordMessage = '';
  passwordError = '';

  savePreferences(): void {
    this.preferencesService.save(this.preferences);
    this.preferenceMessage = 'Preferences saved on this device.';
  }

  resetPreferences(): void {
    this.preferencesService.reset();
    this.preferences = structuredClone(this.preferencesService.preferences());
    this.preferenceMessage = 'Preferences restored to defaults.';
  }

  changePassword(): void {
    this.passwordMessage = '';
    this.passwordError = '';

    if (this.newPassword.length < 6) {
      this.passwordError = 'Use at least 6 characters for the new password.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'The new password and confirmation do not match.';
      return;
    }
    if (!this.auth.changePassword(this.currentPassword, this.newPassword)) {
      this.passwordError = 'Current password is incorrect.';
      return;
    }

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordMessage = 'Password changed for this session.';
  }

}
