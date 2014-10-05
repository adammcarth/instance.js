module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            options: {
                banner:
                    "/*!\n" +
                    "  <%= pkg.name %> v<%= pkg.version %>: A lightweight javascript library to model data on the client side\n" +
                    "  before sending it off to the server.\n" +
                    "  Created by @adammcarth under the MIT license\n" +
                    "*/\n"
            },

            build: {
                files: {
                    "latest_version/instance-<%= pkg.version %>.min.js": [
                        "lib/class.js",
                        "lib/helpers.js",
                        "lib/add.js",
                        "lib/get.js",
                        "lib/remove.js",
                        "lib/reset.js",
                        "lib/clear.js",
                        "lib/validations/methods.js",
                        "lib/validations/validate.js",
                        "lib/send.js"
                    ]
                }
            },
        },

        jshint: {
            options: {
                jshintrc: true
            },

            files: ["lib/*.js"]
        }

    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("default", ["jshint", "uglify"]);
}