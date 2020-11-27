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
    var vacationUserList = null;
    var deleteHobbies    = null;
    var deleteVacation   = null;
    var matchData        = null;

    /**
     * Init
     *
     * Here you can place the functions & classes  you want to run on startup
     * @returns {Promise<void> }
     */

    async function init() {

        // parameters
        const urlParams   = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('query') || "";

        // variables
        database         = new Database("https://api.fys.cloud/", "fys_is106_5.Pk9ggWAU7qg9EXTv", "fys_is106_5_dev", "dev");
        user             = new User();
        translation      = new Translation();
        notification     = new Notifications();
        genders          = await database.getGenders();
        userData         = await user.getUserData(user.userID);
        hobbiesList      = await database.getInterestList("hobbies");
        vacationList     = await database.getInterestList("vacations");
        hobbiesUserList  = await user.getInterest("hobbies", user.userID);
        vacationUserList = await user.getInterest("vacations", user.userID);
        deleteHobbies    = await user.deleteInterest("hobbies", hobbiesUserList, user.userID);
        deleteVacation   = await user.deleteInterest("vacation", vacationUserList, user.userID);
        matchData        = await database.getMatches(user.userID, "%" + searchQuery + "%");

        // functions
        user.authenticateUser(user.userID);
        populateGenders(genders);
        displayUserData(userData);
        populateInterests(hobbiesList, vacationList);
        populateUserInterests(hobbiesUserList, vacationUserList);
        populateUserEditInterests(hobbiesUserList, vacationUserList);

        //matchings
        populateMatches(matchData);


        console.log(hobbiesUserList)


    }

    init();

    /**
     * Here the html page is filled with matchData
     * @param data
     */
    function populateMatches(data) {
        for (let i = 0; i < matchData.length; i++) {
            $("#matchRow").append("<div class=\"col-lg-4 col-md-6 mb-4\">\n" +
                "                    <div class=\"card h-100\">\n" +
                "                        <a href=\"profileDetail.html?userID=" + matchData[i].userID + "\">\n" +
                "                            <div class=\"profile-img\"\n" +
                "                                 style=\"background-image: url('assets/img/stock/stock-7.jpg')\"></div>\n" +
                "                        </a>\n" +
                "                        <div class=\"card-body\">\n" +
                "                            <h4 class=\"card-title\">\n" +
                "                                <a href=\"profileDetail.html?userID=" + matchData[i].userID + "\">" + matchData[i].firstName + " " + matchData[i].lastName + "</a>\n" +
                "                            </h4>\n" +
                "                            <p class=\"card-text\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam\n" +
                "                                aspernatur!</p>\n" +
                "                        </div>\n" +
                "\n" +
                "                        <div class=\"card-footer\">\n" +
                "                            <small class=\"text-muted\">Match: 87%</small>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>");
            console.log(matchData[i].firstName)
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
     * Fills logged user data user data
     * @param data
     */
    function displayUserData(data) {

        var date = new Date(data[0].birthDate);

        //userbox
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

    /**
     * Populates user page hobbies and vacations
     * @param hobbies
     * @param vacations
     */
    function populateUserInterests(hobbies, vacations) {


        hobbies.map(function (value, key) {
            $("#userProfile-hobbies").append("<li class=\"list-group-item\">" + value.description + "</li>")
        });


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
                "                                    </div>")
        });
    }

    /**
     * Populates user page hobbies and vacations
     * @param hobbies
     * @param vacations
     */
    function populateUserEditInterests(hobbies, vacations) {
        console.log(hobbies);
        console.log(vacations);
    }

    /**
     * User section
     *
     * This section contains the eventlisteners that will be handling user actions like editing profile and logging in and registration.
     */
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
            var registeredUser = user.register(data);

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
        }
    });

//Adds vacation
    $("#userEdit-addVacation").click(async function () {
        try {
            var inputSelectedVacation = $('#userEditVacations').find(":selected");

            var selectedVacation = vacationList.filter(obj => {
                return obj.vacationID == inputSelectedVacation.val();
            });
            var addVacation      = await user.addInterest("vacations", selectedVacation[0].vacationID, user.userID)
            if (addVacation) {
                notification.success("Vakantie toegevoegd!");
            }

            $("#vacationAccordion").append("<div class=\"card\">\n" +
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
        try {
            e.preventDefault();
            console.log("klik werkt");
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

            var addHobbies = await user.addInterest("hobbies", selectedHobby[0].interestID, user.userID)
            if (addHobbies) {
                notification.success("hobby toegevoegd!");
            }

            $("#hobbiesList").append("<li class=\"list-group-item\">" + selectedHobby[0].description + " <a href=\"#\" id='userEdit-deleteHobby' \n" +
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

    // search button
    $("#searchButton").click(function (e) {
        location.href = "./profileOverview.html?query=" + $("#searchQuery").val();
    });

    /**
     * END: User section
     */
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
