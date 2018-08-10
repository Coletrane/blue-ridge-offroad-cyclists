package modules

import geb.Module
import static util.Constants.*

class NotificationModule extends Module {
    static base = {$("#notification-snackbar")}
    static content = {
        notificationContent {$("#notification-content")}
    }
}
