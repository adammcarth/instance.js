/**
 * Adds parameters to the Instance's attributes.
 *
 * @param {Object} attributes The attributes to add.
 *
 * @returns {undefined}
 */
Instance.prototype.add = function( attributes ) {
    // Loop through each attribute specified (as `attr`).
    Object.keys(attributes).forEach(function (attr) {
        // Append the new attribute to the instance's attributes object variable (this.attributes).
        // eg:
        // this.attributes = {name: "Adam"}
        // this.attributes["handle"] = "@adammcarth"
        // => {name: "Adam", handle: "@adammcarth"}
        this.attributes[attr] = attributes[attr];
    }, this);
};

/**
 * Watches html input form elements and continuously updates instance attributes with their current value.
 *
 * @param {Array} names An array of form element to watch.
 *
 * @returns {undefined}
 */
Instance.prototype.addField = function( names ) {
    // Convert `names` to an array if it is a string
    names = this.ensureArray( names );

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
    ids = this.ensureArray( ids );

    // Add the element id's to the instance's elements variable, and
    // we'll use it later to retrieve the latest html content from the elements.
    this.elements = this.elements.concat( ids );
};