import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  private readonly dataService = inject(BarangayDataService);
  requests = this.dataService.getDocumentRequests();
  searchTerm = '';
  selectedType = 'All';
  selectedStatus = 'All';

  get filteredRequests() {
    return this.requests.filter((request) => {
      const matchesSearch = request.residentName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType === 'All' || request.documentType === this.selectedType;
      const matchesStatus = this.selectedStatus === 'All' || request.status === this.selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }

  get typeOptions() {
    return ['All', ...new Set(this.requests.map((request) => request.documentType))];
  }

  get statusOptions() {
    return ['All', ...new Set(this.requests.map((request) => request.status))];
  }
}
