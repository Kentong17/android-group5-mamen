package com.barangayassist.resident.model

data class DocumentRequest(
    val id: String,
    val documentType: String,
    val purpose: String,
    val additionalInfo: String = "",
    val dateRequested: String,
    val status: String, // Pending, Processing, Ready for Pickup, Completed, Rejected
    val remarks: String = ""
)
