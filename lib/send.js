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