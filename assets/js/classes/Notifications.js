/**
 * Shows notification options
 */
class Notifications {
    constructor() {
        console.log("Notification class loaded: true");
    }


    /**
     * Adds a notification
     * @param userID
     * @param title
     * @param content
     * @param disclaimer
     * @returns {Promise<void>}
     */
    async addNotification(userID, title, content, disclaimer, type = "default", target = null) {
        try {
            return await FYSCloud.API.queryDatabase("INSERT INTO notifications (userID, title, content, disclaimer, type, target) VALUES (?, ?, ?, ?, ?, ?)",
                [userID, title, content, disclaimer, type, target]);
        } catch (e) {
            console.log(e);
        }
    };

    /**
     * Gets all notifications
     * @param userID
     * @returns {Promise<void>}
     */
    async getNotifications(userID) {
        try {
            return await FYSCloud.API.queryDatabase("SELECT notificationID, title, content, disclaimer, type, target FROM users NATURAL JOIN notifications WHERE userID=?", [userID]);
        } catch (e) {
            console.log(e);
        }
    };

    /**
     * Deletes a notification
     * @param notificationID
     * @returns {Promise<void>}
     */
    async deleteNotification(notificationID) {
        try {
            return await FYSCloud.API.queryDatabase("DELETE FROM notifications WHERE notificationID= ?", [notificationID]);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Info Toast
     * @param message
     */
    info(message) {
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

        toastr.info(message);
    }

    /**
     * Success Toast
     * @param message
     */
    success(message) {
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

        toastr.success(message);
    }

    warning(message) {
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

        toastr.warning(message);
    }

    error(message) {
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

        toastr.error(message);
    }

}
