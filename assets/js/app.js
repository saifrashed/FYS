$(document).ready(function () {

    /*
     * Declaration of variables
     */
    var database = null;
    var user = null;
    var translation = null;
    var notification = null;
    var genders = null;
    var userData = null;
    var hobbiesList = null;
    var vacationList = null;
    var matchData = null;
    var notifications = null;
    var selectedUser = null;
    var searchQuery = null;


    /**
     * Init
     *
     * Here you can place the functions & classes  you want to run on startup
     * @returns {Promise<void> }
     */
    async function init() {

        /*
        Parameters (Dynamic data)
         */
        const path = window.location.pathname.split("/").pop();
        const urlParams = new URLSearchParams(window.location.search);
        searchQuery = urlParams.get('query') || "";
        selectedUser = urlParams.get('userID') || "";

        /*
        Class declaration
         */
        database = new Database("https://api.fys.cloud/", "fys_is106_5.Pk9ggWAU7qg9EXTv", "fys_is106_5_dev", "dev");
        user = new User();
        translation = new Translation();
        notification = new Notifications();

        /*
        Authentication wall
         */
        user.authenticateUser(user.userID);

        /*
        General variabels
         */
        genders = await database.getGenders();
        hobbiesList = await database.getInterestList("hobbies");
        vacationList = await database.getInterestList("vacations");
        notifications = await notification.getNotifications(user.userID);

        /*
        General functions
         */
        populateGenders(genders);
        populateInterests(hobbiesList, vacationList);
        populateNotifications(notifications);
        notificationCounter(notifications);


        /*
        Conditional data
         */

        // For performance, the matching function will only run on the overview page
        if (path === "profileOverview.html") {
            matchData = await database.getMatches(user.userID, "%" + searchQuery + "%");

            populateMatches(matchData);
        }


        switch (path) {
            case "profileDetail.html":
                userData = await user.getUserData(selectedUser);
                userData.hobbies = await user.getInterest("hobbies", selectedUser);
                userData.vacations = await user.getInterest("vacations", selectedUser);
                userData.socials = await user.getSocials(selectedUser);

                displayUserData(userData, userData.hobbies, userData.vacations);
                break;
            case "userProfile.html":
                userData = await user.getUserData(user.userID);
                userData.hobbies = await user.getInterest("hobbies", user.userID);
                userData.vacations = await user.getInterest("vacations", user.userID);
                userData.socials = await user.getSocials(user.userID);

                console.log(userData);

                displayUserData(userData, userData.hobbies, userData.vacations);
                break;
            case "userEdit.html":
                userData = await user.getUserData(user.userID);
                userData.hobbies = await user.getInterest("hobbies", user.userID);
                userData.vacations = await user.getInterest("vacations", user.userID);
                userData.socials = await user.getSocials(user.userID);

                displayUserData(userData, userData.hobbies, userData.vacations);
                break;
        }
    }

    init(); // Run Initialise function


    /**
     * Displays information on pages
     * @param data
     * @param hobbies
     * @param vacations
     * @returns {Promise<void>}
     */
    async function displayUserData(data, hobbies, vacations) {
        try {

            var date = new Date(data[0].birthDate);


            // Image Display
            var profileImage = 'url(assets/img/stock/stock-7.jpg)';
            var hasProfileImage = await FYSCloud.API.fileExists(data[0].userID + ".png");

            // checks if there is a profile image for this profile
            if (hasProfileImage) {
                profileImage = "url(https://dev-is106-5.fys.cloud/uploads/" + data[0].userID + ".png)";
            }


            $("#userProfileImage").css({
                backgroundImage: profileImage,
            });


            // User information
            $("#userprofile-name").html(data[0].firstName + " " + data[0].lastName);
            $("#userprofile-username").html(data[0].email);
            $("#userprofile-birthdate").html(date.toLocaleDateString());
            $("#userprofile-residence").html(data[0].residence);

            // userform
            $("#userprofile-firstname").val(data[0].firstName);
            $("#userprofile-lastname").val(data[0].lastName);
            $("#userprofile-email").val(data[0].email);
            $("#userprofile-phonenumber").val(data[0].tel);
            $("#userEdit-residence").val(data[0].residence);
            $("#userEdit-bio").val(data[0].bio);

            // socials
            $("[name=website]").val(data.socials[0].website);
            $("[name=twitter]").val(data.socials[0].twitter);
            $("[name=instagram]").val(data.socials[0].instagram);
            $("[name=facebook]").val(data.socials[0].facebook);

            // User post
            $("#userprofile-postTitle").val(data[0].title);
            $("#userprofile-postContent").val(data[0].content);

            // User socials

            if (data.socials[0].website) { // website
                $("#userprofile-socials").append("     <a href='" + data.socials[0].website + "' target='_blank'>\n" +
                    "                            <li class=\"list-group-item d-flex justify-content-between align-items-center flex-wrap\">\n" +
                    "                                <h6 class=\"mb-0\">\n" +
                    "                                    <svg class=\"feather feather-globe mr-2 icon-inline\" fill=\"none\" height=\"24\"\n" +
                    "                                         stroke=\"currentColor\"\n" +
                    "                                         stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n" +
                    "                                         viewBox=\"0 0 24 24\"\n" +
                    "                                         width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "                                        <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n" +
                    "                                        <line x1=\"2\" x2=\"22\" y1=\"12\" y2=\"12\"></line>\n" +
                    "                                        <path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"></path>\n" +
                    "                                    </svg>\n" +
                    "                                    Website\n" +
                    "                                </h6>\n" +
                    "                                <span class=\"text-secondary\"><i class=\"fas fa-arrow-right\"></i></span>\n" +
                    "                            </li>\n" +
                    "                        </a>")
            }

            if (data.socials[0].twitter) { // twitter
                $("#userprofile-socials").append(" <a href='" + data.socials[0].twitter + "' target='_blank'>\n" +
                    "                                <li class=\"list-group-item d-flex justify-content-between align-items-center flex-wrap\">\n" +
                    "                                    <h6 class=\"mb-0\">\n" +
                    "                                        <svg class=\"feather feather-twitter mr-2 icon-inline text-info\" fill=\"none\"\n" +
                    "                                             height=\"24\"\n" +
                    "                                             stroke=\"currentColor\"\n" +
                    "                                             stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n" +
                    "                                             viewBox=\"0 0 24 24\"\n" +
                    "                                             width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "                                            <path d=\"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z\"></path>\n" +
                    "                                        </svg>\n" +
                    "                                        Twitter\n" +
                    "                                    </h6>\n" +
                    "                                    <span class=\"text-secondary\"><i class=\"fas fa-arrow-right\"></i></span>\n" +
                    "                                </li>\n" +
                    "                            </a>")
            }


            if (data.socials[0].instagram) { // instagram
                $("#userprofile-socials").append("<a <a href='" + data.socials[0].instagram + "' target='_blank'>\n" +
                    "                                <li class=\"list-group-item d-flex justify-content-between align-items-center flex-wrap\">\n" +
                    "                                    <h6 class=\"mb-0\">\n" +
                    "                                        <svg class=\"feather feather-instagram mr-2 icon-inline text-danger\" fill=\"none\"\n" +
                    "                                             height=\"24\" stroke=\"currentColor\"\n" +
                    "                                             stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n" +
                    "                                             viewBox=\"0 0 24 24\"\n" +
                    "                                             width=\"24\"\n" +
                    "                                             xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "                                            <rect height=\"20\" rx=\"5\" ry=\"5\" width=\"20\" x=\"2\" y=\"2\"></rect>\n" +
                    "                                            <path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"></path>\n" +
                    "                                            <line x1=\"17.5\" x2=\"17.51\" y1=\"6.5\" y2=\"6.5\"></line>\n" +
                    "                                        </svg>\n" +
                    "                                        Instagram\n" +
                    "                                    </h6>\n" +
                    "                                    <span class=\"text-secondary\"><i class=\"fas fa-arrow-right\"></i></span>\n" +
                    "                                </li>\n" +
                    "                            </a>")
            }


            if (data.socials[0].facebook) { // facebook
                $("#userprofile-socials").append("<a href='" + data.socials[0].facebook + "' target='_blank'>\n" +
                    "                                <li class=\"list-group-item d-flex justify-content-between align-items-center flex-wrap\">\n" +
                    "                                    <h6 class=\"mb-0\">\n" +
                    "                                        <svg class=\"feather feather-facebook mr-2 icon-inline text-primary\" fill=\"none\"\n" +
                    "                                             height=\"24\" stroke=\"currentColor\"\n" +
                    "                                             stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n" +
                    "                                             viewBox=\"0 0 24 24\"\n" +
                    "                                             width=\"24\"\n" +
                    "                                             xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "                                            <path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"></path>\n" +
                    "                                        </svg>\n" +
                    "                                        Facebook\n" +
                    "                                    </h6>\n" +
                    "                                    <span class=\"text-secondary\"><i class=\"fas fa-arrow-right\"></i></span>\n" +
                    "                                </li>\n" +
                    "                            </a>")
            }


            // User bio
            if (data[0].bio) {
                $("#userprofile-bio").text(data[0].bio);
            } else {
                $("#userprofile-bio").text("Deze gebruiker heeft nog geen bio");
            }

            // User hobbies
            if (hobbies.length != 0) {
                hobbies.map(function (value, key) {
                    $("#userProfile-hobbies").append("<li class=\"list-group-item\" data-id='" + value.interestID + "'>" + value.description + "</li>");
                    $("#userEdit-hobbies").append("<li class=\"list-group-item\" data-id='" + value.interestID + "'>" + value.description + " <a \n" +
                        "                                                                                           style=\"color: #c92332;\"><i\n" +
                        "                                                    class=\"far fa-times-circle\"></i></a></li>")
                });

            } else {
                $("#userProfile-hobbies").append("<li class=\"list-group-item\">Geen Hobbie's</li>");
                $("#userEdit-hobbies").append("<li class=\"list-group-item\">Geen Hobbie's</li>")
            }

            // User Vacations
            if (vacations.length != 0) {
                vacations.map(function (value, key) {
                    $("#userProfile-vacations").append("<div class=\"card\">\n" +
                        "                                        <div class=\"card-header\" id=\"headingOne\">\n" +
                        "                                            <h2 class=\"mb-0\">\n" +
                        "                                                <button aria-controls=\"collapseOne\" aria-expanded=\"true\"\n" +
                        "                                                        class=\"btn btn-link btn-block text-left\"\n" +
                        "                                                        data-target=\"#collapseOne\"\n" +
                        "                                                        data-toggle=\"collapse\" data-id='" + value.vacationID + "' type=\"button\">\n" +
                        "                                                    " + value.destination + "\n" +
                        "                                                </button>\n" +
                        "                                            </h2>\n" +
                        "                                        </div>\n" +
                        "\n" +
                        "                                        <div aria-labelledby=\"headingOne\" class=\"collapse\"\n" +
                        "                                             data-parent=\"#userProfile-vacations\"\n" +
                        "                                             id=\"collapseOne\">\n" +
                        "                                            <div class=\"card-body\">\n" +
                        "                                                " + value.description + "\n" +
                        "                                                <a class=\"btn btn-outline-primary m-1\"\n" +
                        "                                                   href=\" " + value.url + " \"\n" +
                        "                                                   target=\"_blank\">Bekijk vakantie <i\n" +
                        "                                                        class=\"fas fa-plane\"></i></a>\n" +
                        "                                            </div>\n" +
                        "                                        </div>\n" +
                        "                                    </div>");

                    $("#userEdit-vacations").append("<div class=\"card\">\n" +
                        "                                        <div class=\"card-header\" id=\"headingOne\">\n" +
                        "                                            <h2 class=\"mb-0\">\n" +
                        "                                                <button aria-controls=\"collapseOne\" aria-expanded=\"true\"\n" +
                        "                                                        class=\"btn btn-link btn-block text-left\"\n" +
                        "                                                        data-target=\"#collapseOne\"\n" +
                        "                                                        data-toggle=\"collapse\" data-id='" + value.vacationID + "' type=\"button\">\n" +
                        "                                                    " + value.destination + "\n" + " <a href=\"#\" \n" +
                        "                                                                                           style=\"color: #c92332;\"><i\n" +
                        "                                                    class=\"far fa-times-circle\"></i></a> " +
                        "                                                </button>\n" +
                        "                                            </h2>\n" +
                        "                                        </div>\n" +
                        "\n" + "                                    </div>");
                });
            } else {
                $("#userProfile-vacations").append("" +
                    "   <div class=\"card\">\n" +
                    "                                        <div class=\"card-header\" id=\"headingOne\">\n" +
                    "                                            <h2 class=\"mb-0\">\n" +
                    "                                                <button aria-controls=\"collapseOne\" aria-expanded=\"true\"\n" +
                    "                                                        class=\"btn btn-link btn-block text-left\"\n" +
                    "                                                        data-target=\"#collapseOne\"\n" +
                    "                                                        data-toggle=\"collapse\" type=\"button\">\n" +
                    "                                                    Geen vakantie's\n" +
                    "                                                </button>\n" +
                    "                                            </h2>\n" +
                    "                                        </div></div>");

                $("#userEdit-vacations").append("" +
                    "   <div class=\"card\">\n" +
                    "                                        <div class=\"card-header\" id=\"headingOne\">\n" +
                    "                                            <h2 class=\"mb-0\">\n" +
                    "                                                <button aria-controls=\"collapseOne\" aria-expanded=\"true\"\n" +
                    "                                                        class=\"btn btn-link btn-block text-left\"\n" +
                    "                                                        data-target=\"#collapseOne\"\n" +
                    "                                                        data-toggle=\"collapse\" type=\"button\">\n" +
                    "                                                    Geen vakantie's\n" +
                    "                                                </button>\n" +
                    "                                            </h2>\n" +
                    "                                        </div></div>");
            }

        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Adds notifications dynamically to notification page
     * @param notifications
     */
    function populateNotifications(notifications) {
        for (let i = 0; i < notifications.length; i++) {
            switch (notifications[i].type) {
                case "default":
                    $("#notificationsList").append(
                        "    <a class=\"list-group-item list-group-item-action flex-column align-items-start text-left\" href=\"#\">\n" +
                        "                        <div class=\"d-flex w-100 justify-content-between\">\n" +
                        "                            <h5 class=\"mb-1\">" + notifications[i].title + "</h5>\n" +
                        "                        </div>\n" +
                        "                        <p class=\"mb-1\">" + notifications[i].content + "</p>\n" +
                        "                        <small>" + notifications[i].disclaimer + "</small>\n" +
                        "                    </a>"
                    );
                    break;
                case "friendRequest":
                    $("#notificationsList").append(
                        "    <a class=\"list-group-item list-group-item-action flex-column align-items-start text-left\" href=\"#\">\n" +
                        "                        <div class=\"d-flex w-100 justify-content-between\">\n" +
                        "                            <h5 class=\"mb-1\">" + notifications[i].title + "</h5>\n" +
                        "                        </div>\n" +
                        "                        <p class=\"mb-1\">" + notifications[i].content + "</p>\n" +
                        "                        <small><button class='btn btn-success mr-2' id='friendRequest-accept' data-id='" + notifications[i].target + "'>Accepteren</button><button class='btn btn-danger' id='friendRequest-decline' data-id='" + notifications[i].target + "'>Afwijzen</button> </small>\n" +
                        "                    </a>"
                    );
                    break;
                default:
                    return false;
            }
        }
    }

    /**
     * Adds a notification counter at the notifications header button
     * @param allNotifications
     */
    function notificationCounter(notifications) {
        $("#notificationCounter").html("<span>" + notifications.length + "</span>")
    }


    /**
     * Here the html page is filled with matchData
     * @param data
     */
    async function populateMatches(data) {
        try {
            for (let i = 0; i < data.length; i++) {

                // dynamic variables for overview page
                var profileImage = 'assets/img/stock/stock-7.jpg';
                var profileExcerpt = "Geen hobbies";
                var profileScoring = data[i].scoring < 10 ? (data[i].scoring * 10) : 100;
                var hasProfileImage = await FYSCloud.API.fileExists(data[i].userID + ".png");

                // checks if there is a profile image for this profile
                if (hasProfileImage) {
                    profileImage = "https://dev-is106-5.fys.cloud/uploads/" + data[i].userID + ".png";
                }

                // checks if there is hobbies for this profile
                if (data[i].hobbies.length) {
                    profileExcerpt = "";
                    for (let j = 0; j < data[i].hobbies.length; j++) {
                        profileExcerpt += ", " + data[i].hobbies[j];
                    }
                }


                $("#matchRow").append("<div class=\"col-lg-4 col-md-6 mb-4\">\n" +
                    "                    <div class=\"card h-100\">\n" +
                    "                        <a href=\"profileDetail.html?userID=" + data[i].userID + "\">\n" +
                    "                            <div class=\"profile-img\"\n" +
                    "                                 style=\"background-image: url(" + profileImage + ")\"></div>\n" +
                    "                        </a>\n" +
                    "                        <div class=\"card-body\">\n" +
                    "                            <h4 class=\"card-title\">\n" +
                    "                                <a href=\"profileDetail.html?userID=" + data[i].userID + "\">" + data[i].firstName + " " + data[i].lastName + "</a>\n" +
                    "                            </h4>\n" +
                    "                            <p class=\"card-text\">" + profileExcerpt + "</p>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div class=\"card-footer\">\n" +
                    "                            <small class=\"text-muted\">Match: " + profileScoring + "%</small>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>");
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Fills gender options in register page
     * @param data
     */
    function populateGenders(data) {
        data.map(function (value, key) {
            $("#gender-selection").append("<option value=" + value.genderID + ">" + value.description + "</option>");
        });
    }


    /**
     * Adds interests list in user edit page
     * @param hobbies
     * @param vacations
     */
    function populateInterests(hobbies, vacations) {
        hobbies.map(function (value, key) {
            $("#userEditHobbies").append("<option value=" + value.interestID + ">" + value.description + "</option>");
        });

        vacations.map(function (value, key) {
            $("#userEditVacations").append("<option value=" + value.vacationID + ">" + value.destination + "</option>");
        });
    }


    /***************************   Authentication/Login/Register   *********************************/


    // Login button event listener
    $("#login-button").click(async function (e) {
        try {
            e.preventDefault();

            var data = $('#login-form').serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            // logs user in
            const loggedUser = await user.login(data);

            // actions if login results come back
            if (!loggedUser) {
                notification.info("Gegevens niet correct.")
            }

        } catch (e) {
            console.log(e);
        }
    });

    // Register button event listener
    $("#register-button").click(async function (e) {
        try {
            e.preventDefault();

            var data = $('#register-form').serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            // check if all fields are filled in.
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (!data[key]) {
                        notification.info("Controleer of alle velden ingevuld zijn.");
                        return;
                    }
                }
            }

            // checks password
            if (data.userPassword != data.userPasswordRepeat) {
                notification.info("Uw wachtwoorden komen niet overeen.");
                return;
            }

            // registers user
            var registeredUser = await user.register(data);
            var addNotification = await notification.addNotification(registeredUser, "Welkom bij Corendon Vakantie maatje!", "Begin met het toevoegen van interesses om zo jou profiel te personaliseren en de perfecte vakantie maatje te vinden!", "Bewerken kun je doen bij je profiel.");

            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    });

    // Logout button event listener
    $("#logout-button").click(function (e) {
        e.preventDefault();
        user.logout();
    });


    /***************************   User editing page   *********************************/


    // If logged user saves changes
    $("#userUpdateSubmit").click(async function (e) {
        e.preventDefault();


        var data = $('#userUpdateData').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        var dataSocials = $('#userEdit-socials').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});


        var updatedSocials = await user.updateSocials(user.userID, dataSocials);
        var updatedUser = await user.updateUserData(user.userID, data);


        if (updatedUser) {
            notification.success("Gegevens zijn aangepast!");
            notification.addNotification(user.userID, "Profiel is bijgewerkt!", "U kunt uw veranderingen zien op de profielpagina.", "Voor andere wijzigingen, zie profiel bijwerken.")
            window.location.href = "./userProfile.html";
        }
    });

    // Adds vacation
    $("#userEdit-addVacation").click(async function () {
        try {
            var inputSelectedVacation = $('#userEditVacations').find(":selected");

            var selectedVacation = vacationList.filter(obj => {
                return obj.vacationID == inputSelectedVacation.val();
            });
            var addVacation = await user.addInterest("vacations", selectedVacation[0].vacationID, user.userID);
            if (addVacation) {
                notification.success("Vakantie toegevoegd!");
            }

            $("#userEdit-vacations").append("<div class=\"card\">\n" +
                "                                                <div class=\"card-header\" id=\"headingThree\">\n" +
                "                                                    <h2 class=\"mb-0\">\n" +
                "                                                        <button aria-controls=\"collapseThree\"\n" +
                "                                                                aria-expanded=\"false\"\n" +
                "                                                                class=\"btn btn-link btn-block text-left collapsed\"\n" +
                "                                                                data-target=\"#collapseThree\"\n" +
                "                                                                data-toggle=\"collapse\" type=\"button\">\n" +
                "                                                            " + selectedVacation[0].destination + " <a href=\"#\" style=\"color: #C92332;\"><i\n" +
                "                                                                class=\"far fa-times-circle\"></i></a>\n" +
                "                                                        </button>\n" +
                "                                                    </h2>\n" +
                "                                                </div>\n" +
                "                                            </div>");

        } catch (e) {
            console.log(e);
        }
    });


    // deletes vacation
    $("#userEdit-vacations").on("click", "button", async function () {
        try {
            var element = $(this);
            var elementID = element.attr("data-id");

            const deletedVacation = await user.deleteInterest('vacations', elementID, user.userID);

            if (deletedVacation) {
                element.parent().parent().remove();
                notification.success("Vakantie is verwijderd!");
            } else {
                notification.info("Vakantie verwijderen is mislukt!");
            }

        } catch (e) {
            console.log(e);
        }
    });


    //Adds hobbies
    $("#userEdit-addHobby").click(async function () {
        try {
            var inputSelectedHobby = $('#userEditHobbies').find(":selected");

            var selectedHobby = hobbiesList.filter(obj => {
                return obj.interestID == inputSelectedHobby.val();
            });

            var addHobbies = await user.addInterest("hobbies", selectedHobby[0].interestID, user.userID);

            if (addHobbies) {
                notification.success("hobby toegevoegd!");
            }

            $("#userEdit-hobbies").append("<li class=\"list-group-item\">" + selectedHobby[0].description + " <a href=\"#\" \n" +
                "                                                                                           style=\"color: #c92332;\"><i\n" +
                "                                                    class=\"far fa-times-circle\"></i></a></li>");

        } catch (e) {
            console.log(e);
        }

    });

    // deletes hobby
    $("#userEdit-hobbies").on("click", "li", async function () {
        try {
            var element = $(this);
            var elementID = element.attr("data-id");

            const deletedHobby = await user.deleteInterest('hobbies', elementID, user.userID);

            if (deletedHobby) {
                element.remove();
                notification.success("Hobby is verwijderd!");
            } else {
                notification.info("Hobby verwijderen is mislukt!");
            }

        } catch (e) {
            console.log(e);
        }
    });

    // upload user profile image
    $("#userUpdateImageFile").click(async function () { // bCheck is a input type button
        try {
            var fileName = $("#userUpdateImageFile").val();

            if (fileName) { // returns true if the string is not empty
                var uploadedImage = await user.updateUserImage(user.userID);

                $("#userProfileImage").css({
                    backgroundImage: "url(" + uploadedImage + ")",
                });

                console.log(uploadedImage);
            } else { // no file was selected
                notification.info("Geen profielfoto geselecteerd")
            }
        } catch (e) {
            console.log(e)
        }
    });


    /***************************   Connections/Chats/Messages   *********************************/


    // Alert for functionalities for which u need to be friends.
    $(".friend-required-alert").click(function () {
        notification.info("U moet eerst vrienden zijn voor dit");
    });

    // Alert to give user feedback when friend request is send.
    $(".friend-request-alert").on("click", async function () {
        try {
            var friendRequest = await database.sendFriendRequest(user.userID, selectedUser);
            var userRequested = await user.getUserData(user.userID);
            var notificationOne = await notification.addNotification(user.userID, "Vriendschapsverzoek is verstuurd naar " + userData[0].firstName + "!", "Wanneer uw verzoek is geaccepteerd, kunt u in contact komen met deze persoon", "U krijgt een melding wanneer uw verzoek is geaccepteerd");
            var notificationTwo = await notification.addNotification(selectedUser, "Hoi " + userData[0].firstName + ", u heeft een vriendschapverzoek ontvangen", "van " + userRequested[0].firstName + " " + userRequested[0].lastName, "", "friendRequest", user.userID);
            notification.success("Vriendschapverzoek verstuurd naar " + userData[0].firstName + " " + userData[0].lastName +"!");

        } catch (e) {
            console.log(e);
        }
    });

    $("#notificationsList").on("click", "button", async function () {
        try {
            var targetUser = await user.getUserData($(this).attr("data-id"));
            var loggedUser = await user.getUserData(user.userID);

            // delete notification
            // send notification to both parties
            // turn connection to accepted
            // create a chat

            console.log(targetUser);
            console.log(loggedUser);

        } catch (e) {
            console.log(e);
        }
    });

    // Displays the users friendlist
    $('.show-friends-button').on('click', function () {
        var friendList = $('.friendlist');
        var friendListOverlay = $('.page-overlay');

        friendList.toggleClass("show");
        friendListOverlay.toggleClass("hide-overlay");
    });

    // Friendlist page overlay is clickable
    $('.page-overlay').on('click', function () {
        var friendList = $('.friendlist');
        var friendListOverlay = $('.page-overlay');

        friendList.toggleClass("show");
        friendListOverlay.toggleClass("hide-overlay");
    });


    /***************************   Translations   *********************************/


    /**
     * Translation event listeners
     */
    $("#localizationLanguageSwitch").on("change", function () {
        translation.switchLanguage($(this).val());
    });

    $("#localizationDynamicClick").on("click", function () {
        translation.translate();
    });

    $(".rating").on("click", "input", async function () {
        try {
            var review = ($(this).val());
            var userRating = await database.updateReview(user.userID, selectedUser, review);
            var userReview = await database.getReviews(selectedUser);



            console.log(userRating)
            console.log(userReview)



        } catch (e) {
            console.log(e)
        }
    });
    /***************************   Extra functionality   *********************************/


// search button
    $("#searchButton").click(function () {
        location.href = "./profileOverview.html?query=" + $("#searchQuery").val();
    });

// feeling lucky button
    $("#feelingLucky").click(async function () {
        try {
            var randomUserID = await user.getRandomUser();
            location.href = "./profileDetail.html?userID=" + randomUserID[0].userID;
        } catch (e) {
            console.log(e)
        }
    });
});



