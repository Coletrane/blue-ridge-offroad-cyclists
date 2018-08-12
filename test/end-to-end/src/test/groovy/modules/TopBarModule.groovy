package modules

import geb.Module

class TopBarModule extends Module {
    static content = {
        logo { $("#broc-logo") }
        title { $("#broc-title") }
        loginButton { $("#login-button") }
        registerButton { $("#register-button") }
        profileButton { module(ProfileButtonModule) }
        logoutButton { $("#logout-button") }
    }
}
