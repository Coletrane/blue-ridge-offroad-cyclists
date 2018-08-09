package specs

import geb.spock.GebSpec
import pages.IndexPage

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
//        when:
//        to IndexPage

    }
}