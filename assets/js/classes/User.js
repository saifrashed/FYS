/**
 * Connects to the Cloud Database and offers user operations.
 */
class User {
    constructor() {
        console.log("User class loaded: true");
    }


    async login(body) {
        console.log(body.userEmail + " " + body.userPassword)
    }

    async register(body) {

    }
}
