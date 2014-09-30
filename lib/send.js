/**
 * Sends the instance's attributes off as parameters the the specified URL on the server.
 *
 * @param {string} url The URL to to send the attributes.
 * @param {string} method The HTTP method to use.
 *
 * @returns {undefined}
 */
Instance.prototype.send = function( url, method ) {
    // Validations
    var val = this.validations;
    var val_callback_queue = [];

    if ( val ) {
        var validation_failed = undefined;

        // Iterate through each set of validation rules for a specific `field`
        Object.keys( val ).forEach(function( field ) {
            var field_value = this.get(field);

            ///////////////////////////////////////////////////////////////////////////
            // Execute each individual validation and it's callback if required.
            ///////////////////////////////////////////////////////////////////////////

            // Presence
            if ( val[field]["presence"] ) {
                if ( validate_presence_of(field_value) === false ) {
                    // callback
                    if ( val[field]["presence"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["presence"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Length
            if ( val[field]["length"] ) {
                if ( validate_presence_of(field_value, val[field]["length"]) === false ) {
                    // callback
                    if ( val[field]["length"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["length"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Minimum length
            if ( val[field]["min_length"] ) {
                if ( validate_min_length(field_value, val[field]["min_length"]) === false ) {
                    // callback
                    if ( val[field]["min_length"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["min_length"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Maximum length
            if ( val[field]["max_length"] ) {
                if ( validate_max_length(field_value, val[field]["max_length"]) === false ) {
                    // callback
                    if ( val[field]["max_length"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["max_length"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Numeric
            if ( val[field]["numeric"] ) {
                if ( validate_numeric_input(field_value) === false ) {
                    // callback
                    if ( val[field]["numeric"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["numeric"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Alphabetic
            if ( val[field]["alphabetic"] ) {
                if ( validate_alphabetic_input(field_value) === false ) {
                    // callback
                    if ( val[field]["alphabetic"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["alphabetic"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Alphanumeric
            if ( val[field]["alphanumeric"] ) {
                if ( validate_alphanumeric_input(field_value) === false ) {
                    // callback
                    if ( val[field]["alphanumeric"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["alphanumeric"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Numeric
            if ( val[field]["numeric"] ) {
                if ( validate_numeric_input(field_value) === false ) {
                    // callback
                    if ( val[field]["numeric"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["numeric"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Require certain characters/phrases
            if ( val[field]["require"] ) {
                Object.keys( val[field]["require"] ).forEach(function(required) {
                    if ( validate_characters_required(field_value, required) === false ) {
                        // callback
                        if ( typeof(val[field]["required"][1]) === "function" ) {
                            // add function to the queue
                            val_callback_queue.push(val[field]["required"][1]);
                        }
                        validation_failed = true;
                    }
                });
            }

            // Exclude certain characters/phrases
            if ( val[field]["exclude"] ) {
                Object.keys( val[field]["exclude"] ).forEach(function(excluded) {
                    if ( validate_characters_disallowed(field_value, excluded) === false ) {
                        // callback
                        if ( typeof(val[field]["excluded"][1]) === "function" ) {
                            // add function to the queue
                            val_callback_queue.push(val[field]["excluded"][1]);
                        }
                        validation_failed = true;
                    }
                });
            }

            // Starts with x
            if ( val[field]["starts_with"] ) {
                if ( validate_starts_with(field_value, val[field]["starts_with"]) === false ) {
                    // callback
                    if ( val[field]["starts_with"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["starts_with"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Ends with x
            if ( val[field]["ends_with"] ) {
                if ( validate_ends_with(field_value, val[field]["ends_with"]) === false ) {
                    // callback
                    if ( val[field]["ends_with"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["ends_with"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Email
            if ( val[field]["email"] ) {
                if ( validate_email(field_value) === false ) {
                    // callback
                    if ( val[field]["email"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["email"][1]);
                    }
                    validation_failed = true;
                }
            }

            // Custom regex
            if ( val[field]["custom"] ) {
                if ( validate_custom_regex(field_value, val[field]["custom"]) === false ) {
                    // callback
                    if ( val[field]["custom"] instanceof Array ) {
                        // add function to the queue
                        val_callback_queue.push(val[field]["custom"][1]);
                    }
                    validation_failed = true;
                }
            }
        }, this);

        if ( validation_failed === true ) {
            // Execute the global error callback since validation failed
            if val["validation_failed"] {
                val["validation_failed"];
            }
            // Then execute each specfic callback function for fields that failed validation.
            for ( var i = 0; i < val_callback_queue.length; i++ ) {
                val_callback_queue[i];
            }
            return false;
        }
    }

    // A handler to react to the server's response
    var self = this,
        xhr = new XMLHttpRequest(),
        parameters = "",
        param_value = "",
        attributes = this.get(),
        headers = this.headers;

    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
            if ( xhr.status === 200 ) {
                // Trigger the success callback function
                self.success(this.responseText);
            } else {
                // Trigger the error callback function
                self.error(xhr.status, this.responseText);
            }
        }
    };

    // Define some variables for the request
    method = method || this.method || "POST";
    method = method.toUpperCase();
    url = url || this.url || "./";

    // Turn the instance's attributes a query string of parameters

    // Loop through each attribute as `param`
    Object.keys(this.get()).forEach(function (param) {
        // add a `&` before the next attribute is added
        parameters += "&";

        if ( this.get(param) === undefined ) {
            // Set the value to an empty string (we don't want it to equal "undefined")
            param_value = "";
        } else {
            // Encode the string for URL
            param_value = encodeURIComponent( this.get(param) );
        }

        // If a custom instance name has been specified
        if ( this.name ) {
            // Eg, Instance({ name: "comment" })...
            // comment[name]=Adam,comment[body]=Hello
            parameters += this.name + "[" + param + "]" + "=" + param_value;
        } else {
            // No custom name given, so we'll just pass the parameters on as a single dimension
            // Eg...
            // name=Adam,body=Hello
            parameters += param + "=" + param_value;
        }
    }, this);

    // Add params to URL if request is GET
    if ( method === "GET" ) {
        url = url + "?" + parameters;
    }

    // Set necassary headers
    xhr.open( method, url, true );
    xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );

    // Set custom request headers (if required)
    if ( headers ) {
        Object.keys(headers).forEach(function (header) {
            xhr.setRequestHeader( header, headers[header]);
        });
    }

    // Finally, send the request (with params) off to the server and wait for a response
    xhr.send( parameters );
};