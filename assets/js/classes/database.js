/**
 * Connects to the Cloud Database and offers operations.
 */
class Database {
    constructor(apiUrl, apiKey, dbName, envName) {

        console.log("WORKS?");

        var connection = FYSCloud.API.configure({
            url:         apiUrl,
            apiKey:      apiKey,
            database:    dbName,
            environment: envName
        });

        console.log("WORKS?" + connection);
    }

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


    test() {
        console.log("test");
    }
}
