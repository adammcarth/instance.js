/**
 * Converts a string into an array element and returns it.
 *
 * @param {String|Array} input Check to make sure this is an array.
 *
 * @returns {Array}
 */
Instance.prototype.ensureArray = function( input ) {
    var toArray = [];

    // Check if the `input` argument is a string
    if ( typeof input === "string" ) {
      // Convert it to an array so it can be used in a forEach loop below
       return toArray.concat( input );
    }

    return input;
};

/**
 * Function to remove values from arrays
 *
 * @param {Array} this.elements or this.fields
 *
 * @returns {undefined}
 */
Array.prototype.removeByValue = function( val ) {
    for ( var i=0; i < this.length; i++ ) {
        if ( this[i] == val ) {
            this.splice( i, 1 );
            break;
        }
    }
};