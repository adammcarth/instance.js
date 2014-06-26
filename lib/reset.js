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