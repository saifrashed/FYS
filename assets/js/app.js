$(document).ready(function () {

    /*
     * Declaration of variables
     */
    var database         = null;
    var user             = null;
    var translation      = null;
    var notification     = null;
    var genders          = null;
    var userData         = null;
    var hobbiesList      = null;
    var vacationList     = null;
    var hobbiesUserList  = null;
    var user             = null;
    var vacationUserList = null;
    var deleteHobbies    = null;
    var deleteVacation   = null;
    var matchData        = null;
    var notifications    = null;
    var selectedUserData = null;


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
        const path         = window.location.pathname.split("/").pop();
        const urlParams    = new URLSearchParams(window.location.search);
        const searchQuery  = urlParams.get('query') || "";
        const selectedUser = urlParams.get('userID') || "";

        /*
        Class declaration
         */
        database     = new Database("https://api.fys.cloud/", "fys_is106_5.Pk9ggWAU7qg9EXTv", "fys_is106_5_dev", "dev");
        user         = new User();
        translation  = new Translation();
        notification = new Notifications();

        /*
        Authentication wall
         */
        user.authenticateUser(user.userID);

        /*
        General variabels
         */
        genders       = await database.getGenders();
        hobbiesList   = await database.getInterestList("hobbies");
        vacationList  = await database.getInterestList("vacations");
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
                userData         = await user.getUserData(selectedUser);
                hobbiesUserList  = await user.getInterest("hobbies", selectedUser);
                vacationUserList = await user.getInterest("vacations", selectedUser);

                displayUserData(userData, hobbiesUserList, vacationUserList);
                break;
            case "userProfile.html":
                userData         = await user.getUserData(user.userID);
                hobbiesUserList  = await user.getInterest("hobbies", user.userID);
                vacationUserList = await user.getInterest("vacations", user.userID);

                displayUserData(userData, hobbiesUserList, vacationUserList);
                break;
            case "userEdit.html":
                userData         = await user.getUserData(user.userID);
                hobbiesUserList  = await user.getInterest("hobbies", user.userID);
                vacationUserList = await user.getInterest("vacations", user.userID);

                displayUserData(userData, hobbiesUserList, vacationUserList);
                break;
        }


        // notification.addNotification(user.userID, "Yes", "Jaa zeker", "Klik hier om to te voegen")
    }

    init();


    /**
     * Adds notifications dynamically to notification page
     * @param notifications
     */
    function populateNotifications(notifications) {
        for (let i = 0; i < notifications.length; i++) {

            $("#notificationsList").append(
                "    <a class=\"list-group-item list-group-item-action flex-column align-items-start text-left\" href=\"#\">\n" +
                "                        <div class=\"d-flex w-100 justify-content-between\">\n" +
                "                            <h5 class=\"mb-1\">" + notifications[i].title + "</h5>\n" +
                "                        </div>\n" +
                "                        <p class=\"mb-1\">" + notifications[i].content + "</p>\n" +
                "                        <small>" + notifications[i].disclaimer + "</small>\n" +
                "                    </a>"
            );
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
     * Displays information on page
     * @param data
     * @param hobbies
     * @param vacations
     * @returns {Promise<void>}
     */
    async function displayUserData(data, hobbies, vacations) {
        try {

            var date = new Date(data[0].birthDate);


            // Image Display
            var profileImage    = 'url(assets/img/stock/stock-7.jpg)';
            var hasProfileImage = await FYSCloud.API.fileExists(data[0].userID + ".png");

            // checks if there is a profile image for this profile
            if (hasProfileImage) {
                profileImage = "url(https://dev-is106-5.fys.cloud/uploads/" + data[0].userID + ".png)";
            }


            $("#userProfileImage").css({
                backgroundImage: profileImage,
            });


            // User informatie
            $("#userprofile-name").html(data[0].firstName + " " + data[0].lastName);
            $("#userprofile-username").html(data[0].email);
            $("#userprofile-birthdate").html(date.toLocaleDateString());
            $("#userprofile-residence").html(data[0].residence);

            //userform
            $("#userprofile-firstname").val(data[0].firstName);
            $("#userprofile-lastname").val(data[0].lastName);
            $("#userprofile-email").val(data[0].email);
            $("#userprofile-phonenumber").val(data[0].tel);
            $("#userEdit-residence").val(data[0].residence);
            $("#userEdit-bio").val(data[0].bio);


            // User bio
            if (data[0].bio) {
                $("#userprofile-bio").text(data[0].bio);
            } else {
                $("#userprofile-bio").text("Deze gebruiker heeft nog geen bio");
            }

            // User hobbies
            if (hobbies.length != 0) {
                hobbies.map(function (value, key) {
                    $("#userProfile-hobbies").append("<li class=\"list-group-item\">" + value.description + "</li>");
                    $("#userEdit-hobbies").append("<li class=\"list-group-item\">" + value.description + " <a href=\"#\" id='userEdit-deleteHobby' \n" +
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
                        "                                                        data-toggle=\"collapse\" type=\"button\">\n" +
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
                        "                                                        data-toggle=\"collapse\" type=\"button\">\n" +
                        "                                                    " + value.destination + "\n" + " <a href=\"#\" id='userEdit-deleteVacation' \n" +
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
     * Here the html page is filled with matchData
     * @param data
     */
    async function populateMatches(data) {
        try {
            for (let i = 0; i < data.length; i++) {

                // dynamic variables for overview page
                var profileImage    = 'assets/img/stock/stock-7.jpg';
                var profileExcerpt  = "Geen hobbies";
                var profileScoring  = data[i].scoring < 10 ? (data[i].scoring * 10) : 100;
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
            var registeredUser  = await user.register(data);
            var addNotification = await notification.addNotification(registeredUser, "Welkom bij Corendon Vakantie maatje!", "Begin met het toevoegen van interesses om zo jou profiel te personaliseren en de perfecte vakantie maatje te vinden!", "Bewerken kun je doen bij je profiel.");

            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    });

    // Logout button event listener
    $("#logout-button").click(function (e) {
        e.preventDefault();

        //actions
        user.logout();
    });

    // If logged user saves changes
    $("#userUpdateSubmit").click(async function (e) {
        e.preventDefault();
        console.log("klik werkt");

        var data = $('#userUpdateData').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});


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
            var addVacation      = await user.addInterest("vacations", selectedVacation[0].vacationID, user.userID);
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
    $("#userEdit-deleteVacation").click(function (e) {
        e.preventDefault();
        console.log("klik werkt");

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

            $("#userEdit-hobbies").append("<li class=\"list-group-item\">" + selectedHobby[0].description + " <a href=\"#\" id='userEdit-deleteHobby' \n" +
                "                                                                                           style=\"color: #c92332;\"><i\n" +
                "                                                    class=\"far fa-times-circle\"></i></a></li>");

        } catch (e) {
            console.log(e);
        }

    });

    // deletes hobby
    $("#userEdit-deleteHobby").click(function (e) {
        try {
            e.preventDefault();
            console.log("klik werkt");
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

    // search button
    $("#searchButton").click(function (e) {
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
    })


    // Alert for functionalities for which u need to be friends.
    $(".friend-required-alert").click(function () {
        notification.info("U moet eerst vrienden zijn voor dit");
    });

    // Alert to give user feedback when friend request is send.
    $(".friend-request-alert").on("click", function () {
        notification.success("Vriendschapverzoek verstuurd!");
    });

    // Displays the users friendlist
    $('.show-friends-button').on('click', function () {
        var friendList        = $('.friendlist');
        var friendListOverlay = $('.page-overlay');

        friendList.toggleClass("show");
        friendListOverlay.toggleClass("hide-overlay");
    });

    // Friendlist page overlay is clickable
    $('.page-overlay').on('click', function () {
        var friendList        = $('.friendlist');
        var friendListOverlay = $('.page-overlay');

        friendList.toggleClass("show");
        friendListOverlay.toggleClass("hide-overlay");
    });

    /**
     * Translation event listeners
     */
    $("#localizationLanguageSwitch").on("change", function () {
        translation.switchLanguage($(this).val());
    });

    $("#localizationDynamicClick").on("click", function () {
        translation.translate();
    });
});
