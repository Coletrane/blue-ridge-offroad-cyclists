package modules

import geb.Module
import util.NotificationVariants

class NotificationModule extends Module {
    static base = { $("#notification-snackbar") }
    static content = {
        notificationContent { $("#notification-content") }
        notificationIcon { NotificationVariants variant ->
            return $("#notification-${variant.name()}-icon")
        }
        closeButton { $("#notification-close-button") }
    }
}
