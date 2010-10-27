Express-Juggernaut-Demo
=============

Simple demo that combines Express.js and Juggernaut 2. More or less a boilerplate app.

Quick setup:
-------
* Step 1: Install socket.io -- `npm install http://cl.ly/2dgx/content`
* Step 2: Install node-static -- `npm install http://github.com/cloudhead/node-static/tarball/master`
* Step 3: Install redis-client -- `npm install http://github.com/technoweenie/redis-node-client/tarball/npm`
* Step 4: Install Redis -- [Redis](http://code.google.com/p/redis/)
* Step 5: Clone the repo -- `git clone git://github.com/shripadk/express-juggernaut.git`
* Step 6: cd into the directory and launch server.js -- `$ sudo node server.js`
* Step 7: No step 7! You have got your express-juggernaut app running! Yay!

Customizing:
------------

By default the Juggernaut listens to the Express http.Server() instance. You can override this and launch Juggernaut on a separate port. Just provide the port number, eg: `Juggernaut.listen(8080)`

If you want to change redis client options (publisher), you can edit `configureClient()` in server.js
Just pass the options as an object literal to **configureClient(port, host, options)**.

Eg: `configureClient(6379, 127.0.0.1, {maxReconnectionAttempts: 10})`