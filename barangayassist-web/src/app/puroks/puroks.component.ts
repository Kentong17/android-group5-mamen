import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-puroks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './puroks.component.html',
  styleUrl: './puroks.component.scss',
})
export class PuroksComponent {
  private readonly dataService = inject(BarangayDataService);
  puroks = this.dataService.getPuroks();
  newPurok = { name: '', description: '' };
  showForm = false;

  savePurok(): void {
    if (!this.newPurok.name.trim()) {
      return;
    }

    this.puroks.unshift({
      id: `PU-${String(this.puroks.length + 1).padStart(2, '0')}`,
      name: this.newPurok.name,
      residents: 0,
      description: this.newPurok.description || 'New purok added by personnel',
    });

    this.newPurok = { name: '', description: '' };
    this.showForm = false;
  }
}
