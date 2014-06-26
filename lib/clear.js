/**
 * Completely wipes the instance's attributes, including it's defaults.
 *
 * @returns {undefined}
 */
Instance.prototype.clear = function() {
    // Reset the instance attributes to an empty object
    this.attributes = {};
};