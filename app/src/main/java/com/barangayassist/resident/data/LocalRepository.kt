package com.barangayassist.resident.data

import com.barangayassist.resident.model.Announcement
import com.barangayassist.resident.model.Concern
import com.barangayassist.resident.model.DocumentRequest
import com.barangayassist.resident.model.NotificationItem
import com.barangayassist.resident.model.Resident
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

object LocalRepository {
    private val _currentResident = MutableStateFlow(
        Resident(
            residentId = "BRGY-2026-0892",
            fullName = "Juan Dela Cruz",
            address = "123 Mabini St., Purok 3",
            purok = "Purok 3",
            contactNumber = "+63 912 345 6789",
            email = "juandelacruz@gmail.com"
        )
    )
    val currentResident: StateFlow<Resident> = _currentResident.asStateFlow()

    private val _concerns = MutableStateFlow(
        mutableListOf(
            Concern(
                id = "C-001",
                category = "Road Damage",
                title = "Damaged road near the barangay hall",
                description = "Deep potholes causing traffic slowdown and hazard for motorcycles during rain.",
                location = "Purok 3",
                dateSubmitted = "September 30, 2026",
                status = "Processing",
                remarks = "The concern is currently being processed by the Barangay Engineering Committee."
            ),
            Concern(
                id = "C-002",
                category = "Garbage",
                title = "Uncollected garbage along street corner",
                description = "Garbage piled up for 3 days without collection schedule.",
                location = "Purok 3",
                dateSubmitted = "September 25, 2026",
                status = "Resolved",
                remarks = "Garbage collected and area cleaned by maintenance team."
            ),
            Concern(
                id = "C-003",
                category = "Streetlight",
                title = "Non-working streetlight",
                description = "Bulb burned out creating a dark spot at night near acacia tree.",
                location = "Purok 2",
                dateSubmitted = "September 28, 2026",
                status = "Under Review",
                remarks = "Report noted for inspection."
            )
        )
    )
    val concerns: StateFlow<List<Concern>> = _concerns.asStateFlow()

    private val _documentRequests = MutableStateFlow(
        mutableListOf(
            DocumentRequest(
                id = "D-001",
                documentType = "Barangay Clearance",
                purpose = "Employment",
                additionalInfo = "Needed for local company application",
                dateRequested = "September 30, 2026",
                status = "Processing",
                remarks = "Your request is currently being processed and verified."
            ),
            DocumentRequest(
                id = "D-002",
                documentType = "Certificate of Residency",
                purpose = "Bank Account Opening",
                additionalInfo = "Proof of billing attached",
                dateRequested = "September 20, 2026",
                status = "Completed",
                remarks = "Document signed and ready/claimed."
            )
        )
    )
    val documentRequests: StateFlow<List<DocumentRequest>> = _documentRequests.asStateFlow()

    private val _announcements = MutableStateFlow(
        listOf(
            Announcement(
                id = "A-001",
                title = "Monthly Barangay Assembly Meeting",
                shortDescription = "Discussing upcoming community projects and security updates.",
                fullDescription = "All residents of Barangay Kauswagan are cordially invited to attend the monthly barangay assembly. Topics include Purok security enhancements, waste management updates, and financial transparency report.",
                date = "October 5, 2026",
                time = "4:00 PM - 6:00 PM",
                location = "Barangay Covered Court",
                category = "Meeting"
            ),
            Announcement(
                id = "A-002",
                title = "Community Clean-up Drive",
                shortDescription = "Let's keep our puroks clean and dengue-free!",
                fullDescription = "Join our synchronized barangay-wide clean-up drive. Please bring brooms, trash bags, and cleaning tools. Free refreshments will be provided after the activity.",
                date = "October 8, 2026",
                time = "6:00 AM - 9:00 AM",
                location = "All Puroks (Assembly at Brgy Hall)",
                category = "Clean-up Drive"
            ),
            Announcement(
                id = "A-003",
                title = "Free Anti-Rabies Vaccination for Pets",
                shortDescription = "Protect your pets and family members.",
                fullDescription = "Free vaccination for dogs and cats aged 3 months and above. Please bring leash and secure your pets.",
                date = "October 12, 2026",
                time = "8:00 AM - 12:00 PM",
                location = "Barangay Health Center",
                category = "Vaccination"
            ),
            Announcement(
                id = "A-004",
                title = "Emergency Preparedness Seminar",
                shortDescription = "Typhoon and flood preparedness briefing.",
                fullDescription = "Learn essential safety protocols, evacuation routes, and emergency contact numbers during severe weather conditions.",
                date = "October 15, 2026",
                time = "2:00 PM - 4:00 PM",
                location = "Barangay Multi-Purpose Hall",
                category = "Emergency"
            )
        )
    )
    val announcements: StateFlow<List<Announcement>> = _announcements.asStateFlow()

    private val _notifications = MutableStateFlow(
        mutableListOf(
            NotificationItem(
                id = "N-001",
                title = "Concern Status Update",
                message = "Your road damage report is now being processed.",
                dateTime = "Sep 30, 2026 - 10:30 AM",
                isRead = false
            ),
            NotificationItem(
                id = "N-002",
                title = "Document Request Approved",
                message = "Your Barangay Clearance request has been approved and is being prepared.",
                dateTime = "Sep 30, 2026 - 9:15 AM",
                isRead = false
            ),
            NotificationItem(
                id = "N-003",
                title = "New Announcement",
                message = "A new barangay assembly meeting has been posted for October 5.",
                dateTime = "Sep 29, 2026 - 4:00 PM",
                isRead = true
            ),
            NotificationItem(
                id = "N-004",
                title = "Emergency Advisory",
                message = "Emergency announcement from Barangay Kauswagan regarding weather advisory.",
                dateTime = "Sep 28, 2026 - 8:00 AM",
                isRead = true
            )
        )
    )
    val notifications: StateFlow<List<NotificationItem>> = _notifications.asStateFlow()

    fun addConcern(concern: Concern) {
        val list = _concerns.value.toMutableList()
        list.add(0, concern)
        _concerns.value = list

        // Add notification
        val notifList = _notifications.value.toMutableList()
        notifList.add(
            0,
            NotificationItem(
                id = "N-${System.currentTimeMillis()}",
                title = "Concern Submitted",
                message = "Your concern '${concern.title}' was submitted successfully.",
                dateTime = "Just now",
                isRead = false
            )
        )
        _notifications.value = notifList
    }

    fun addDocumentRequest(request: DocumentRequest) {
        val list = _documentRequests.value.toMutableList()
        list.add(0, request)
        _documentRequests.value = list

        // Add notification
        val notifList = _notifications.value.toMutableList()
        notifList.add(
            0,
            NotificationItem(
                id = "N-${System.currentTimeMillis()}",
                title = "Document Request Submitted",
                message = "Your request for ${request.documentType} was submitted successfully.",
                dateTime = "Just now",
                isRead = false
            )
        )
        _notifications.value = notifList
    }

    fun updateResident(resident: Resident) {
        _currentResident.value = resident
    }

    fun markNotificationAsRead(id: String) {
        _notifications.value = _notifications.value.map {
            if (it.id == id) it.copy(isRead = true) else it
        }.toMutableList()
    }
}
