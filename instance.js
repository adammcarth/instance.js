/*!
  instance.js v1.0.0: A lightweight javascript library to model data on the client side
  before sending it off to the server.
  Created by @adammcarth under the MIT license
*/

(function (window) {
    // The main instance function takes an object with options
    // specific to the temporary model.
    var Instance = function( options ) {
        // These options are set using `this.<option>` so that the values
        // can be accessed inside the various prototype functions hereinafter.
        //
        // First, add the default attributes to this instance's attributes variable,
        // and they will be overidden if specified again later.
        this.attributes = {};
        if ( options.defaults ) {
            this.defaults = options.defaults;
            // "Copies" `this.defaults` to the instance's attributes
            this.attributes = Object.create( this.defaults );
        }
        // Set a custom variable name that the parameters get sent under
        // eg - ({name: "comment"}); >> { "comment": { message: "Hello, world!" } }
        this.name         = options.name;
        // Url to send the instance, eg - "/new_comment"
        this.url          = options.url;
        // Ajax request method, eg - "post", "get" or "put"
        this.method       = options.method;
        // Http headers to be sent with the request
        this.headers      = options.headers;
        // Set the CB Function if the instance sends successfully
        this.success      = options.success;
        // Set the CB Function if the instance fails to send
        this.error        = options.error;

        // Define some internal variables
        this.fields = [];
        this.elements = [];
    };

    /**
     * Adds attributes to the Instance attributes.
     * 
     * @param {Object} attributes The attributes to add.
     * 
     * @returns {undefined}
     */
    Instance.prototype.add = function( attributes ) {
        var value;

        // Loop through each attribute specified (as `attr`).
        for ( var attr in attributes ) {
            if ( attributes.hasOwnProperty( attr ) ) {
                // Get the value of the current attribute in the loop
                 value = attributes[attr];

                // Append the new attribute to the instance's attributes object variable (this.attributes).
                // eg:
                // this.attributes = {name: "Adam"}
                // this.attributes["handle"] = "@adammcarth"
                // => {name: "Adam", handle: "@adammcarth"}
                this.attributes[attr] = value;
            }
        }
    };

    /**
     * Converts a string into an array element and returns it.
     * 
     * @param {String|Array} input Check to make sure this is an array.
     * 
     * @returns {Array}
     */
    function ensureArray( input ) {
        var toArray = [];

        // Check if the `input` argument is a string
        if ( typeof input === "string" ) {
          // Convert it to an array so it can be used in a forEach loop below
           return toArray.concat( input );
        }

        return input;
    }

    /**
     * Watches html input form elements and continuously updates instance attributes with their current value.
     * 
     * @param {Array} names An array of form element to watch.
     * 
     * @returns {undefined}
     */
    Instance.prototype.addField = function( names ) {
        // Convert `names` to an array if it is a string
        names = ensureArray( names );

        // Add the field names to the instance's fields variable, and
        // we'll use it later to retrieve the latest values from the inputs.
        this.fields = this.fields.concat( names );
    };

    /**
     * Watches html elements (using their #) and continuously updates intance attributes with their current value.
     * 
     * @param {Array} ids An array of form element id's to watch.
     * 
     * @returns {undefined}
     */
    Instance.prototype.addElement = function( ids ) {
        // Convert `ids` to an array if it is a string
        ids = ensureArray( ids );

        // Add the element id's to the instance's elements variable, and
        // we'll use it later to retrieve the latest html content from the elements.
        this.elements = this.elements.concat( ids );
    };

    /**
     * Gets the value of a single attribute in the instance.
     * 
     * @param {string} attr The attribute to get.
     * 
     * @returns {Object}
     */
    Instance.prototype.get = function( attr ) {
        var input,
            element;

        // Add the latest values of any HTML INPUT FIELDS specified
        // to the instance's attributes
        this.fields.forEach( function( name ) {
            // Get the first input with name="<name>"
            input = document.getElementsByName( name )[0];
            // Add the value of the field to an instance attribute
            if ( input === undefined || input.value === "" ) {
                this.attributes[name] = undefined;
            } else {
                this.attributes[name] = input.value;
            }
        }, this);

        // Add the latest html content from any HTML ELEMENTS specified
        // to the instance's attributes
        this.elements.forEach( function( id ) {
            // Get the first element with id="<id>"
            element = document.getElementById( id );
            // Add the contents of the element to an instance attribute
            if ( element === null || element.innerHTML === "" ) {
                this.attributes[id] = undefined;
            } else {
                this.attributes[id] = element.innerHTML;
            }
        }, this);

        // Firstly check to see if the attribute argument has be passed to the function.
        if ( attr ) {
            // If it is, we'll find and display the attribute from the instance's attributes.
            return this.attributes[attr];
        } else {
            // If getAttr() is called with no argument, we'll show all the attributes
            // associated with the instance.
            return this.attributes;
        }
    };

    /**
     * Deletes attributes from the instance.
     * 
     * @param {Array|String} attributes An array or string which details the attributes to remove.
     * 
     * @returns {undefined}
     */
    Instance.prototype.remove = function( attributes ) {
        // Check if the `attributes` argument is a string
        if ( typeof attributes === "string" ) {
            // Convert it to an array so it can be used in a forEach loop below
            attributes = [].concat( attributes );
        }

        // Loop through each attribute as `attr`
        attributes.forEach( function( attr ) {
            delete this.attributes[attr];
        }, this);
    };

    /**
     * Resets the instance to it's default attributes (removing everything else).
     * 
     * @returns {undefined}
     */
    Instance.prototype.reset = function() {
        // Reset the instance attributes to an empty object
        this.attributes = {};
        if ( this.defaults ) {
            // Since there were default attributes specified, reinstate them.
            this.attributes = this.defaults;
        }
    };

    /**
     * Completely wipes the instance's attributes, including it's defaults.
     * 
     * @returns {undefined}
     */
    Instance.prototype.clear = function() {
        // Reset the instance attributes to an empty object
        this.attributes = {};
    };

    /**
     * Sends the instance's attributes off as parameters the the specified URL on the server.
     * 
     * @param {string} url The URL to to send the attributes.
     * @param {string} method The HTTP method to use.
     * 
     * @returns {undefined}
     */
    Instance.prototype.send = function( url, method ) {
        // A handler to react to the server's response
        var self = this,
            xhr = new XMLHttpRequest(),
            parameters = "",
            param_value = "";

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
        for ( var param in this.get() ) {
            if ( this.get().hasOwnProperty( param ) ) {
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
            }
        }

        // Add params to URL if request is GET
        if ( method === "GET" ) {
            url = url + "?" + parameters;
        }

        // Set necassary headers
        xhr.open( method, url, true );
        xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );

        // Set custom request headers (if required)
        if ( this.headers ) {
            // Loop through each custom header as `header`
            for ( var header in this.headers ) {
                if ( this.headers.hasOwnProperty( header ) ) {
                  xhr.setRequestHeader( header, this.headers[header] );
                }
            }
        }

        // Finally, send the request (with params) off to the server and wait for a response
        xhr.send( parameters );
    };
    
    window.Instance = Instance;
})(window);