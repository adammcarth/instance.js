/**
 * Deletes attributes from the instance.
 *
 * @param {Array|String} attributes An array or string which details the attributes to remove.
 *
 * @returns {undefined}
 */
Instance.prototype.remove = function( attributes ) {
    // Covert the `attributes` argument to an array if it is a string
    attributes = ensureArray( attributes );

    // Add the attributes to be removed to the removeQueue
    this.removeQueue = this.removeQueue.concat( attributes );
};