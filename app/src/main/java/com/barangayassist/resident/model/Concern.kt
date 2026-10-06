package com.barangayassist.resident.model

data class Concern(
    val id: String,
    val category: String,
    val title: String,
    val description: String,
    val photoUri: String = "",
    val location: String,
    val dateSubmitted: String,
    val status: String, // Submitted, Under Review, Processing, Resolved, Rejected
    val remarks: String = ""
)
