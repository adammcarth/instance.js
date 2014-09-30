var Comment = new Instance({
    name: "comment",
    url: "/comments/new",
    method: "get",
    defaults: {
        subscribe_to_thread: false,
        last_page: "http://github.com/adammcarth/instance.js"
    },
    headers: {
        "My-Custom-Header": "value"
    },
    success: function(response) {
        alert("Yay, we did it!");
    },
    error: function(status, response) {
        alert("Darn it! It failed.");
    },
    validations: {
        name: {
            validation_failed: {
                $("#name").focus();
            }
            presence: [true, function() {
                popup_alert("You must give us your name.");
            }],
            length: 15,
            min_length: 8,
            max_length: 30,
            numeric: true,
            alphabetic: true,
            alphanumeric: true,
            require: ["@"],
            exclude: [["lame", "looser", "jessies girl"], function() {
                popup_alert("Those words are not allowed in your name.");
            }],
            starts_with: "Ad",
            ends_with: "am",
            email: false,
            custom: /^[a-z]/
        }
    }
});