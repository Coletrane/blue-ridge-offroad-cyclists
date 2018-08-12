package modules

import geb.Module

class RegisterModalModule extends Module {
    static base = { $("#login-window") }
    static content = {
        title { $("#login-dialog-title") }
        userInfoForm { module(UserInfoForm) }
        cancelButton { $("#login-window-cancel") }
        submitButton { $("#login-window-submit") }
    }
}

class LoginModalModule extends RegisterModalModule {
    static content = {
        forgotPasswordButton { $("#forgot-password-button") }
    }
}