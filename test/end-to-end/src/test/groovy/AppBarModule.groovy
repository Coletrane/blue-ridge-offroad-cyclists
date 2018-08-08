import geb.Module
import static Constants.*

class TopBarModule extends Module {
    static content = {
        logo {$("#$PREFIX-logo")}
        title {$("$PREFIX-title")}
        login {$("#login")}
        signUp {$("#sign-up")}
    }
}
