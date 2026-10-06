package com.barangayassist.resident.model

data class Resident(
    val residentId: String,
    val fullName: String,
    val address: String,
    val purok: String,
    val contactNumber: String,
    val email: String,
    val profilePictureUrl: String = ""
)
