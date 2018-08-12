package modules

import geb.Module
import geb.module.EmailInput
import geb.module.Select
import geb.module.TextInput
import util.TestUser

class UserInfoForm extends Module {
    static content = {
        email { $("#email").module(EmailInput) }
        phone { $("#phone").module(TextInput) }
        name { $("#name").module(TextInput) }
        address { $("#address").module(TextInput) }
        city { $("#city").module(TextInput) }
        state { $("#state").module(Select) }
        zipCode { $("#zipCode").module(TextInput) }
        password { $("#password") }   // Apparently there's no module for input type="password"
    }

    static def fillOutUserInfoForm(userInfoForm) {
        userInfoForm.email.text = TestUser.email
        userInfoForm.phone.text = TestUser.phone
        userInfoForm.name.text = TestUser.name
        userInfoForm.address.text = TestUser.address
        userInfoForm.city.text = TestUser.city
        userInfoForm.state.selected = TestUser.state
        userInfoForm.zipCode.text = TestUser.zipCode
        userInfoForm.password.value(TestUser.password)
    }
}
