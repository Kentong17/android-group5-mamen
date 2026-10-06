package com.barangayassist.resident.ui.main

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.barangayassist.resident.ui.announcements.AnnouncementDetailScreen
import com.barangayassist.resident.ui.announcements.AnnouncementsScreen
import com.barangayassist.resident.ui.concerns.ConcernDetailScreen
import com.barangayassist.resident.ui.concerns.ConcernsScreen
import com.barangayassist.resident.ui.concerns.ReportConcernScreen
import com.barangayassist.resident.ui.dashboard.DashboardScreen
import com.barangayassist.resident.ui.documents.DocumentDetailScreen
import com.barangayassist.resident.ui.documents.DocumentsScreen
import com.barangayassist.resident.ui.documents.RequestDocumentScreen
import com.barangayassist.resident.ui.notifications.NotificationsScreen
import com.barangayassist.resident.ui.profile.ProfileScreen
import com.barangayassist.resident.ui.settings.SettingsScreen

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    object Home : Screen("home", "Home", Icons.Default.Home)
    object Concerns : Screen("concerns", "Concerns", Icons.Default.Warning)
    object Documents : Screen("documents", "Documents", Icons.Default.Info)
    object Announcements : Screen("announcements", "News", Icons.Default.Notifications)
    object Profile : Screen("profile", "Profile", Icons.Default.Person)
}

@Composable
fun MainScreen(
    onLogout: () -> Unit
) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val items = listOf(
        Screen.Home,
        Screen.Concerns,
        Screen.Documents,
        Screen.Announcements,
        Screen.Profile
    )

    val showBottomNav = currentRoute in items.map { it.route }

    Scaffold(
        bottomBar = {
            if (showBottomNav) {
                NavigationBar {
                    items.forEach { screen ->
                        NavigationBarItem(
                            icon = { Icon(screen.icon, contentDescription = screen.title) },
                            label = { Text(screen.title) },
                            selected = currentRoute == screen.route,
                            onClick = {
                                if (currentRoute != screen.route) {
                                    navController.navigate(screen.route) {
                                        popUpTo(navController.graph.findStartDestination().id) {
                                            saveState = true
                                        }
                                        launchSingleTop = true
                                        restoreState = true
                                    }
                                }
                            }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            NavHost(
                navController = navController,
                startDestination = Screen.Home.route,
                modifier = Modifier.fillMaxSize()
            ) {
                composable(Screen.Home.route) {
                    DashboardScreen(
                        onNavigateToReportConcern = { navController.navigate("report_concern") },
                        onNavigateToRequestDocument = { navController.navigate("request_document") },
                        onNavigateToAnnouncements = { navController.navigate(Screen.Announcements.route) },
                        onNavigateToMyConcerns = { navController.navigate(Screen.Concerns.route) },
                        onNavigateToMyDocuments = { navController.navigate(Screen.Documents.route) },
                        onNavigateToProfile = { navController.navigate(Screen.Profile.route) },
                        onNavigateToNotifications = { navController.navigate("notifications") },
                        onNavigateToAnnouncementDetail = { id -> navController.navigate("announcement_detail/$id") }
                    )
                }
                composable(Screen.Concerns.route) {
                    ConcernsScreen(
                        onNavigateToReport = { navController.navigate("report_concern") },
                        onNavigateToDetail = { id -> navController.navigate("concern_detail/$id") }
                    )
                }
                composable(Screen.Documents.route) {
                    DocumentsScreen(
                        onNavigateToRequest = { navController.navigate("request_document") },
                        onNavigateToDetail = { id -> navController.navigate("document_detail/$id") }
                    )
                }
                composable(Screen.Announcements.route) {
                    AnnouncementsScreen(
                        onNavigateToDetail = { id -> navController.navigate("announcement_detail/$id") }
                    )
                }
                composable(Screen.Profile.route) {
                    ProfileScreen(
                        onNavigateToSettings = { navController.navigate("settings") },
                        onLogout = onLogout
                    )
                }
                composable("report_concern") {
                    ReportConcernScreen(
                        onNavigateBack = { navController.popBackStack() },
                        onSubmitted = { navController.popBackStack() }
                    )
                }
                composable("request_document") {
                    RequestDocumentScreen(
                        onNavigateBack = { navController.popBackStack() },
                        onSubmitted = { navController.popBackStack() }
                    )
                }
                composable("notifications") {
                    NotificationsScreen(
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
                composable("settings") {
                    SettingsScreen(
                        onNavigateBack = { navController.popBackStack() },
                        onLogout = onLogout
                    )
                }
                composable(
                    route = "concern_detail/{concernId}",
                    arguments = listOf(navArgument("concernId") { type = NavType.StringType })
                ) { backStackEntry ->
                    val concernId = backStackEntry.arguments?.getString("concernId") ?: ""
                    ConcernDetailScreen(
                        concernId = concernId,
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
                composable(
                    route = "document_detail/{documentId}",
                    arguments = listOf(navArgument("documentId") { type = NavType.StringType })
                ) { backStackEntry ->
                    val documentId = backStackEntry.arguments?.getString("documentId") ?: ""
                    DocumentDetailScreen(
                        documentId = documentId,
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
                composable(
                    route = "announcement_detail/{announcementId}",
                    arguments = listOf(navArgument("announcementId") { type = NavType.StringType })
                ) { backStackEntry ->
                    val announcementId = backStackEntry.arguments?.getString("announcementId") ?: ""
                    AnnouncementDetailScreen(
                        announcementId = announcementId,
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
            }
        }
    }
}
