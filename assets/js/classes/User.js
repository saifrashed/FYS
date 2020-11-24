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
                "INSERT INTO users (firstName, lastName, email, tel, password, birthDate, genderID) VALUES(?,?,?,?,?,?,?)",
                [body.userFirstName.toLowerCase(), body.userLastName.toLowerCase(), body.userEmail.toLowerCase(),
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


}
