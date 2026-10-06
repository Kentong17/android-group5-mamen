import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-concerns',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './concerns.component.html',
  styleUrl: './concerns.component.scss',
})
export class ConcernsComponent {
  private readonly dataService = inject(BarangayDataService);
  concerns = this.dataService.getConcerns();
  searchTerm = '';
  selectedCategory = 'All';
  selectedPurok = 'All';
  selectedStatus = 'All';

  get filteredConcerns() {
    return this.concerns.filter((concern) => {
      const matchesSearch = concern.residentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        concern.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || concern.category === this.selectedCategory;
      const matchesPurok = this.selectedPurok === 'All' || concern.purok === this.selectedPurok;
      const matchesStatus = this.selectedStatus === 'All' || concern.status === this.selectedStatus;
      return matchesSearch && matchesCategory && matchesPurok && matchesStatus;
    });
  }

  get categoryOptions() {
    return ['All', ...new Set(this.concerns.map((concern) => concern.category))];
  }

  get purokOptions() {
    return ['All', ...new Set(this.concerns.map((concern) => concern.purok))];
  }

  get statusOptions() {
    return ['All', ...new Set(this.concerns.map((concern) => concern.status))];
  }
}
