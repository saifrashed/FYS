$(document).ready(function () {


// include database class
    var database = new Database("https://api.fys.cloud", "fys_is106_5.Pk9ggWAU7qg9EXTv", "fys_is106_5", "mockup");

// versturen van emails
// database.sendMail('Het werkt', 'Saif', 'saifeddinerashed@icloud.com');

// vertaling
    var initialLanguage = window.navigator.userLanguage || window.navigator.language || 'en';

    var translations = {
        header:     {
            homepage:    {
                nl: "Home <i class=\"fas fa-home\"></i>",
                en: "Home <i class=\"fas fa-home\"></i>"
            },
            profile:    {
                nl: "Profiel <i class=\"fas fa-user\"></i>",
                en: "Profile <i class=\"fas fa-user\"></i>"
            },
            notifications:    {
                nl: "Notificaties <i class=\"fas fa-bell\"></i>",
                en: "Notifications <i class=\"fas fa-bell\"></i>"
            },
            logout:    {
                nl: "Uitloggen <i class=\"fas fa-sign-out-alt\"></i>",
                en: "Logout <i class=\"fas fa-sign-out-alt\"></i>"
            },
        },
        homepage:   {
            header: {
                nl: "Vind jou vakantie buddy! En snel ook...",
                en: "Find your vacation buddy! And fast..."
            },
            button:    {
                nl: "Klik mij!",
                en: "Click me!"
            }
        },
        loremipsum: {
            nl: "is handig om te gebruiken als plaatsvervanger",
            en: "is nice for to use as a placeholder"
        }
    };

    FYSCloud.Localization.setTranslations(translations);
    FYSCloud.Localization.switchLanguage(initialLanguage);

    $("#localizationLanguageSwitch").val(initialLanguage);

    $("#localizationLanguageSwitch").on("change", function () {
        FYSCloud.Localization.switchLanguage($(this).val());
    });

    $("#localizationDynamicClick").on("click", function () {
        var template = $("#localizationDynamicTemplate").html();

        var element = $(template);

        $(".localizationSubheaderTarget").append(element);

        FYSCloud.Localization.translate();
    });


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
});
