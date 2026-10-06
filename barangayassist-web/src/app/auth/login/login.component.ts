import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/sample-data.service';
import { PortalPreferencesService } from '../../core/services/portal-preferences.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly preferences = inject(PortalPreferencesService);

  form = this.fb.nonNullable.group({
    email: ['admin@barangayassist.local', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });

  showPassword = false;
  submitted = false;
  errorMessage = '';

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }

    const { email, password } = this.form.getRawValue();
    const success = this.auth.login(email, password);

    if (!success) {
      this.errorMessage = 'Invalid email or password. Please use the sample admin credentials.';
      return;
    }

    this.router.navigate([`/${this.preferences.preferences().defaultLandingPage}`]);
  }
}
