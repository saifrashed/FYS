$(document).ready(function () {

    /*
     * Declaration of variables
     */
    var database     = null;
    var user         = null;
    var translation  = null;
    var notification = null;
    var genders      = null;
    var userData     = null;
    var hobbiesList  = null;
    var vacationList = null;


    /**
     * Init
     *
     * Here you can place the functions & classes  you want to run on startup
     * @returns {Promise<void> }
     */
    async function init() {
        // variables
        database     = new Database("https://api.fys.cloud/", "fys_is106_5.Pk9ggWAU7qg9EXTv", "fys_is106_5_dev", "dev");
        user         = new User();
        translation  = new Translation();
        notification = new Notifications();
        genders      = await database.getGenders();
        userData     = await user.getUserData(user.userID);
        hobbiesList  = await database.getInterests("hobbies");
        vacationList = await database.getInterests("vacations");

        // functions
        user.authenticateUser(user.userID);
        populateGenders(genders);
        displayUserData(userData);
        populateInterests(hobbiesList, vacationList)
    }

    init();

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


    $("#userEdit-addVacation").click(function () {

        var inputSelectedVacation = $('#userEditVacations').find(":selected");

        var selectedVacation = vacationList.filter(obj => {
            return obj.vacationID == inputSelectedVacation.val();
        });

        console.log(selectedVacation);

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


    });

    $("#userEdit-addHobby").click(function () {

        var inputSelectedHobby = $('#userEditHobbies').find(":selected");

        var selectedHobby = hobbiesList.filter(obj => {
            return obj.interestID == inputSelectedHobby.val();
        });

        console.log(selectedHobby);

        $("#hobbiesList").append("<li class=\"list-group-item\">" + selectedHobby[0].description + " <a href=\"#\"\n" +
            "                                                                                           style=\"color: #C92332;\"><i\n" +
            "                                                    class=\"far fa-times-circle\"></i></a></li>");

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
