## instance.js Validations

Validation of data before it is sent to the server will be added in the model, and currently takes the form...

```javascript
<<<<<<< HEAD
Comment.addField([
   "name",
   "email",
   "message"
]);
```

We now have direct access to the values of those fields under the `Comment` namespace. Let's remind our commentee what their name is.

```javascript
var name = Comment.get("name");
=======
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
>>>>>>> FETCH_HEAD

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
<<<<<<< HEAD

#### Dive deeper

There's plenty more functionality to show off, including [default values](https://github.com/adammcarth/instance.js/wiki/Setup-Guide#settings) for parameters, a plethora of settings for `.send()`, [removing of parameters](https://github.com/adammcarth/instance.js/wiki/Remove-Parameters) and [clearing](https://github.com/adammcarth/instance.js/wiki/Reset-Instances) Instances, adding parameters [manually](https://github.com/adammcarth/instance.js/wiki/Add-Parameters#add-attributes-) or from [html elements](https://github.com/adammcarth/instance.js/wiki/Add-Parameters#addelement), and built-in client side validations are on the way.

**TO DO:** Add built in validation methods.

#### [Check Out The instance.js Wiki For All Documentation](https://github.com/adammcarth/instance.js/wiki "See Full Documentation")
#### [Contributing](https://github.com/adammcarth/instance.js/wiki/Contributing)
=======
>>>>>>> FETCH_HEAD
