/**
 * Connects to the Cloud Database and offers user translation options.
 */
class Translation {

    initialLanguage = localStorage.getItem('FYSlang') || 'en';
    translations = {
        header: {

            homepage: {
                nl: "Home <i class=\"fas fa-home\"></i>",
                en: "Home <i class=\"fas fa-home\"></i>"
            },
            profile: {
                nl: "Profiel <i class=\"fas fa-user\"></i>",
                en: "Profile <i class=\"fas fa-user\"></i>"
            },
            notifications: {
                nl: "Notificaties <i class=\"fas fa-bell\"></i>",
                en: "Notifications <i class=\"fas fa-bell\"></i>"
            },
            logout: {
                nl: "Uitloggen <i class=\"fas fa-sign-out-alt\"></i>",
                en: "Logout <i class=\"fas fa-sign-out-alt\"></i>"
            },
            login: {
                nl: "Inloggen",
                en: "Login"
            },
            register: {
                nl: "Registreren",
                en: "Registration"
            },
        },
        footer: {
            copyright: {
                nl: "Corendon © Gegarandeerd veilig boeken want Corendon is aangesloten bij het ANVR, SGR en Calamiteitenfonds.",
                en: "Corendon © Guaranteed safe booking because Corendon is affiliated with the ANVR, SGR and Calamiteitenfonds."
            }
        },
        homepage: {
            headerText: {
                nl: "Vind jou vakantie buddy!",
                en: "Find your vacation buddy!"
            },
            headerSubText: {
                nl: "En snel ook...",
                en: "And fast..."
            },
            headerButton: {
                nl: "Creeër een profiel",
                en: "Create an profile"
            },
            headingOne: {
                nl: "Registreer",
                en: "Registration"
            },
            headingOneContent: {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."
            },
            headingTwo: {
                nl: "Personaliseer",
                en: "Personalize"
            },
            headingTwoContent: {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."
            },
            headingThree: {
                nl: "Ontdek meer",
                en: "Discover more"
            },
            headingThreeContent: {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."
            }
        },
        breadcrumbs: {
            home: {
                nl: "Home",
                en: "Home"
            },
            profileList: {
                nl: "Profieloverzicht",
                en: "Profilelist"
            },
            userProfile: {
                nl: "Mijn profiel",
                en: "My profile"
            },
            editUserProfile: {
                nl: "Profiel bewerken",
                en: "Edit profile"
            },
        },
        registerpage: {
            formText: {
                nl: "Creeër een profiel",
                en: "Create an profile"
            },
            formSubText: {
                nl: "En vind een vakantie maatje",
                en: "And find a vacation buddy"
            },
            formButton: {
                nl: "Creeër een profiel",
                en: "Create an account"
            },
            formRecover: {
                nl: "Al een profiel gemaakt?",
                en: "Already have an profile?"
            },
            formRecoverButton: {
                nl: "inloggen",
                en: "login"
            },
        },
        profileoverview: {
            feelingLuckyButton: {
                nl: "Ik doe een gok <i class=\"far fa-hand-point-right\"></i>",
                en: "I'm feeling lucky <i class=\"far fa-hand-point-right\"></i>"
            },
            searchButton: {
                nl: "Zoeken",
                en: "Search"
            },
            filterButton: {
                nl: "verfijn op interesses",
                en: "Filter on interests"
            },
        },
        profiledetail: {
            favoriteVacations: {
                nl: "<i class=\"material-icons text-info mr-2\">Favorieten</i>Vakanties",
                en: "<i class=\"material-icons text-info mr-2\">Favorite</i>Vacations"
            },
            favoriteHobbies: {
                nl: "<i class=\"material-icons text-info mr-2\">Favorieten</i>Hobby's",
                en: "<i class=\"material-icons text-info mr-2\">Favorite</i>Hobbies"
            },
            messages: {
                nl: "<i class=\"material-icons text-info mr-2\">Berichten</i>Oproepen",
                en: "<i class=\"material-icons text-info mr-2\">Messages</i>Calls"
            },
            call: {
                nl: "Bellen <i class=\"fas fa-phone\"></i>",
                en: "Call <i class=\"fas fa-phone\"></i>"
            },
            mail: {
                nl: "Mailen <i class=\"fas fa-envelope\"></i>",
                en: "Mail <i class=\"fas fa-envelope\"></i>"
            },
        },
        useredit: {
            doneButton: {
                nl: "Klaar <i class=\"fas fa-check\"></i>",
                en: "Done <i class=\"fas fa-check\"></i>"
            },
            inputFirstName: {
                nl: "Voornaam",
                en: "Firstname"
            },
            inputLastName: {
                nl: "Achternaam",
                en: "Lastname"
            },
            inputEmail: {
                nl: "Email",
                en: "Email"
            },
            inputMobile: {
                nl: "Mobiel",
                en: "Mobile"
            },
            inputResidence: {
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
        userfriends: {
            title: {
                nl: "Vrienden",
                en: "Friends"
            }
        },
        loremipsum: {
            nl: "is handig om te gebruiken als plaatsvervanger",
            en: "is nice for to use as a placeholder"
        }
    };


    constructor() {
        console.log("Translation class loaded: true");

        FYSCloud.Localization.setTranslations(this.translations);
        FYSCloud.Localization.switchLanguage(this.initialLanguage);

        $("#localizationLanguageSwitch").val(this.initialLanguage);
    }

    /**
     * Switches the sites language and saves it in users local storage
     * @param value
     */
    switchLanguage(value) {
        FYSCloud.Localization.switchLanguage(value);
        localStorage.setItem('FYSlang', value);
    }

    /**
     * Translates the sites text
     */
    translate() {
        var template = $("#localizationDynamicTemplate").html();

        var element = $(template);

        $(".localizationSubheaderTarget").append(element);

        FYSCloud.Localization.translate();
    }

}
