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

    // If there needs to be items removed from the Instance,
    // they will be removed now before displaying the attributes.
    this.removeQueue.forEach( function( attr ) {
        // Remove from the attributes
        delete this.attributes[attr];
        // Remove from the dynamic document element lists
        this.fields.removeByValue( attr );
        this.elements.removeByValue( attr );
    }, this);
    // Reset the queue
    this.removeQueue = [];

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