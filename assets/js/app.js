$(document).ready(function () {

    /*
     * Declaration of variables
     */
    var database     = null;
    var user         = null;
    var translation  = null;
    var notification = null;
    var genders      = null;


    /**
     * Init
     *
     * Here you can place the functions & classes  you want to run on startup
     * @returns {Promise<void>}
     */
    async function init() {
        // variables
        database     = new Database("https://api.fys.cloud/", "fys_is106_5.Pk9ggWAU7qg9EXTv", "fys_is106_5_dev", "dev");
        user         = new User();
        translation  = new Translation();
        notification = new Notifications();
        genders      = await database.getGenders();


        // functions
        populateGenders(genders);
        user.authenticateUser(localStorage.getItem('FYSAuthId'));
    }

    init();

    /**
     * General functions
     *
     * Here you can make functions that will be general purpose
     */
    function populateGenders(data) {
        data.map(function (value, key) {
            $("#gender-selection").append("<option value=" + value.genderID + ">" + value.description + "</option>");
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

            // dheck if all fields are filled in.
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

    /**
     * END: User section
     */


    /**
     * Alert for functionalities for which u need to be friends.
     */
    $(".friend-required-alert").click(function () {
        notification.info("U moet eerst vrienden zijn voor dit");
    });

    /**
     * Alert to give user feedback when friend request is send.
     */
    $(".friend-request-alert").on("click", function () {
        notification.success("Vriendschapverzoek verstuurd!");
    });


    /**
     * Displays the users friendlist
     */
    $('.show-friends-button').on('click', function () {
        var friendList        = $('.friendlist');
        var friendListOverlay = $('.page-overlay');

        friendList.toggleClass("show");
        friendListOverlay.toggleClass("hide-overlay");
    });


    /**
     * Friendlist page overlay is clickable
     */
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
