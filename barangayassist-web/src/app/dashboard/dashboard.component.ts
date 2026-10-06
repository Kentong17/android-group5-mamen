import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly dataService = inject(BarangayDataService);
  metrics = this.dataService.getDashboardMetrics();
  recentActivity = this.dataService.getNotifications();
  puroks = this.dataService.getPuroks();

  getToneClass(tone: string): string {
    return `metric-card ${tone}`;
  }
}
