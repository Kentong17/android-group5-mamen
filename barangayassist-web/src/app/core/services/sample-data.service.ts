import { Injectable } from '@angular/core';
import {
  Announcement,
  CommunityConcern,
  DashboardMetric,
  DocumentRequest,
  NotificationItem,
  PersonnelUser,
  Purok,
  Resident,
  UserRole,
} from '../models/barangay.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;
  private currentPassword = 'admin123';
  private currentUser = {
    name: 'Admin User',
    email: 'admin@barangayassist.local',
    role: 'ADMINISTRATOR' as UserRole,
  };

  login(email: string, password: string): boolean {
    if (email === 'admin@barangayassist.local' && password === this.currentPassword) {
      this.loggedIn = true;
      return true;
    }
    this.loggedIn = false;
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  changePassword(currentPassword: string, newPassword: string): boolean {
    if (!this.loggedIn || currentPassword !== this.currentPassword || newPassword.length < 6) {
      return false;
    }

    this.currentPassword = newPassword;
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class BarangayDataService {
  readonly puroks: Purok[] = [
    { id: 'PU-01', name: 'Purok 1', residents: 58, description: 'Northside residential cluster' },
    { id: 'PU-02', name: 'Purok 2', residents: 62, description: 'Central community zone' },
    { id: 'PU-03', name: 'Purok 3', residents: 71, description: 'Barangay hall and market access' },
    { id: 'PU-04', name: 'Purok 4', residents: 59, description: 'Riverside extension area' },
  ];

  readonly residents: Resident[] = [
    { id: 'BR-20250001', fullName: 'Juan Dela Cruz', address: 'Blk 2 Lot 7, Purok 1', purok: 'Purok 1', contactNumber: '09171234567', email: 'juan.delacruz@email.com', accountStatus: 'Active', registrationDate: '2025-01-15' },
    { id: 'BR-20250002', fullName: 'Maria Santos', address: 'Blk 4 Lot 9, Purok 2', purok: 'Purok 2', contactNumber: '09223344556', email: 'maria.santos@email.com', accountStatus: 'Active', registrationDate: '2025-01-20' },
    { id: 'BR-20250003', fullName: 'Pedro Reyes', address: 'Blk 8 Lot 12, Purok 3', purok: 'Purok 3', contactNumber: '09334455667', email: 'pedro.reyes@email.com', accountStatus: 'Inactive', registrationDate: '2025-02-05' },
    { id: 'BR-20250004', fullName: 'Ana Ramos', address: 'Blk 1 Lot 10, Purok 1', purok: 'Purok 1', contactNumber: '09445566778', email: 'ana.ramos@email.com', accountStatus: 'Active', registrationDate: '2025-02-12' },
    { id: 'BR-20250005', fullName: 'Lito Navarro', address: 'Blk 9 Lot 5, Purok 4', purok: 'Purok 4', contactNumber: '09556677889', email: 'lito.navarro@email.com', accountStatus: 'Active', registrationDate: '2025-03-02' },
    { id: 'BR-20250006', fullName: 'Carmen Lopez', address: 'Blk 5 Lot 14, Purok 2', purok: 'Purok 2', contactNumber: '09667788990', email: 'carmen.lopez@email.com', accountStatus: 'Active', registrationDate: '2025-03-05' },
    { id: 'BR-20250007', fullName: 'Ramon Garcia', address: 'Blk 6 Lot 3, Purok 3', purok: 'Purok 3', contactNumber: '09778899001', email: 'ramon.garcia@email.com', accountStatus: 'Active', registrationDate: '2025-03-11' },
    { id: 'BR-20250008', fullName: 'Rosalinda Cruz', address: 'Blk 7 Lot 17, Purok 4', purok: 'Purok 4', contactNumber: '09889900112', email: 'rosalinda.cruz@email.com', accountStatus: 'Inactive', registrationDate: '2025-04-03' },
  ];

  readonly concerns: CommunityConcern[] = [
    {
      id: 'CN-2026001',
      residentName: 'Juan Dela Cruz',
      purok: 'Purok 3',
      category: 'Road Damage',
      status: 'Processing',
      dateSubmitted: '2026-09-30',
      description: 'Damaged road near the barangay hall.',
      location: 'Brgy. Hall Road, Purok 3',
      photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
      remarks: 'Road inspection is currently being conducted.'
    },
    {
      id: 'CN-2026002',
      residentName: 'Maria Santos',
      purok: 'Purok 2',
      category: 'Garbage',
      status: 'Submitted',
      dateSubmitted: '2026-10-01',
      description: 'Illegal dumping near the creek.',
      location: 'Creekside Road, Purok 2',
      photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
      remarks: 'Awaiting scheduling for cleanup.'
    },
    {
      id: 'CN-2026003',
      residentName: 'Ana Ramos',
      purok: 'Purok 1',
      category: 'Streetlight',
      status: 'Under Review',
      dateSubmitted: '2026-10-02',
      description: 'Streetlight on the corner is not functioning.',
      location: 'Purok 1 Main Corner',
      photo: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
      remarks: 'Electrical team has been notified.'
    },
    {
      id: 'CN-2026004',
      residentName: 'Lito Navarro',
      purok: 'Purok 4',
      category: 'Flooding',
      status: 'Resolved',
      dateSubmitted: '2026-09-25',
      description: 'Flood accumulation near the drainage canal.',
      location: 'Canal Road, Purok 4',
      photo: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
      remarks: 'Drainage was cleared and flood subsided.'
    },
    {
      id: 'CN-2026005',
      residentName: 'Ramon Garcia',
      purok: 'Purok 3',
      category: 'Water Problem',
      status: 'Rejected',
      dateSubmitted: '2026-09-18',
      description: 'Report of low water pressure in the block.',
      location: 'Blk 6, Purok 3',
      photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
      remarks: 'Issue already under maintenance performed by utility provider.'
    },
  ];

  readonly documentRequests: DocumentRequest[] = [
    {
      id: 'DR-2026001',
      residentName: 'Juan Dela Cruz',
      residentId: 'BR-20250001',
      purok: 'Purok 1',
      documentType: 'Barangay Clearance',
      purpose: 'Employment requirement',
      dateRequested: '2026-10-02',
      status: 'Pending',
      remarks: 'Awaiting document review.'
    },
    {
      id: 'DR-2026002',
      residentName: 'Carmen Lopez',
      residentId: 'BR-20250006',
      purok: 'Purok 2',
      documentType: 'Certificate of Residency',
      purpose: 'School enrollment',
      dateRequested: '2026-10-01',
      status: 'Processing',
      remarks: 'Validation of residency records in progress.'
    },
    {
      id: 'DR-2026003',
      residentName: 'Pedro Reyes',
      residentId: 'BR-20250003',
      purok: 'Purok 3',
      documentType: 'Certificate of Indigency',
      purpose: 'Medical assistance application',
      dateRequested: '2026-09-28',
      status: 'Ready for Pickup',
      remarks: 'Approved and ready for pickup.'
    },
    {
      id: 'DR-2026004',
      residentName: 'Rosalinda Cruz',
      residentId: 'BR-20250008',
      purok: 'Purok 4',
      documentType: 'Barangay Certification',
      purpose: 'Local permit requirement',
      dateRequested: '2026-09-24',
      status: 'Completed',
      remarks: 'Completed and released.'
    },
    {
      id: 'DR-2026005',
      residentName: 'Maria Santos',
      residentId: 'BR-20250002',
      purok: 'Purok 2',
      documentType: 'Other Documents',
      purpose: 'Bank account verification',
      dateRequested: '2026-09-21',
      status: 'Rejected',
      remarks: 'Incomplete supporting document submitted.'
    },
  ];

  readonly announcements: Announcement[] = [
    {
      id: 'AN-001',
      title: 'Community Clean-Up Drive',
      description: 'Barangay-wide cleanup activity for all puroks this Saturday morning.',
      date: '2026-10-07',
      time: '08:00 AM',
      location: 'Barangay Plaza',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
      status: 'Published',
    },
    {
      id: 'AN-002',
      title: 'Barangay Health Check',
      description: 'Free health screening and vaccination updates for residents.',
      date: '2026-10-12',
      time: '09:30 AM',
      location: 'Multi-Purpose Hall',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      status: 'Draft',
    },
    {
      id: 'AN-003',
      title: 'Water Supply Advisory',
      description: 'Scheduled maintenance for the water line in Purok 4 on Thursday.',
      date: '2026-10-09',
      time: '07:00 AM',
      location: 'Purok 4',
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=900&q=80',
      status: 'Unpublished',
    },
  ];

  readonly users: PersonnelUser[] = [
    { id: 'USR-001', name: 'Maria Dela Rosa', email: 'maria@barangayassist.local', role: 'ADMINISTRATOR', status: 'Active', dateCreated: '2025-01-02' },
    { id: 'USR-002', name: 'Rico Santos', email: 'rico@barangayassist.local', role: 'BARANGAY OFFICIAL', status: 'Active', dateCreated: '2025-02-03' },
    { id: 'USR-003', name: 'Elena Cruz', email: 'elena@barangayassist.local', role: 'BARANGAY STAFF', status: 'Active', dateCreated: '2025-03-12' },
    { id: 'USR-004', name: 'Arthur Reyes', email: 'arthur@barangayassist.local', role: 'BARANGAY STAFF', status: 'Inactive', dateCreated: '2025-04-04' },
  ];

  readonly dashboardMetrics: DashboardMetric[] = [
    { label: 'Total Registered Residents', value: 250, detail: '+12 this month', tone: 'primary' },
    { label: 'Pending Concerns', value: 35, detail: '5 critical', tone: 'warning' },
    { label: 'Processing Concerns', value: 12, detail: '3 urgent', tone: 'info' },
    { label: 'Resolved Concerns', value: 40, detail: '92% closure rate', tone: 'success' },
    { label: 'Pending Document Requests', value: 20, detail: '6 expedited', tone: 'warning' },
    { label: 'Completed Document Requests', value: 35, detail: '8 this week', tone: 'success' },
    { label: 'Total Announcements', value: 14, detail: '6 published', tone: 'primary' },
    { label: 'Emergency Reports', value: 8, detail: '2 active', tone: 'danger' },
  ];

  readonly notifications: NotificationItem[] = [
    { id: 'NT-001', title: 'Road damage reported in Purok 3', time: '12 minutes ago', detail: 'Inspection team assigned.', read: false },
    { id: 'NT-002', title: 'Barangay clearance ready for pickup', time: '1 hour ago', detail: '2 residents notified.', read: false },
    { id: 'NT-003', title: 'Community clean-up announcement posted', time: '3 hours ago', detail: 'Published to residents.', read: false },
    { id: 'NT-004', title: 'New resident registration approved', time: 'Today', detail: '4 new profiles added.', read: false },
  ];

  private readonly notificationStorageKey = 'barangayassist.notifications.v1';

  constructor() {
    this.restoreNotificationState();
  }

  getResidents() {
    return this.residents;
  }

  getPuroks() {
    return this.puroks;
  }

  getConcerns() {
    return this.concerns;
  }

  getDocumentRequests() {
    return this.documentRequests;
  }

  getAnnouncements() {
    return this.announcements;
  }

  getUsers() {
    return this.users;
  }

  getDashboardMetrics() {
    return this.dashboardMetrics;
  }

  getNotifications() {
    return this.notifications;
  }

  getUnreadNotificationCount(): number {
    return this.notifications.filter((notification) => !notification.read).length;
  }

  markNotificationRead(id: string): void {
    const notification = this.notifications.find((item) => item.id === id);
    if (notification) {
      notification.read = true;
      this.saveNotificationState();
    }
  }

  markAllNotificationsRead(): void {
    this.notifications.forEach((notification) => (notification.read = true));
    this.saveNotificationState();
  }

  dismissNotification(id: string): void {
    const index = this.notifications.findIndex((notification) => notification.id === id);
    if (index >= 0) {
      this.notifications.splice(index, 1);
      this.saveNotificationState();
    }
  }

  private restoreNotificationState(): void {
    try {
      const stored = localStorage.getItem(this.notificationStorageKey);
      if (!stored) {
        return;
      }

      const state = JSON.parse(stored) as { readIds?: string[]; dismissedIds?: string[] };
      const readIds = new Set(state.readIds ?? []);
      const dismissedIds = new Set(state.dismissedIds ?? []);
      for (let index = this.notifications.length - 1; index >= 0; index -= 1) {
        const notification = this.notifications[index];
        if (dismissedIds.has(notification.id)) {
          this.notifications.splice(index, 1);
        } else {
          notification.read = readIds.has(notification.id);
        }
      }
    } catch {
      return;
    }
  }

  private saveNotificationState(): void {
    try {
      localStorage.setItem(
        this.notificationStorageKey,
        JSON.stringify({
          readIds: this.notifications.filter((item) => item.read).map((item) => item.id),
          dismissedIds: ['NT-001', 'NT-002', 'NT-003', 'NT-004'].filter(
            (id) => !this.notifications.some((item) => item.id === id),
          ),
        }),
      );
    } catch {
      // Keep notification actions active for this session when storage is unavailable.
    }
  }
}
