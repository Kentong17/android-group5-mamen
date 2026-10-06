import { Injectable, signal } from '@angular/core';

export type DefaultLandingPage = 'dashboard' | 'residents' | 'concerns';

export interface PortalPreferences {
  defaultLandingPage: DefaultLandingPage;
  compactLayout: boolean;
  notifications: {
    inApp: boolean;
    emailUpdates: boolean;
    dailyDigest: boolean;
  };
}

const DEFAULT_PREFERENCES: PortalPreferences = {
  defaultLandingPage: 'dashboard',
  compactLayout: false,
  notifications: {
    inApp: true,
    emailUpdates: false,
    dailyDigest: false,
  },
};

@Injectable({ providedIn: 'root' })
export class PortalPreferencesService {
  private readonly storageKey = 'barangayassist.preferences.v1';
  readonly preferences = signal(this.loadPreferences());

  save(preferences: PortalPreferences): void {
    const saved = structuredClone(preferences);
    this.preferences.set(saved);

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(saved));
    } catch {
      // Keep the preferences active for this session when storage is unavailable.
    }
  }

  reset(): void {
    this.save(DEFAULT_PREFERENCES);
  }

  private loadPreferences(): PortalPreferences {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        return structuredClone(DEFAULT_PREFERENCES);
      }

      const parsed = JSON.parse(stored) as Partial<PortalPreferences>;
      return {
        ...DEFAULT_PREFERENCES,
        ...parsed,
        notifications: {
          ...DEFAULT_PREFERENCES.notifications,
          ...parsed.notifications,
        },
      };
    } catch {
      return structuredClone(DEFAULT_PREFERENCES);
    }
  }
}