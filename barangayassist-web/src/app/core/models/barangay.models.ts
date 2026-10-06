export type ResidentStatus = 'Active' | 'Inactive';
export type ConcernCategory = 'Garbage' | 'Streetlight' | 'Flooding' | 'Road Damage' | 'Water Problem' | 'Noise Complaint' | 'Stray Animals' | 'Other';
export type ConcernStatus = 'Submitted' | 'Under Review' | 'Processing' | 'Resolved' | 'Rejected';
export type DocumentType = 'Barangay Clearance' | 'Certificate of Residency' | 'Certificate of Indigency' | 'Barangay Certification' | 'Other Documents';
export type DocumentStatus = 'Pending' | 'Processing' | 'Ready for Pickup' | 'Completed' | 'Rejected';
export type AnnouncementStatus = 'Draft' | 'Published' | 'Unpublished';
export type UserRole = 'ADMINISTRATOR' | 'BARANGAY OFFICIAL' | 'BARANGAY STAFF';

export interface Resident {
  id: string;
  fullName: string;
  address: string;
  purok: string;
  contactNumber: string;
  email: string;
  accountStatus: ResidentStatus;
  registrationDate: string;
}

export interface Purok {
  id: string;
  name: string;
  residents: number;
  description: string;
}

export interface CommunityConcern {
  id: string;
  residentName: string;
  purok: string;
  category: ConcernCategory;
  status: ConcernStatus;
  dateSubmitted: string;
  description: string;
  location: string;
  photo: string;
  remarks: string;
}

export interface DocumentRequest {
  id: string;
  residentName: string;
  residentId: string;
  purok: string;
  documentType: DocumentType;
  purpose: string;
  dateRequested: string;
  status: DocumentStatus;
  remarks: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: AnnouncementStatus;
}

export interface PersonnelUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  dateCreated: string;
}

export interface DashboardMetric {
  label: string;
  value: number;
  detail: string;
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  detail: string;
  read: boolean;
}
