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
            const registeredUser = await FYSCloud.API.queryDatabase(
                "INSERT INTO users (firstName, lastName, email, residence, tel, password, birthDate, genderID) VALUES(?,?,?,?,?,?,?,?)",
                [body.userFirstName.toLowerCase(), body.userLastName.toLowerCase(), body.userEmail.toLowerCase(),
                 body.userResidence.toLowerCase(),
                 body.userPhone, body.userPassword,
                 body.userBirthDate, body.userGender]);


            // saves user in browser
            localStorage.setItem('FYSAuthId', registeredUser.insertId);
            return registeredUser.insertId;
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

            const path           = window.location.pathname;
            const page           = path.split("/").pop();
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
        try {
            // delete existing file
            var hasProfileImage = await FYSCloud.API.fileExists(userID + ".png");

            // checks if there is a profile image for this profile and deletes it
            if (hasProfileImage) {
                var deletedFile = await FYSCloud.API.deleteFile(userID + ".png");
            }

            var file = await FYSCloud.Utils.getDataUrl($("#userUpdateImageFile"));
            return await FYSCloud.API.uploadFile(userID + ".png", file.url);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Updates user bio
     * @param userID
     * @param content
     * @returns {Promise<*>}
     */
    async updateBio(userID, content) {
        try {
            return await FYSCloud.API.queryDatabase(
                "UPDATE users SET bio=? WHERE userID = ?",
                [content, userID]);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Adds a post to user profile.
     * @returns {Promise<void>}
     */
    async addPost() {
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
        try {
            switch (type) {
                case "hobbies":
                    return await FYSCloud.API.queryDatabase("DELETE FROM user_interests WHERE userID= ? AND typeID = ?", [userID,
                                                                                                                          typeID]
                    );
                case "vacations":
                    return await FYSCloud.API.queryDatabase("DELETE FROM user_vacations WHERE userID= ? AND typeID = ?", [userID,
                                                                                                                          typeID]
                    );
                default:
                    return false;
            }
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Returns a random userID for the "I'm feeling lucky button"
     * @returns {Promise<*>}
     */
    async getRandomUser() {
        try {
            return await FYSCloud.API.queryDatabase("SELECT userID FROM users ORDER BY RAND() LIMIT 1");
        } catch (e) {
            console.log(e);
        }
    }

}
