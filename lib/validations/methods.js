// Validation methods used by the instance.js built in client side validator.
// If the validation passes, the function should return true; otherwise it
// should return false. The input is expected to be a string.

// Existence of an input
function validates_instance_presence( type, attr ) {
    if ( attr === undefined || attr === null || attr === "" || attr === 0 || attr === "0" ) {
        var presence = false;
    } else {
        var presence = true;
    }

    if ( type === true && presence === true ) {
        return true;
    } else if ( type === false && presence === false ) {
        return true;
    } else {
        return false;
    }
}

// Must be x characters long
function validates_instance_length( size, attr ) {
    if ( attr.length !== size ) {
        return false;
    } else {
        return true;
    }
}

// Must be LESS THAN x characters long
function validates_instance_max_length( size, attr ) {
    if ( attr.length > size ) {
        return false;
    } else {
        return true;
    }
}

// Must be MORE THAN x characters long
function validates_instance_min_length( size, attr ) {
    if ( attr.length < size ) {
        return false;
    } else {
        return true;
    }
}

// Contains/may not contain numbers
function validates_instance_numeric( type, attr ) {
    if ( /^[0-9. ]*$/g.test(attr) !== true ) {
        var numeric = false;
    } else {
        var numeric = true;
    }

    if ( type === true && numeric === true ) {
        return true;
    } else if ( type === false && numeric === false ) {
        return true;
    } else {
        return false;
    }
}

// Contains/may not contain letters?
function validates_instance_alphabetic( type, attr ) {
    if ( /^[a-zA-Z ]*$/g.test(attr) !== true ) {
        var alphabetic = false;
    } else {
        var alphabetic = true;
    }

    if ( type === true && alphabetic === true ) {
        return true;
    } else if ( type === false && alphabetic === false ) {
        return true;
    } else {
        return false;
    }
}

// Contains/may not contain both letters and numbers.
function validates_instance_alphanumeric( type, attr ) {
    if ( /^[a-zA-Z0-9 ]+$/g.test(attr) !== true ) {
        var alphanumeric = false;
    } else {
        var alphanumeric = true;
    }

    if ( type === true && alphanumeric === true ) {
        return true;
    } else if ( type === false && alphanumeric === false ) {
        return true;
    } else {
        return false;
    }
}

// No spaces allowed in the string
function validates_instance_spaces( type, attr ) {
    if ( /( )/g.test(attr) !== true ) {
        var spaces = false;
    } else {
        var spaces = true;
    }

    if ( type === true && spaces === true ) {
        return true;
    } else if ( type === false && spaces === false ) {
        return true;
    } else {
        return false;
    }
}

// Ensure the input CONTAINS custom characters or phrases...
function validates_instance_must_include( characters, attr ) {
    var regex = new RegExp( characters, "g" );

    if ( regex.test(attr) === false ) {
        return false;
    } else {
        return true;
    }
}

// Ensure the input EXCLUDES custom characters or phrases...
function validates_instance_must_exclude( characters, attr ) {
    var regex = new RegExp( characters, "g" );

    if ( regex.test(attr) ) {
        return false;
    } else {
        return true;
    }
}

// Input starts with x
function validates_instance_starts_with( characters, attr ) {
    var regex = new RegExp("^" + characters);

    if ( regex.test(attr) !== true ) {
        return false;
    } else {
        return true;
    }
}

// Input ends with x
function validates_instance_ends_with( characters, attr ) {
    var regex = new RegExp(characters + "$");

    if ( regex.test(attr) !== true ) {
        return false;
    } else {
        return true;
    }
}

// Validate an email address
function validates_instance_email( type, attr ) {
    if ( /\S+@\S+\.\S+/.test(attr) !== true ) {
        var email = false;
    } else {
        var email = true;
    }

    if ( type === true && email === true ) {
        return true;
    } else if ( type === false && email === false ) {
        return true;
    } else {
        return false;
    }
}

// Validate a custom regex format
function validates_instance_regex( regex, attr ) {
    if ( regex.test(attr) !== true ) {
        return false;
    } else {
        return true;
    }
}

// Validate using a custom URL (external server script)
function validates_instance_url( url, attr ) {
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", url + "?value=" + encodeURIComponent(attr), true );
    xhr.setRequestHeader( "Instance-Validation", attr );
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
            if ( xhr.status !== 200 || xhr.responseText === "false" || xhr.responseText === "0" ) {
                return false;
            } else {
                return true;
            }
        }
    }
    xhr.send();
}