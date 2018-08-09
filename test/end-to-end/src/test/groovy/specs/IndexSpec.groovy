package specs

import geb.spock.GebSpec
import pages.IndexPage
import util.TestUser


class IndexSpec extends GebSpec {
    def "Has home links"() {
        when:
        to IndexPage

        and:
        topBar.logo.click()

        then:
        at IndexPage

        and:
        topBar.title.click()

        then:
        at IndexPage
    }

    def "Register modal"() {
        when:
        to IndexPage

        and:
        topBar.registerButton.click()

        then:
        registerModal.title.isDisplayed()
        registerModal.title.text() == "Register"

        when:
        registerModal.email.text = TestUser.email
        registerModal.phone.text = TestUser.phone
        registerModal.name.text = TestUser.name
        registerModal.address.text = TestUser.address
        registerModal.city.text = TestUser.city
//        registerMOdal.state.text = TestUser.state
        registerModal.zipCode.text = TestUser.zipCode
        registerModal.password.value(TestUser.password)

        then:
        registerModal.email.text == TestUser.email
        registerModal.email.text == TestUser.email
        registerModal.phone.text == TestUser.phone
        registerModal.name.text == TestUser.name
        registerModal.address.text == TestUser.address
        registerModal.city.text == TestUser.city
//        registerMOdal.state.text == TestUser.state
        registerModal.zipCode.text == TestUser.zipCode
        registerModal.password.value() == TestUser.password
    }
}