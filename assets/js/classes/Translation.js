/**
 * Connects to the Cloud Database and offers user translation options.
 */
class Translation {

    initialLanguage = localStorage.getItem('FYSlang') || 'en';
    translations = {
        header: {

            homepage: {
                nl: "Home <i class=\"fas fa-home\"></i>",
                en: "Home <i class=\"fas fa-home\"></i>",
                de: "Home <i class=\"fas fa-home\"></i>"

            },
            profile: {
                nl: "Profiel <i class=\"fas fa-user\"></i>",
                en: "Profile <i class=\"fas fa-user\"></i>",
                de: "Profil <i class=\"fas fa-user\"></i>"

            },
            notifications: {
                nl: "Notificaties <i class=\"fas fa-bell\"></i><div id=\"notificationCounter\"></div>",
                en: "Notifications <i class=\"fas fa-bell\"></i><div id=\"notificationCounter\"></div>",
                de: "Benachrichtigungen <i class=\"fas fa-bell\"></i><div id=\"notificationCounter\"></div>"

            },
            logout: {
                nl: "Uitloggen <i class=\"fas fa-sign-out-alt\"></i>",
                en: "Logout <i class=\"fas fa-sign-out-alt\"></i>",
                de: "Ausloggen <i class=\"fas fa-sign-out-alt\"></i>",

            },
            login: {
                nl: "Inloggen",
                en: "Login",
                de: "Anmeldung"
            },
            register: {
                nl: "Registreren",
                en: "Registration",
                de: "Registrieren"
            },
        },
        footer: {
            copyright: {
                nl: "Corendon © Gegarandeerd veilig boeken want Corendon is aangesloten bij het ANVR, SGR en Calamiteitenfonds.",
                en: "Corendon © Guaranteed safe booking because Corendon is affiliated with the ANVR, SGR and Calamiteitenfonds.",
                de: "Corendon © Garantierte sichere Buchung, da Corendon mit dem ANVR, SGR und Calamity Fund verbunden ist."

            }
        },
        homepage: {
            headerText: {
                nl: "Vind jou vakantie maatje!",
                en: "Find your vacation buddy!",
                de: "Finden Sie Ihren Urlaubskumpel"
            },
            headerSubText: {
                nl: "En snel ook...",
                en: "And fast...",
                de: "unt schnell auch..."
            },
            headerButton: {
                nl: "Creeër een profiel",
                en: "Create an profile",
                de: "Erstelle ein profil"
            },
            headingOne: {
                nl: "Registreer",
                en: "Registration",
                de: "Registrieren"
            },
            headingOneContent: {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                de: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."

            },
            headingTwo: {
                nl: "Personaliseer",
                en: "Personalize",
                de: "Personifizieren"
            },
            headingTwoContent: {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                de: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."

            },
            headingThree: {
                nl: "Ontdek meer",
                en: "Discover more",
                de: "Entcecke mehr"
            },
            headingThreeContent: {
                nl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                en: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.",
                de: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati."

            }
        },
        breadcrumbs: {
            home: {
                nl: "Home",
                en: "Home",
                de: "Home"
            },
            profileList: {
                nl: "Profieloverzicht",
                en: "Profilelist",
                de: "Profilübersicht"
            },
            userProfile: {
                nl: "Mijn profiel",
                en: "My profile",
                de: "Mein profil"
            },
            editUserProfile: {
                nl: "Profiel bewerken",
                en: "Edit profile",
                de: "Profil bearbeiten"
            },
        },
        registerpage: {
            formText: {
                nl: "Creeër een profiel",
                en: "Create an profile",
                de: "Erstelle ein Profil"
            },
            formSubText: {
                nl: "En vind een vakantie maatje",
                en: "And find a vacation buddy",
                de: "Und finde einen Urlaubskumpel"
            },
            formButton: {
                nl: "Creeër een profiel",
                en: "Create an account",
                de: "Erstelle ein Profil"
            },
            formRecover: {
                nl: "Al een profiel gemaakt?",
                en: "Already have an profile?",
                de: "Schon ein Profil erstellt?"
            },
            formRecoverButton: {
                nl: "inloggen",
                en: "login",
                de: "anmeldung"
            },
        },
        profileoverview: {
            feelingLuckyButton: {
                nl: "Ik doe een gok <i class=\"far fa-hand-point-right\"></i>",
                en: "I'm feeling lucky <i class=\"far fa-hand-point-right\"></i>",
                de: "Ich fühle mich glücklich <i class=\"far fa-hand-point-right\"></i>"
            },
            searchButton: {
                nl: "Zoeken",
                en: "Search",
                de: "Suche"
            },
            filterButton: {
                nl: "Verfijn op interesses",
                en: "Filter on interests",
                de: "Durch Interessen verfeinern"
            },
        },
        profiledetail: {
            favoriteVacations: {
                nl: "<i class=\"material-icons text-info mr-2\">Favorieten</i>Vakanties",
                en: "<i class=\"material-icons text-info mr-2\">Favorite</i>Vacations",
                de: "<i class=\"material-icons text-info mr-2\">Favoriten</i>Ferien"

            },
            favoriteHobbies: {
                nl: "<i class=\"material-icons text-info mr-2\">Favorieten</i>Hobby's",
                en: "<i class=\"material-icons text-info mr-2\">Favorite</i>Hobbies",
                de: "<i class=\"material-icons text-info mr-2\">Favoriten</i>Hobbys"
            },
            messages: {
                nl: "<i class=\"material-icons text-info mr-2\">Berichten</i>Oproepen",
                en: "<i class=\"material-icons text-info mr-2\">Messages</i>Calls",
                de: "<i class=\"material-icons text-info mr-2\">Mitteilungen</i>Anrufe"
            },
            bio: {
                nl: "<i class=\"material-icons text-info mr-2\">Bio</i>Beschrijving",
                en: "<i class=\"material-icons text-info mr-2\">Bio</i>Description",
                de: "<i class=\"material-icons text-info mr-2\">Bio</i>Beschreibung"
            },
            call: {
                nl: "Bellen <i class=\"fas fa-phone\"></i>",
                en: "Call <i class=\"fas fa-phone\"></i>",
                de: "Wählen <i class=\"fas fa-phone\"></i>"
            },
            mail: {
                nl: "Mailen <i class=\"fas fa-envelope\"></i>",
                en: "Mail <i class=\"fas fa-envelope\"></i>",
                de: "Mail <i class=\"fas fa-envelope\"></i>"
            },
        },
        useredit: {
            doneButton: {
                nl: "Klaar <i class=\"fas fa-check\"></i>",
                en: "Done <i class=\"fas fa-check\"></i>",
                de: "Bereit <i class=\"fas fa-check\"></i>"
            },
            inputFirstName: {
                nl: "Voornaam",
                en: "Firstname",
                de: "Vorname"
            },
            inputLastName: {
                nl: "Achternaam",
                en: "Lastname",
                de: "Nachname"
            },
            inputEmail: {
                nl: "Email",
                en: "Email",
                de: "Email"
            },
            inputMobile: {
                nl: "Mobiel",
                en: "Mobile",
                de: "Mobiltelefon"
            },
            inputResidence: {
                nl: "Adres",
                en: "Address",
                de: "Adresse"

            },
            inputBio: {
                nl: "Bio",
                en: "Bio",
                de: "Bio"
            }
        },
        notificationpage: {
            title: {
                nl: "Notificaties",
                en: "Notifications",
                de: "Benachrichtigungen"
            }
        },
        userfriends: {
            title: {
                nl: "Vrienden",
                en: "Friends",
                de: "Freunde"
            }
        },
        loremipsum: {
            nl: "is handig om te gebruiken als plaatsvervanger",
            en: "is nice for to use as a placeholder",
            de: "ist bequem als erastz zu verwenden"

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
