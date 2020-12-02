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
     * Returns genders
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
     * Returns all hobbies or vacations
     * @param type
     * @returns {Promise<*>}
     */
    async getInterestList(type) {
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
     * Matching Algorithm FYS Project
     * @param userID
     * @param searchQuery
     * @returns {Promise<this | this | this | this | this | this | this | this | this | this | this | this | void>}
     */
    async getMatches(userID, searchQuery) {
        try {

            const userProfile       = await FYSCloud.API.queryDatabase('SELECT * FROM users NATURAL JOIN genders WHERE userID = ?', [userID]);
            const userHobbiesQuery  = await FYSCloud.API.queryDatabase('SELECT description FROM users NATURAL JOIN user_interests NATURAL JOIN interests WHERE userID = ?', [userID]);
            const userVacationQuery = await FYSCloud.API.queryDatabase('SELECT destination FROM users NATURAL JOIN user_vacations NATURAL JOIN vacations WHERE userID = ?', [userID]);

            var userHobbies   = [];
            var userVacations = [];

            for (let i = 0; i < userHobbiesQuery.length; i++) {
                userHobbies.push(userHobbiesQuery[i].description)
            }

            for (let i = 0; i < userVacationQuery.length; i++) {
                userVacations.push(userVacationQuery[i].destination)
            }

            userProfile[0].hobbies   = userHobbies;
            userProfile[0].vacations = userVacations;


            const allProfiles = await FYSCloud.API.queryDatabase('SELECT * FROM users NATURAL JOIN genders WHERE userID != ? AND firstName LIKE ?', [userID,
                                                                                                                                                     searchQuery]);

            // Fills hobbies and vacations in the matches result
            for (let i = 0; i < allProfiles.length; i++) {
                var hobbiesQuery   = await FYSCloud.API.queryDatabase('SELECT description FROM users NATURAL JOIN user_interests NATURAL JOIN interests WHERE userID = ?', [allProfiles[i].userID]);
                var vacationsQuery = await FYSCloud.API.queryDatabase('SELECT destination FROM users NATURAL JOIN user_vacations NATURAL JOIN vacations WHERE userID = ?', [allProfiles[i].userID]);

                var hobbies   = [];
                var vacations = [];

                for (let i = 0; i < hobbiesQuery.length; i++) {
                    hobbies.push(hobbiesQuery[i].description)
                }

                for (let i = 0; i < vacationsQuery.length; i++) {
                    vacations.push(vacationsQuery[i].destination)
                }

                allProfiles[i].hobbies   = hobbies;
                allProfiles[i].vacations = vacations;
            }


            /*
            Scoring of a user relative to logged user

            1 points (10%) : for each hobby that is alike
            1 points (10%) : for each vacation that is alike
            2 points (20%) : If residence is alike
            3 points (30%) : If birth year is within 4 years apart

            caps at 10 points equal to 100%

             */

            for (let i = 0; i < allProfiles.length; i++) {

                let scoring = 0;

                // date check
                var userBirthYear    = new Date(userProfile[0].birthDate);
                var profileBirthYear = new Date(allProfiles[i].birthDate);

                var ageDifMs = profileBirthYear - userBirthYear;
                var ageDate  = new Date(ageDifMs); // miliseconds from epoch
                var ageDif   = Math.abs(ageDate.getUTCFullYear() - 1970);

                if (ageDif <= 4) {
                    scoring += 3;
                }


                // residence check
                var userResidence    = userProfile[0].residence;
                var profileResidence = allProfiles[i].residence;

                if (userResidence === profileResidence) {
                    scoring += 2;
                }


                // hobbies check
                var userHobbies    = userProfile[0].hobbies;
                var profileHobbies = allProfiles[i].hobbies;

                // hobbies comparison
                for (let profileIndex = 0; profileIndex < profileHobbies.length; profileIndex++) {
                    for (let userIndex = 0; userIndex < userHobbies.length; userIndex++) {
                        if (userHobbies[userIndex] === profileHobbies[profileIndex]) {
                            scoring += 1;
                        }
                    }
                }

                // vacations check
                var userVacations    = userProfile[0].vacations;
                var profileVacations = allProfiles[i].vacations;

                for (let profileIndex = 0; profileIndex < profileVacations.length; profileIndex++) {
                    for (let userIndex = 0; userIndex < userVacations.length; userIndex++) {
                        if (userVacations[userIndex] === profileVacations[profileIndex]) {
                            scoring += 1;
                        }
                    }
                }

                allProfiles[i].scoring = scoring
            }

            var sortedProfiles = allProfiles.sort((a, b) => (a.scoring < b.scoring) ? 1 : -1);

            return sortedProfiles;
        } catch
            (e) {
            console.log(e)
        }
    }
}
