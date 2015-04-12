var DEVELOPER = true;

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    redis = require('redis'),
    dust = require('dustjs-linkedin'),
    defaults = {
        contentType: 'text/html;charset=utf-8',
        expire: 60 //expire in 60 seconds
    };

require('dustjs-helpers');

dust.onLoad = function(tmpl, cb) {
    fs.readFile(path.join('./src/dust', path.resolve('/', tmpl + '.dust')), {
        encoding: 'utf8'
    }, cb);
}

module.exports = Core;

function Core(routes) {

    var app = this.app = express(),
        red = this.red = redis.createClient(),
        method;


    red.on("error", function(err) {
        console.error(err);
    });

    /*-----------------------------------------------*/
    /*  create METHOD paths for all existing routes 
    /*  GET is default
    /*---------------------------------------------*/
    for (var p in routes) {
        method = routes[p].method ? routes[p].method : 'get';
        app[method](p, pathMiddleWare, pathFinder);
    }
    /*--------------------------------------*/
    /*  Error handling    */
    /*--------------------------------------*/
    app.use(function(req, res, next) {
        res.status(404).end('no route');
    });

    /*--------------------------------------*/
    /* start listening
    /*--------------------------------------*/
    app.listen(8888, function() {
        console.log('listening on port 8888...');
    });

    /*--------------------------------------*/
    /*  parse multipart, check auth...    */
    /*--------------------------------------*/
    function pathMiddleWare(req, res, next) {
        next();
    }

    /*--------------------------------------*/
    /*  All REQUESTS are handled here       */
    /*--------------------------------------*/
    function pathFinder(req, res, next) {

        /*--------------------------------------*/
        /*  Determine which path data to use    */
        /*--------------------------------------*/
        var key = req.route.path,
            route = routes[key];

        if (!route) {
            /*--------------------------------------*/
            /*  404 if no route is found            */
            /*--------------------------------------*/
            res.status(404).send('No route');
            return;
        }

        /* render */
        if (route.tpl) {
            //developer always reload
            if (DEVELOPER)
                delete dust.cache[route.tpl];

            dust.render(route.tpl, route.model, function(err, out) {
                if (err) {
                    console.error(err);
                    render(JSON.stringify(route), res, route, key);
                } else {
                    render(out, res, route, key);
                }
            });
        } else {
            render(JSON.stringify(route), res, route, key);
        }

        return;

    }

    function render(out, res, route, key) {
        /* save to redis */
        red.set(key, out, redis.print);
        red.expire(key, (typeof route.expire != 'undefined') ? route.expire : defaults.expire);
        /* serve */
        res.set({
            'Content-type': (typeof route.contentType != 'undefined') ? route.contentType : defaults.contentType
        });
        res.end(out);
    }

}
