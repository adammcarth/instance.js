## Front end modeling, done right. [![Code Climate](https://codeclimate.com/github/adammcarth/instance.js.png)](https://codeclimate.com/github/adammcarth/instance.js)

**instance.js** is a lightweight Javascript library that let's you model data on the client side before sending it off as parameters to the server.

Instance was coded from the ground up using pure Javascript (no dependencies or plugins required), and draws on similar concepts from existing frameworks like *Backbone.js* and *Node.js*. As you will see below, instance.js does not interact with the server at all (except for sending the parameters). This means it **will not** save stuff for you, synchronise elements with data from the server or perform similar operations. Instance merely provides you with an interface to perform such tasks - the gateway **from** data on the front end to your server side magic.

And it's really easy, too...

```javascript
var Comment = new Instance({
   url: "/comments/new",
   defaults: {
      subscribe_to_thread: false
   },
   success: function() {
      alert("Your comment has been saved!");
   }
});
```
Now that we have our *"temporary model"* (instance) defined, we are free to play around with it...

```javascript
Comment.add({
   name: "Adam",
   handle: "@adammcarth",
   message: "Hello, world!"
});
```

Perhaps some quick validation?:

```javascript
var message = Comment.get("message"); // => "Hello, world!"
if ( message.length < 5 ) {
   alert("Oops. Your comment must be more than 5 characters.");
}
```

**This new comment is lookin' good.** Let's send her off the the server so we can save it or whatever...

```javascript
// Fire it off!
Comment.send();
// Some milliseconds later...
// "Your comment has been saved!"
```

Access the parameters on the server just like you would normally:

```ruby
# Ruby
puts params[:name]
#=> "Adam"
```

```php
// PHP
echo $_POST["name"];
// => "Adam"
```

```python
# Python
print parsed_url["name"]
#=> "Adam"
```

```java
// Java
System.out.print(req.getParameter("name"));
// => "Adam"
```

Don't worry, **instance.js** has plenty more functionality to show off, including continuous updating of attributes (parameters) from HTML Input Fields and Elements, and some advanced settings for `Instance.send()` when you send your instance off to the server.

#### [Check Out The instance.js Wiki For All Documentation](https://github.com/adammcarth/instance.js/wiki "See Full Documentation")