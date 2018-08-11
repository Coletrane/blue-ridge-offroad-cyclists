package util

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder
import com.amazonaws.services.cognitoidp.model.AdminDeleteUserRequest
import com.amazonaws.services.cognitoidp.model.AdminDeleteUserResult
import com.amazonaws.services.cognitoidp.model.UserNotFoundException
import io.github.cdimascio.dotenv.Dotenv
import org.apache.http.HttpRequest
import org.apache.http.HttpResponse
import org.apache.http.client.methods.HttpDelete
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.HttpClientBuilder
import org.openqa.selenium.remote.http.HttpMethod

@Singleton
class UserService {
    static final dotenv = Dotenv
            .configure()
            .directory("../../")
            .load()

    static final COGNITO_POOL_ID = dotenv.get("COGNITO_POOL_ID")
    static final COGNITO_CLIENT_ID = dotenv.get("COGNITO_END_TO_END_CLIENT_ID")
    static final AWS_ACCESS_KEY_ID = dotenv.get("AWS_ACCESS_KEY_ID")
    static final AWS_SECRET_KEY = dotenv.get("AWS_SECRET_KEY")

    static identityProvider = new AWSCognitoIdentityProviderClientBuilder()
            .standard()
            .withCredentials(
            new AWSStaticCredentialsProvider(
                    new BasicAWSCredentials(
                            AWS_ACCESS_KEY_ID,
                            AWS_SECRET_KEY
                    )
            ))
            .withRegion(Regions.US_EAST_1)
            .build()


    static def deleteTestUser() {
        try {
            AdminDeleteUserResult res = identityProvider.adminDeleteUser(
                    new AdminDeleteUserRequest()
                            .withUserPoolId(COGNITO_POOL_ID)
                            .withUsername(TestUser.email)
            )
            println(res)
        } catch (UserNotFoundException e) {
            println("User not found")
        }
    }

    static final restmailUrl = "${Constants.RESTMAIL}/${Constants.RESTMAIL_MAIL}/${TestUser.restmailUsername}"

    static def deleteTestUserEmails() {
        new HttpClientBuilder()
                .create()
                .build()
                .execute(new HttpDelete(restmailUrl))
    }

    static def verifyTestUserEmail() {
        def res = new HttpClientBuilder()
                .create()
                .build()
                .execute(new HttpGet(restmailUrl))

        if (res.getStatusLine().getStatusCode() == 200) {
            def reader = new BufferedReader(
                    new InputStreamReader(res.getEntity().getContent())
            )
        }
    }
}
