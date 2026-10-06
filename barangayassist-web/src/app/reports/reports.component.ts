import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  private readonly dataService = inject(BarangayDataService);
  residents = this.dataService.getResidents();
  concerns = this.dataService.getConcerns();
  requests = this.dataService.getDocumentRequests();
  announcements = this.dataService.getAnnouncements();

  get concernSummary() {
    return {
      total: this.concerns.length,
      submitted: this.concerns.filter((item) => item.status === 'Submitted').length,
      underReview: this.concerns.filter((item) => item.status === 'Under Review').length,
      processing: this.concerns.filter((item) => item.status === 'Processing').length,
      resolved: this.concerns.filter((item) => item.status === 'Resolved').length,
      rejected: this.concerns.filter((item) => item.status === 'Rejected').length,
    };
  }

  get requestSummary() {
    return {
      total: this.requests.length,
      pending: this.requests.filter((item) => item.status === 'Pending').length,
      processing: this.requests.filter((item) => item.status === 'Processing').length,
      ready: this.requests.filter((item) => item.status === 'Ready for Pickup').length,
      completed: this.requests.filter((item) => item.status === 'Completed').length,
      rejected: this.requests.filter((item) => item.status === 'Rejected').length,
    };
  }

  get announcementSummary() {
    return {
      total: this.announcements.length,
      published: this.announcements.filter((item) => item.status === 'Published').length,
      drafts: this.announcements.filter((item) => item.status === 'Draft').length,
    };
  }
}
