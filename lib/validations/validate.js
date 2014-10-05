/**
 * Validates the data if necassary using validations helpers found in /validations/methods.js
 *
 * @returns {true||false} (true if validation passed, false if not)
 */
Instance.prototype.validate = function() {
    var validations = this.validations;
    var validation_callback_queue = [];

    if ( validations ) {
        // Before validation callback
        if ( this.before_validation ) {
            this.before_validation();
        }

        // Validation hasn't failed yet (used on ln. 51)
        var validation_failed = false;

        // Iterate through each set of validation rules for a specific `attribute` to validate
        Object.keys( validations ).forEach(function( attribute ) {
            // Test each validation rule specified against the attribute
            Object.keys( validations[attribute] ).forEach(function( rule ) {
                var fail_callback = validations[attribute][rule].fail;
                var pass_callback = validations[attribute][rule].pass;

                // Don't validate if it can be blank!
                if ( this.get(attribute) === undefined && validations[attribute].allow_blank === true ) {
                    // add the pass callback function if it exists
                    if ( pass_callback && validations[attribute].no_blank_callback !== true ) {
                        validation_callback_queue.push( pass_callback );
                    }
                } else {
                    // Don't validate a rule other than presence if the attribute's empty
                    if ( this.get(attribute) === undefined && rule != "presence" ) {
                        test = false;
                    } else {
                        var test = window["validates_instance_" + rule]( validations[attribute][rule].value, this.get(attribute) );

                        // Adds the appropriate callback function (if one was specified) to the queue
                        // If the test failed?
                        if ( test === false ) {
                            validation_failed = true;
                            if ( fail_callback ) { validation_callback_queue.push( fail_callback ); }
                        // The test passed!
                        } else {
                            if ( pass_callback ) { validation_callback_queue.push( pass_callback ); }
                        }
                    }
                }
            }, this);
        }, this);

        // Validation failed callback
        if ( validation_failed === true ) {
            if ( this.validation_failed ) {
                this.validation_failed();
            }
        }

        // Validation passed callback
        if ( validation_failed === false ) {
            if ( this.validation_passed ) {
                this.validation_passed();
            }
        }

        // Individual rule callbacks from the queue
        if ( validation_callback_queue ) {
            for ( var i = 0; i < validation_callback_queue.length; i++ ) {
                // Execute the callback functions for each rule
                validation_callback_queue[i]();
            }
            // Clear the queue
            validation_callback_queue = {};
        }

        // After validation callback
        if ( this.after_validation ) {
            this.after_validation();
        }

        // Return values for the send module to proceed
        if ( validation_failed === true ) {
            return false; // Stop the instance from sending to the server!
        } else {
            return true;
        }
    }
};