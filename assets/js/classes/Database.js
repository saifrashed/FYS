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
        console.log(FYSCloud.API.queryDatabase("SELECT * FROM interests"));
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

    /**
     * Saif
     *
     * Functionaliteit: Haal geslachten op voor registratie pagina
     */
    async getGenders() {
        try {
            return await FYSCloud.API.queryDatabase("SELECT * FROM genders")
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Saif
     *
     * Functionaliteit: Haalt hobbies of interesses op
     */
    async getInterests(type) {
        try {
            switch (type) {
                case "hobbies":
                    return await FYSCloud.API.queryDatabase("SELECT * FROM interests");
                case "vacations":
                    return await FYSCloud.API.queryDatabase("SELECT * FROM vacations");
                default:
                    return false;
            }
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Callum
     *
     * Functionality:
     */


    /**
     * Yusuf
     *
     * Functionality: Profiel aanpassen
     */


    /**
     * Lars
     *
     * Functionality:
     */

    /**
     * Thor
     *
     * Functionality:
     */

}
