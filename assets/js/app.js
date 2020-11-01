$(document).ready(function () {


    /*
     * Initializing FYS API & database operations
     */
    var database = new Database("https://api.fys.cloud", "fys_is106_5.Pk9ggWAU7qg9EXTv", "fys_is106_5", "mockup");

    // database.sendMail("Hahaha", "saifeddinerashed", "saifeddinerashed@icloud.com");

    /*
     * Translation section
     *
     * The translation settings will be set and applied in the site. Users localstorage will be checked and saved if he already has set a language.
     */
    var initialLanguage = localStorage.getItem('FYSlang') || window.navigator.userLanguage || window.navigator.language || 'en';

    var translations = {
        header:           {

            homepage:      {
                nl: "Home <i class=\"fas fa-home\"></i>",
                en: "Home <i class=\"fas fa-home\"></i>"
            },
            profile:       {
                nl: "Profiel <i class=\"fas fa-user\"></i>",
                en: "Profile <i class=\"fas fa-user\"></i>"
            },
            notifications: {
                nl: "Notificaties <i class=\"fas fa-bell\"></i>",
                en: "Notifications <i class=\"fas fa-bell\"></i>"
            },
            logout:        {
                nl: "Uitloggen <i class=\"fas fa-sign-out-alt\"></i>",
                en: "Logout <i class=\"fas fa-sign-out-alt\"></i>"
            },
            login:         {
                nl: "Inloggen",
                en: "Login"
            },
            register:      {
                nl: "Registreren",
                en: "Registration"
            },
        },
        footer:           {
            copyright: {
                nl: "Corendon © Gegarandeerd veilig boeken want Corendon is aangesloten bij het ANVR, SGR en Calamiteitenfonds.",
                en: "Corendon © Guaranteed safe booking because Corendon is affiliated with the ANVR, SGR and Calamiteitenfonds."
            }
        },
        homepage:         {
            headerText:          {
                nl: "Vind jou vakantie buddy!",
                en: "Find your vacation buddy!"
            },
            headerSubText:       {
                nl: "En snel ook...",
                en: "And fast..."
            },
            headerButton:        {
                nl: "Creeër een profiel",
                en: "Create an profile"
            },
            headingOne:          {
                nl: "Registreer",
                en: "Registration"
            },
            headingOneContent:   {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."
            },
            headingTwo:          {
                nl: "Personaliseer",
                en: "Personalize"
            },
            headingTwoContent:   {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."
            },
            headingThree:        {
                nl: "Ontdek meer",
                en: "Discover more"
            },
            headingThreeContent: {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."
            }
        },
        breadcrumbs:      {
            home:            {
                nl: "Home",
                en: "Home"
            },
            profileList:     {
                nl: "Profieloverzicht",
                en: "Profilelist"
            },
            userProfile:     {
                nl: "Mijn profiel",
                en: "My profile"
            },
            editUserProfile: {
                nl: "Profiel bewerken",
                en: "Edit profile"
            },
        },
        registerpage:     {
            formText:          {
                nl: "Creeër een profiel",
                en: "Create an profile"
            },
            formSubText:       {
                nl: "En vind een vakantie maatje",
                en: "And find a vacation buddy"
            },
            formButton:        {
                nl: "Creeër een profiel",
                en: "Create an account"
            },
            formRecover:       {
                nl: "Al een profiel gemaakt?",
                en: "Already have an profile?"
            },
            formRecoverButton: {
                nl: "inloggen",
                en: "login"
            },
        },
        profileoverview:  {
            feelingLuckyButton: {
                nl: "Ik doe een gok <i class=\"far fa-hand-point-right\"></i>",
                en: "I'm feeling lucky <i class=\"far fa-hand-point-right\"></i>"
            },
            searchButton:       {
                nl: "Zoeken",
                en: "Search"
            },
            filterButton:       {
                nl: "verfijn op interesses",
                en: "Filter on interests"
            },
        },
        profiledetail:    {
            favoriteVacations: {
                nl: "<i class=\"material-icons text-info mr-2\">Favorieten</i>Vakanties",
                en: "<i class=\"material-icons text-info mr-2\">Favorite</i>Vacations"
            },
            favoriteHobbies:   {
                nl: "<i class=\"material-icons text-info mr-2\">Favorieten</i>Hobby's",
                en: "<i class=\"material-icons text-info mr-2\">Favorite</i>Hobbies"
            },
            messages:          {
                nl: "<i class=\"material-icons text-info mr-2\">Berichten</i>Oproepen",
                en: "<i class=\"material-icons text-info mr-2\">Messages</i>Calls"
            },
            call:              {
                nl: "Bellen <i class=\"fas fa-phone\"></i>",
                en: "Call <i class=\"fas fa-phone\"></i>"
            },
            mail:              {
                nl: "Mailen <i class=\"fas fa-envelope\"></i>",
                en: "Mail <i class=\"fas fa-envelope\"></i>"
            },
        },
        useredit:         {
            doneButton:     {
                nl: "Klaar <i class=\"fas fa-check\"></i>",
                en: "Done <i class=\"fas fa-check\"></i>"
            },
            inputFirstName: {
                nl: "Voornaam",
                en: "Firstname"
            },
            inputLastName:  {
                nl: "Achternaam",
                en: "Lastname"
            },
            inputEmail:     {
                nl: "Email",
                en: "Email"
            },
            inputMobile:    {
                nl: "Mobiel",
                en: "Mobile"
            },
            inputAddress:   {
                nl: "Adres",
                en: "Address"
            },
        },
        notificationpage: {
            title: {
                nl: "Notificaties",
                en: "Notifications"
            }
        },
        userfriends:      {
            title: {
                nl: "Vrienden",
                en: "Friends"
            }
        },
        loremipsum:       {
            nl: "is handig om te gebruiken als plaatsvervanger",
            en: "is nice for to use as a placeholder"
        }
    };

    FYSCloud.Localization.setTranslations(translations);
    FYSCloud.Localization.switchLanguage(initialLanguage);

    $("#localizationLanguageSwitch").val(initialLanguage);

    $("#localizationLanguageSwitch").on("change", function () {
        FYSCloud.Localization.switchLanguage($(this).val());

        localStorage.setItem('FYSlang', $(this).val());
    });

    $("#localizationDynamicClick").on("click", function () {
        var template = $("#localizationDynamicTemplate").html();

        var element = $(template);

        $(".localizationSubheaderTarget").append(element);

        FYSCloud.Localization.translate();
    });
    /*
     * END: Translation section
     */

    /**
     * User section
     *
     * This section contains the eventlisteners that will be handling user actions like editing profile and logging in and registration.
     */


    /*
     * Initializing User class and it's operations
     */
    var user = new User();


    /**
     * Login button event listener
     */
    $("#login-button").click(function (e) {
        e.preventDefault();

        var data = $('#login-form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        console.log(data);


        window.location.href = "./profileOverview.html";
    });

    /**
     * Register button event listener
     */
    $("#register-button").click(function (e) {
        e.preventDefault();

        var data = $('#register-form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        console.log(data);


        window.location.href = "./profileOverview.html";

    });


    /**
     * Logout button event listener
     */
    $("#logout-button").click(function (e) {
        e.preventDefault();

        //actions
        console.log("Logging out")

        // window.location.href = "./index.html";

    });

    /**
     * END: User section
     */


    /**
     * Alert for functionalities for which u need to be friends.
     */
    $(".friend-required-alert").click(function () {

        toastr.options = {
            "closeButton":       false,
            "debug":             false,
            "newestOnTop":       false,
            "progressBar":       false,
            "positionClass":     "toast-top-right",
            "preventDuplicates": false,
            "onclick":           null,
            "showDuration":      "300",
            "hideDuration":      "1000",
            "timeOut":           "5000",
            "extendedTimeOut":   "1000",
            "showEasing":        "swing",
            "hideEasing":        "linear",
            "showMethod":        "fadeIn",
            "hideMethod":        "fadeOut"
        };

        toastr.info('U moet eerst vrienden zijn voor dit');
    });

    /**
     * Alert to give user feedback when friend request is send.
     */
    $(".friend-request-alert").on("click", function () {

        console.log("test");

        toastr.options = {
            "closeButton":       false,
            "debug":             false,
            "newestOnTop":       false,
            "progressBar":       false,
            "positionClass":     "toast-top-right",
            "preventDuplicates": false,
            "onclick":           null,
            "showDuration":      "300",
            "hideDuration":      "1000",
            "timeOut":           "5000",
            "extendedTimeOut":   "1000",
            "showEasing":        "swing",
            "hideEasing":        "linear",
            "showMethod":        "fadeIn",
            "hideMethod":        "fadeOut"
        };

        toastr.success('Vriendschapverzoek verstuurd!');
    });


    /**
     * Displays the users friendlist
     */
    $('.show-friends-button').on('click', function () {
        console.log("werkt");

        var friendList = $('.friendlist');
        var friendListOverlay = $('.page-overlay');

        friendList.toggleClass("show");
        friendListOverlay.toggleClass("hide-overlay");
    });


    /**
     * Friendlist page overlay is clickable
     */
    $('.page-overlay').on('click', function () {
        var friendList = $('.friendlist');
        var friendListOverlay = $('.page-overlay');

        friendList.toggleClass("show");
        friendListOverlay.toggleClass("hide-overlay");
    });
});
