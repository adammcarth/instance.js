/*!
  instance.js v1.0.0: A lightweight javascript library to model data on the client side
  before sending it off to the server.
  Created by @adammcarth under the MIT license
*/

// The main instance function takes an object with options
// specific to the temporary model.
function Instance( options ) {
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

// <***------- Instance().add(); -------***>
// Adds attributes to the instance.
Instance.prototype.add = function( attributes ) {
  // Loop through each attribute specified (as `attr`).
  for ( var attr in attributes ) {
    // Get the value of the current attribute in the loop
    var value = attributes[attr];

    // Append the new attribute to the instance's attributes object variable (this.attributes).
    // eg:
    // this.attributes = {name: "Adam"}
    // this.attributes["handle"] = "@adammcarth"
    // => {name: "Adam", handle: "@adammcarth"}
    this.attributes[attr] = value;
  };
};

// <***------- Instance().addField(); -------***>
// Watches html input form elements and continuously updates instance attributes with their current value.
Instance.prototype.addField = function( names ) {
  // Check if the `names` argument is a string
  if ( typeof names === "string" ) {
    // Convert it to an array so it can be used in a forEach loop below
    names = [].concat( names );
  };

  // Add the field names to the instance's fields variable, and
  // we'll use it later to retrieve the latest values from the inputs.
  this.fields = this.fields.concat( names );
};

// <***------- Instance().addElement(); -------***>
// Watches html elements (using their #) and continuously updates intance attributes with their current value.
Instance.prototype.addElement = function( ids ) {
  // Check if the `id's` argument is a string
  if ( typeof ids === "string" ) {
    // Convert it to an array so it can be used in a forEach loop below
    ids = [].concat( ids );
  };

  // Add the element id's to the instance's elements variable, and
  // we'll use it later to retrieve the latest html content from the elements.
  this.elements = this.elements.concat( ids );
};

// <***------- Instance().get(); -------***>
// Gets the value of a single attribute in the instance.
Instance.prototype.get = function( attr ) {
  // Add the latest values of any HTML INPUT FIELDS specified
  // to the instance's attributes
  this.fields.forEach( function( name ) {
    // Get the first input with name="<name>"
    var input = document.getElementsByName( name )[0];
    // Add the value of the field to an instance attribute
    if ( input === undefined || input.value === "" ) {
      this.attributes[name] = undefined;
    } else {
      this.attributes[name] = input.value;
    };
  }, this);

  // Add the latest html content from any HTML ELEMENTS specified
  // to the instance's attributes
  this.elements.forEach( function( id ) {
    // Get the first element with id="<id>"
    var element = document.getElementById( id );
    // Add the contents of the element to an instance attribute
    if ( element === undefined || element.innerHTML === "" ) {
      this.attributes[id] = undefined;
    } else {
      this.attributes[id] = element.innerHTML;
    };
  }, this);

  // Firstly check to see if the attribute argument has be passed to the function.
  if ( attr ) {
    // If it is, we'll find and display the attribute from the instance's attributes.
    return this.attributes[attr];
  } else {
    // If getAttr() is called with no argument, we'll show all the attributes
    // associated with the instance.
    return this.attributes;
  };
};

// <***------- Instance().remove(); -------***>
// Deletes attributes from the instance.
Instance.prototype.remove = function( attributes ) {
  // Check if the `attributes` argument is a string
  if ( typeof attributes === "string" ) {
    // Convert it to an array so it can be used in a forEach loop below
    attributes = [].concat( attributes );
  };

  // Loop through each attribute as `attr`
  attributes.forEach( function( attr ) {
    delete this.attributes[attr];
  }, this);
};

// <***------- Instance().reset(); -------***>
// Resets the instance to it's default attributes (removing everything else).
Instance.prototype.reset = function() {
  // Reset the instance attributes to an empty object
  this.attributes = {};
  if ( this.defaults ) {
    // Since there were default attributes specified, reinstate them.
    this.attributes = this.defaults;
  };
};

// <***------- Instance().clear(); -------***>
// Completely wipes the instance's attributes, including it's defaults.
Instance.prototype.clear = function() {
  // Reset the instance attributes to an empty object
  this.attributes = {};
};

// <***------- Instance().send(); -------***>
// Sends the instance's attributes off as parameters the the specified URL on the server.
Instance.prototype.send = function( url, method ) {
  // A handler to react to the server's response
  self = this;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if ( xhr.readyState == 4 ) {
      if ( xhr.status == 200 ) {
        // Trigger the success callback function
        self.success(this.responseText);
      } else {
        // Trigger the error callback function
        self.error(xhr.status, this.responseText);
      };
    };
  };

  // Define some variables for the request
  method = method || this.method || "POST";
  method = method.toUpperCase();
  url = url || this.url || "./";

  // Turn the instance's attributes a query string of parameters
  parameters = "";
  // Loop through each attribute as `param`
  for ( var param in this.get() ) {
    // add a `&` before the next attribute is added
    parameters += "&";

    if ( this.get(param) === undefined ) {
      // Set the value to an empty string (we don't want it to equal "undefined")
      param_value = "";
    } else {
      // Encode the string for URL
      param_value = encodeURIComponent( this.get(param) );
    };

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
    };
  };

  // Add params to URL if request is GET
  if ( method === "GET" ) {
    url = url + "?" + parameters;
  };

  // Set necassary headers
  xhr.open( method, url, true );
  xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );

  // Set custom request headers (if required)
  if ( this.headers ) {
    // Loop through each custom header as `header`
    for ( var header in this.headers ) {
      xhr.setRequestHeader( header, this.headers[header] );
    };
  };

  // Finally, send the request (with params) off to the server and wait for a response
  xhr.send( parameters );
};