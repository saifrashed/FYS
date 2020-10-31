/*
Includes all js where src is includes
 */

var scripts = [
    "https://code.jquery.com/jquery-3.5.1.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js",
    "assets/js/toastr.min.js",
    "https://cdn.fys.cloud/fyscloud/0.0.3/fyscloud.bundle.min.js",
    "assets/js/classes/database.js"
];

document.addEventListener('DOMContentLoaded', function(event) {
    for(var i = 0; i < scripts.length; i++) {
        var script = document.createElement('script');
        script.onload = function () {
            console.log("script loaded")
        };
        script.src = scripts[i];

        document.head.appendChild(script); //or something of the likes
    }
});

