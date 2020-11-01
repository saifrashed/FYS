/**
 * Connects to the Cloud Database and offers operations.
 */
class Database {
    constructor(apiUrl, apiKey, dbName, envName) {
        var connection = FYSCloud.API.configure({
            url:         apiUrl,
            apiKey:      apiKey,
            database:    dbName,
            environment: envName
        });

        console.log("Database class loaded: " + connection);
    }

    /**
     * Sends a mail through FYS cloud
     * @param subject
     * @param nameAddress
     * @param emailAddress
     */
    async sendMail(subject, nameAddress, emailAddress) {
        try {
           let sendMail = FYSCloud.API.sendEmail({
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
            });

           console.log("Mail sent");
        } catch (e) {
            console.log(e);
        }
    }


}
