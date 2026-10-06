import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private readonly dataService = inject(BarangayDataService);
  users = this.dataService.getUsers();

  toggleStatus(user: any): void {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
  }
}
