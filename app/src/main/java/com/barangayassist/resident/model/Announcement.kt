package com.barangayassist.resident.model

data class Announcement(
    val id: String,
    val title: String,
    val shortDescription: String,
    val fullDescription: String,
    val date: String,
    val time: String,
    val location: String,
    val category: String, // Meeting, Clean-up Drive, Vaccination, Event, Emergency, Distribution, Other
    val imageUrl: String = ""
)
