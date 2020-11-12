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
     * Getter for gender table
     * @returns {Promise<*>}
     */
    async getGenders() {
        try {
            return await FYSCloud.API.queryDatabase("SELECT * FROM genders")
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Sends a mail to destination
     * @param subject
     * @param nameAddress
     * @param emailAddress
     * @returns {Promise<*>}
     */
    async sendMail(subject, nameAddress, emailAddress) {
        try {
            return FYSCloud.API.sendEmail({
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
        } catch (e) {
            console.log(e);
        }
    }
}
