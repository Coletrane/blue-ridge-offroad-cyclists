import geb.Page
import geb.spock.GebSpec

class IndexPage extends Page {
    static at = {title == "Roanoke International Mountain Biking Association"}
    static content = {
        appBar {module(TopBarModule)}
    }
}

class IndexSpec extends GebSpec {
    def "Has home links"() {
        when:
        to IndexPage

        and:
        appBar.logo.click()

        then:
        at IndexPage
    }
}
