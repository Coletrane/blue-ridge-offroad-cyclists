package pages

import geb.Page
import modules.LoginModalModule
import modules.NotificationModule
import modules.RegisterModalModule
import modules.TopBarModule

class IndexPage extends Page {
    static at = { title == "Roanoke International Mountain Biking Association" }
    static content = {
        topBar { module(TopBarModule) }
        registerModal { module(RegisterModalModule) }
        loginModal { module(LoginModalModule) }
        notification { module(NotificationModule) }
    }
}

