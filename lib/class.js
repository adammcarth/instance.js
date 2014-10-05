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
    // Validation rules
    this.validations  = options.validations;
    // Callback functions
    this.success      = options.success;
    this.error        = options.error;
    this.before_send  = options.before_send;
    this.after_send   = options.after_send;
    this.before_validation = options.before_validation;
    this.after_validation  = options.after_validation;
    this.validation_failed = options.validation_failed;
    this.validation_passed = options.validation_passed;

    // Define some internal variables
    this.fields = [];
    this.elements = [];
    this.removeQueue = [];
};