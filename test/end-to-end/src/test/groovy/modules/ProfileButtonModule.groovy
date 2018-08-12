package modules

import geb.Module

class ProfileButtonModule extends Module {
    static base = { $("#profile-button") }
    static content = {
        name { $("#profile-button-name") }
        email { $("#profile-button-email") }
    }
}
