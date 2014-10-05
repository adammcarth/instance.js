## Front end modeling, made easy. [![Code Climate](https://codeclimate.com/github/adammcarth/instance.js.png)](https://codeclimate.com/github/adammcarth/instance.js)

Instance.js is a lightweight Javascript library that let's you store and manipulate data before sending it off as parameters to the server.

Instance was coded from the ground up using pure Javascript (no dependencies or plugins required), and draws on similar concepts from existing frameworks like *Backbone*.

The library operates purely on the front end level. It won't save or sync your models, but it provides you with a solid interface to create robust user experiences and get data from the user's web browser to your server efficiently. It goes perfectly with an MVC framework such as Rails or Symfony, find out why...

#### Get Started: Define a new instance

The first thing to do is define your first **Instance Model**. An Instance Model is essentially a collection of parameters that are usually obtained from html input fields, such as a comment. You'll also need to include the [latest version](https://github.com/adammcarth/instance.js/tree/master/latest_version) of instance.js in your document.

```html
<head>
   <title>instance.js Demo</title>
   <script type="text/javascript" src="instance.min.js"></script>
</head>
```

```javascript
var Comment = new Instance({
   name: "comment",
   url: "/comments/new",
   success: function() {
      alert("Your comment has been saved!");
   }
});
```
#### Parameters: Add data from a form

Once we have our Instance Model defined, we're free to start playing around with it. Since we're creating a new comment, we'll setup the instance to include the latest values from a form:

```html
<input type="text" name="name">
<input type="text" name="email">
<textarea name="message"></textarea>
```

```javascript
Comment.addField([
   "name",
   "email",
   "message"
]);
```

We now have direct access to the values of those fields under the `Comment` namespace. Let's remind our commentee what their name is.

```javascript
var name = Comment.get("name");

alert("Your name is " + name );
```

#### Add Some Validations [Optional]

If there's no message for the comment, Instance won't send it...

```javascript
var Comment = new Instance({
   validations: {
      message: { // name of the attribute/field
         presence: { // built in validation rule
            value: true,
            fail: function() {
               alert("Please enter your message!");
            }
         }
      }
   } 
});
```

Check out the Wiki for a complete list of all the validation rules available. You can even use your own!

#### Finishing Up: Send the instance to the server

With parameters assigned to our new Instance Model, we can now perform an AJAX request to send them to any route on your server. We used jQuery to handle the click event.

```javascript
$("#submit").click(function() {
   // Fire it off!
   Comment.send();
});
```

#### Time to do your thing

You might recall that [before](#get-started-define-a-new-instance) we specified a `name:` of "comment" when setting up the Comment instance. As a result, parameters will be sent in a two dimensional hash, that is:

```ruby
{ :comment => { :name => "", :email => "", :message => "" } }
```

#### Dive deeper

There's plenty more functionality to show off, including [default values](https://github.com/adammcarth/instance.js/wiki/Setup-Guide#settings) for parameters, a plethora of settings for `.send()`, [removing of parameters](https://github.com/adammcarth/instance.js/wiki/Remove-Parameters) and [clearing](https://github.com/adammcarth/instance.js/wiki/Reset-Instances) Instances, adding parameters [manually](https://github.com/adammcarth/instance.js/wiki/Add-Parameters#add-attributes-) or from [html elements](https://github.com/adammcarth/instance.js/wiki/Add-Parameters#addelement), and checking out all of the built-in client side validation rules.

#### [Check Out The instance.js Wiki For All Documentation](https://github.com/adammcarth/instance.js/wiki "See Full Documentation")
#### [Contributing](https://github.com/adammcarth/instance.js/wiki/Contributing)
