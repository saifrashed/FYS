/**
 * Connects to the Cloud Database and offers user operations.
 */
class User {
    constructor() {
        this.userID = localStorage.getItem('FYSAuthId');

        console.log("User class loaded: true");
    }


    /**
     * Logs user in
     * @param body
     * @returns {Promise<void>}
     */
    async login(body) {
        console.log(body.userEmail + " " + body.userPassword);

        try {
            const loggedUser = await FYSCloud.API.queryDatabase(
                "SELECT * FROM users WHERE email = ? AND password = ?",
                [body.userEmail.toLowerCase(), body.userPassword]);

            console.log(loggedUser);

            if (loggedUser[0]) {
                localStorage.setItem('FYSAuthId', loggedUser[0].userID);
                window.location.reload();
            } else {
                return false
            }

        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Logs user out
     */
    async logout() {
        localStorage.removeItem("FYSAuthId");
        window.location.reload();
    }

    /**
     * Registers user
     * @param body
     * @returns {Promise<void>}
     */
    async register(body) {
        try {
            const registerdUser = await FYSCloud.API.queryDatabase(
                "INSERT INTO users (firstName, lastName, email, residence, tel, password, birthDate, genderID) VALUES(?,?,?,?,?,?,?,?)",
                [body.userFirstName.toLowerCase(), body.userLastName.toLowerCase(), body.userEmail.toLowerCase(),
                    body.userResidence.toLowerCase(),
                    body.userPhone, body.userPassword,
                    body.userBirthDate, body.userGender]);


            // saves user in browser
            localStorage.setItem('FYSAuthId', registerdUser.insertId);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Authenicates User id and redirects user to right page
     * @returns {Promise<void>}
     */
    async authenticateUser(userID) {
        try {
            const savedUser = await FYSCloud.API.queryDatabase(
                "SELECT COUNT(*) AS amountUsers FROM users WHERE userID = ?",
                [userID]);

            const path = window.location.pathname;
            const page = path.split("/").pop();
            const userPageRoutes = [
                "profileOverview.html",
                "profileDetail.html",
                "userEdit.html",
                "userFriends.html",
                "userProfile.html",
                "notifications.html",
                "addMessage.html",
            ];

            if (savedUser[0].amountUsers) {
                // redirect logged users to homepage
                if (!userPageRoutes.includes(page)) {
                    window.location.href = "./profileOverview.html";
                }
            } else {
                // redirect non-logged users to homepage
                if (userPageRoutes.includes(page)) {
                    window.location.href = "./index.html";
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Gets user informatie
     *
     * @param userID
     * @returns {Promise<*>}
     */
    async getUserData(userID) {
        try {
            return await FYSCloud.API.queryDatabase(
                "SELECT * FROM users WHERE userID = ?",
                [userID]);
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Updates user information
     * @param userID
     * @param body
     * @returns {Promise<void>}
     */
    async updateUserData(userID, body) {
        try {
            return await FYSCloud.API.queryDatabase(
                "UPDATE users SET firstName=?, lastName=?, email=?, tel=?, residence=? WHERE userID = ?",
                [body.userFirstName, body.userLastName, body.userEmail, body.userPhone, body.userResidence, userID]);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Updates user image
     * @param userID
     * @returns {Promise<void>}
     */
    async updateUserImage(userID) {

    }

    /**
     * Adds a message to user profile.
     * @returns {Promise<void>}
     */
    async addMessage() {
        console.log("add message loaded")
    }

    /**
     * retrieves interests to user profile
     * @param type
     * @param typeID
     * @param userID
     * @returns {Promise<void>}
     */
    async getInterest(type, userID) {
        try {
            switch (type) {
                case "hobbies":
                    return await FYSCloud.API.queryDatabase("SELECT interestID, description FROM users NATURAL JOIN user_interests NATURAL JOIN interests WHERE userID=?", [userID]);
                case "vacations":
                    return await FYSCloud.API.queryDatabase("SELECT vacationID, destination, description, url FROM users NATURAL JOIN user_vacations NATURAL JOIN vacations WHERE userID=?", [userID]);
                default:
                    return false;
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Adds interests to user profile
     * @param type
     * @param typeID
     * @param userID
     * @returns {Promise<void>}
     */
    async addInterest(type, typeID, userID) {
        try {
            switch (type) {
                case "hobbies":
                    return await FYSCloud.API.queryDatabase("INSERT INTO user_interests VALUES (? ,?)",
                        [userID, typeID]);
                case "vacations":
                    return await FYSCloud.API.queryDatabase("INSERT INTO user_vacations VALUES (? ,?)",
                        [userID, typeID]);
                default:
                    return false;
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Deletes interests from a user profile
     * @param type
     * @param typeID
     * @param userID
     * @returns {Promise<void>}
     */
    async deleteInterest(type, typeID, userID) {
        console.log("delete interest loaded")
    }


}
