$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();



    /**
     * Alert for functionalities for which u need to be friends.
     */
    $(".friend-required-alert").click(function () {

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr.info('U moet eerst vrienden zijn voor dit');
    });

    /**
     * Alert to give user feedback when friend request is send.
     */
    $(".friend-request-alert").click(function () {

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr.success('Vriendschapverzoek verstuurd!');
    });


    $('.items').slick({
        dots:           true,
        infinite:       true,
        speed:          800,
        autoplay:       true,
        autoplaySpeed:  2000,
        slidesToShow:   4,
        slidesToScroll: 4,
        responsive:     [
            {
                breakpoint: 1024,
                settings:   {
                    slidesToShow:   3,
                    slidesToScroll: 3,
                    infinite:       true,
                    dots:           true
                }
            },
            {
                breakpoint: 600,
                settings:   {
                    slidesToShow:   2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings:   {
                    slidesToShow:   1,
                    slidesToScroll: 1
                }
            }

        ]
    });
});
