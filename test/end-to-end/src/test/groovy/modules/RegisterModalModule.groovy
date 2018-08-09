package modules

import geb.Module
import geb.module.EmailInput
import geb.module.Select
import geb.module.TextInput

class RegisterModalModule extends Module {
    static content = {
        title {$("#login-dialog-title")}
        email {$("#email").module(EmailInput)}
        phone {$("#phone").module(TextInput)}
        name {$("#name").module(TextInput)}
        address {$("#address").module(TextInput)}
        city {$("#city").module(TextInput)}
        state {$("#state").module(Select)}
        zipCode {$("#zipCode").module(TextInput)}
        password {$("#password")}   // Apparently there's no module for PasswordInput
    }
}
