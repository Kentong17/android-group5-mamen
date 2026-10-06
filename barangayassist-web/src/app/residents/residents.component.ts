import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss',
})
export class ResidentsComponent {
  private readonly dataService = inject(BarangayDataService);
  residents = this.dataService.getResidents();
  searchTerm = '';
  selectedPurok = 'All';

  get filteredResidents() {
    return this.residents.filter((resident) => {
      const matchesSearch =
        resident.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        resident.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPurok = this.selectedPurok === 'All' || resident.purok === this.selectedPurok;
      return matchesSearch && matchesPurok;
    });
  }

  get purokOptions() {
    return ['All', ...new Set(this.residents.map((resident) => resident.purok))];
  }

  toggleStatus(resident: any): void {
    resident.accountStatus = resident.accountStatus === 'Active' ? 'Inactive' : 'Active';
  }
}
