package com.barangayassist.resident.model

data class NotificationItem(
    val id: String,
    val title: String,
    val message: String,
    val dateTime: String,
    var isRead: Boolean = false
)
