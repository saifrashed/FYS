/**
 * Connects to the Cloud Database and offers operations.
 */
class Api {
    constructor(apiUrl, apiKey, dbName, envName) {
        var connection = FYSCloud.API.configure({
            url:         apiUrl,
            apiKey:      apiKey,
            database:    dbName,
            environment: envName
        });

        console.log("Api class loaded: " + connection);
    }

    /**
     * Sends a mail through FYS cloud
     * @param subject
     * @param nameAddress
     * @param emailAddress
     */
    sendMail(subject, nameAddress, emailAddress) {
        FYSCloud.API.sendEmail({
            from:    {
                name:    "Group",
                address: "group@fys.cloud"
            },
            to:      [
                {
                    name:    nameAddress,
                    address: emailAddress
                }
            ],
            subject: subject,
            html:    "<h1>Hello Lennard!</h1><p>This is an email :)</p>"
        }).done(function (data) {
            console.log(data);
        }).fail(function (reason) {
            console.log(reason);
        });
    }


}
