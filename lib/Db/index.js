var Datastore = require('some-db'),
    Model = require('some-model'),
    async = require('async'),
    Mongo = require('./Mongo'),
    parse = require('url').parse;



/*
 * База данных приложения
 */
Db = module.exports = Datastore({
    ready: Datastore.Property({
        value: false
    })
});



/*
 * Инициализирует экземпляр базы данных
 */
Db.prototype.init = function(options) {
    Datastore.prototype.init.apply(this, arguments);
    this.clients = [];
};



/*
 * Разбирает строку подключения
 */
Db.parseUrl = function(url) {
    var match;

    url = parse(url);
    
    match = /^\/(\w+)\??(.*)$/.exec(url.pathname);
    url.database = match[1];

    if (url.auth) {
        match = /(.*):(.*)/.exec(url.auth);
        var auth = {
            user: match[1],
            password: match[2]
        }
    
        url.auth = auth
    }
    console.log(url)
    return url;
};



/*
 * Конструирует базу и подключается к ней
 */
Db.connect = function(url, done) {
    var db;
    db = new Db({
        url: Db.parseUrl(url)
    });
    db.connect(done);
    return db;
};



/*
 * Подключается к базе
 */
Db.prototype.connect = function(done) {
    console.log('подключиться к базе данных', this.options.url.href);
    var err = null,
        self = this;

    if ('mongodb:' === this.options.url.protocol) {
        var mongo = new Db.Mongo({
            url: this.options.url
        });

        mongo.connect(function(err, client) {
            self.use(client);
            if (!self.ready && client.ready) {
                self.ready = true;
            }
            console.log('111')
            return done(err, self);
        });
    } else {
        done('err db',self)
    }
  return this;
};




/*
 * Очищает базу данных
 */
Db.prototype.flush = function(all, done) {
    this.clients.map(function(client) {
        if (client.ready) {
            return client.flush(all, done);
        }
    });
    return this;
};



/*
 * Там находится интерфейс монги
 */
Db.Mongo= Mongo
