## instance.js Validations

Validation of data before it is sent to the server will be added in the model, and currently takes the form...

```javascript
validations: {
    name: {
        presence: {
            value: true,
            pass: function() {
                $("#name").highlightGreen();
            },
            fail: function() {
                $("#name").highlightRed();
                alert("Please enter your name.")
            }
        },

        min_length: {
            value: 2
        },

        max_length: {
            value: 26
        }
    },
},

before_validation: {

},

after_validation: {

},

validation_failed: {

},

validation_passed: {

}
```
