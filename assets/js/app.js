$(function() {
    $("#klikmij-button").on("click", function() {
       $("#klikmij-toggle").toggle();
    });

    $("#klikmij-toggle img").on("click", function() {
        alert($(this).attr("alt"));
    })
});