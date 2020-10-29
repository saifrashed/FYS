$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    

    /**
     * Alert for functionalities for which u need to be friends.
     */
    $(".friend-required-alert").click(function () {
        $('.toast-body').html("U moet eerst vrienden zijn voor dit");
        $('.toast').toast('show');
    });

    /**
     * Alert to give user feedback when friend request is send.
     */
    $(".friend-request-alert").click(function () {
        toastr.success('Have fun storming the castle!')
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


