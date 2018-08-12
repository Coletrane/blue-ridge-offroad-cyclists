package specs

import geb.error.RequiredPageContentNotPresent
import geb.spock.GebSpec
import pages.IndexPage
import util.NotificationVariants
import util.TestUser
import util.UserService

class IndexSpec extends GebSpec {
    // Tests
    def "Has home links"() {
        // TODO go to some other arbitrary route
        when:
        to IndexPage
        topBar.logo.click()

        then:
        at IndexPage

        when:
        topBar.title.click()

        then:
        at IndexPage
    }

    def "Register modal should cancel"() {
        when:
        to IndexPage
        topBar.registerButton.click()

        then:
        validateRegisterModal(registerModal)

        when:
        registerModal.cancelButton.click()

        then:
        try {
            registerModal
            false
        } catch (RequiredPageContentNotPresent e) {
            true
        }
    }

    def "Register modal should register a user"() {
        when:
        to IndexPage
        topBar.registerButton.click()

        then:
        validateRegisterModal(registerModal)

        when:
        registerModal.userInfoForm.fillOutUserInfoForm(registerModal.userInfoForm)

        then:
        validateUserInfoForm(registerModal.userInfoForm)

        when:
        // We have to execute javascript here because of the popover's backdrop making
        // submit button not clickable
        js.exec("document.getElementById('login-window-submit').click();")
        // waitFor does not use implicit assertions like the when: and then: blocks
        waitFor { notification.isPresent() == true }

        then:
        notification.isPresent()
        notification.notificationIcon(NotificationVariants.info).isPresent()

    }

    def "Login modal should log user in"() {
        when:
        UserService.verifyTestUserEmail()
        to IndexPage
        topBar.loginButton.click()

        then:
        validateLoginModal(loginModal)

        when:
        loginModal.userInfoForm.email.text = TestUser.email
        loginModal.userInfoForm.password.value(TestUser.password)
        loginModal.submitButton.click()
        waitFor { topBar.profileButton.isPresent() == true }

        then:
        topBar.profileButton.name.text().equalsIgnoreCase(TestUser.name)
        topBar.profileButton.email.text().equalsIgnoreCase(TestUser.email)
    }

    // Spock hooks
    def setupSpec() {
        UserService.deleteTestUser()
        UserService.deleteTestUserEmails()
    }

    def cleanupSpec() {
        UserService.deleteTestUser()
        UserService.deleteTestUserEmails()
    }

    // Helpers
    static def validateRegisterModal(registerModal) {
        registerModal.isDisplayed()
        registerModal.title.isDisplayed()
        registerModal.title.text() == "Register"
    }

    static def validateLoginModal(loginModal) {
        loginModal.isDisplayed()
        loginModal.title.isDisplayed()
        loginModal.title.text() == "Login"
    }

    static def validateUserInfoForm(userInfoForm) {
        userInfoForm.email.text == TestUser.email
        userInfoForm.phone.text == TestUser.phone
        userInfoForm.name.text == TestUser.name
        userInfoForm.address.text == TestUser.address
        userInfoForm.city.text == TestUser.city
        userInfoForm.state.selected == TestUser.state
        userInfoForm.zipCode.text == TestUser.zipCode
        userInfoForm.password.value() == TestUser.password
    }
}