import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarangayDataService } from '../core/services/sample-data.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
})
export class AnnouncementsComponent {
  private readonly dataService = inject(BarangayDataService);
  announcements = this.dataService.getAnnouncements();
  showForm = false;
  editingId: string | null = null;
  form = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    status: 'Draft' as 'Draft' | 'Published' | 'Unpublished',
  };

  openCreateForm(): void {
    this.editingId = null;
    this.form = {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
      status: 'Draft',
    };
    this.showForm = true;
  }

  openEditForm(announcement: any): void {
    this.editingId = announcement.id;
    this.form = { ...announcement };
    this.showForm = true;
  }

  saveAnnouncement(): void {
    if (!this.form.title.trim()) {
      return;
    }

    if (this.editingId) {
      const index = this.announcements.findIndex((item) => item.id === this.editingId);
      if (index >= 0) {
        this.announcements[index] = { ...this.announcements[index], ...this.form };
      }
    } else {
      this.announcements.unshift({
        id: `AN-${String(this.announcements.length + 1).padStart(3, '0')}`,
        ...this.form,
      });
    }

    this.showForm = false;
    this.editingId = null;
  }

  publishAnnouncement(id: string): void {
    const item = this.announcements.find((announcement) => announcement.id === id);
    if (item) {
      item.status = 'Published';
    }
  }

  unpublishAnnouncement(id: string): void {
    const item = this.announcements.find((announcement) => announcement.id === id);
    if (item) {
      item.status = 'Unpublished';
    }
  }

  deleteAnnouncement(id: string): void {
    this.announcements = this.announcements.filter((announcement) => announcement.id !== id);
  }
}
