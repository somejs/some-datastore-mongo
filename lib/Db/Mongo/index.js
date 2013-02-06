var Datastore = require('some-db'),
    Model = require('some-model'), 
    async = require('async'),
    parse = require('url').parse;



/*
 * Клиент к монге
 */
var Mongo = module.exports = Datastore.Client({
    ready: Datastore.Client.Property({
        value: false
    }),
    db: Datastore.Client.Property()
});



/*
 * Инициализация подключения к базе данных
 */
Mongo.prototype.init = function(url) {
    var attempts, self,
        Server = require('mongodb').Server,
        MongoClient = require('mongodb').MongoClient;

    if (url === null) {
        this.ready = false;
        console.log('сообщить базе о мертвом клиенте', this);
        this.notify();
        return this;
    }

    Datastore.Client.prototype.init.apply(this, arguments); 

    url = this.options.url;

    this.driver = new MongoClient(new Server(url.hostname, url.port))

    this.ready = true

    return this;
};



Mongo.prototype.connect = function(done) {
    var self = this;
        url = self.options.url;

    if (url.database) {
        //this.driver это еще MongoClient()
        return this.driver.open(function(err,client) {
            if (err) {
                console.log(err)
            } else {
                var db = client.db(url.database)
                db.close()
                console.log('sdfsdfsdf')
            }
        })
    } else {
        self.ready = true;
        done(self);
    }

    return this;
};



Mongo.prototype.send = function(query, done) {
    /*console.log('запрос к Редису', query);
    this.driver.send_command(query.shift(), query, done);
    return this;*/
};



/*
 * Очищает базу данных
 */
Mongo.prototype.flush = function(all, done) {
    /*this.driver.send_command('flushdb', done);
    return this;*/
};



/*
 * Интерфейс маппера
 */
/*
 * Загружает все данные из модели
 */
Mongo.prototype.all = function(Model, prefix, done) {
    /*var err = null,
        result = {};
        self = this;

    if (!(Model instanceof Function)) {
        throw Error('Model must be a function');
    }

    self.query(['smembers', prefix], function(err, members) {
        if (!err) {
            members.map(function(key) {
                return result[[prefix, key].join(':')] = new Model({
                    mapper: self,
                    prefix: prefix,
                    key: key
                });
            });
        }
        return done(err, result);
    });
    return this;*/
};



/*
 * Ищет и загружает данные в модели
 */
Mongo.prototype.find = function(Model, prefix, keys, done) {
    /*var err = null,
        result = {},
        self = this;

    if (!(Model instanceof Function)) {
        throw Error('Model must be a function');
    }

    if (!(keys instanceof Array)) {
        if (!keys) {
            return self.all(Model, prefix, done);
        }
        keys = [keys];
    }

    async.reduce(keys, result, function(result, key, done) {
        return self.query(['sismember', prefix, key], function(err, exists) {
            if (!err) {
                if (exists) {
                    result[key] = new Model({
                        mapper: self,
                        prefix: prefix,
                        key: key
                    });
                } else {
                    result[key] = null;
                }
            }
            return done(err, result);
        });
    }, done);

    return this;*/
};



/*
 * Проверяет существование данных в модели
 */
Mongo.prototype.load = function(unloaded, model, done) {
    /*var self = this;
    self.has(model, function(err, has) {
        var properties, q;
        model.loaded = has;
        if (err || !has) {
            return done(err, model);
        }
        properties = model.constructor.properties;
        unloaded = {};
        q = ['hmget', [model.prefix, model.key].join(':')];
        Object.keys(properties).map(function(p) {
            var property = properties[p];

            if (property.enumerable) {
                unloaded[p] = property;
                return q.push(p);
            }
        });

        return self.query(q, function(err, r) {
            if (!err) {
                Object.keys(unloaded).map(function(p) {
                    return model[p] = r.shift();
                });
                model.loaded = true;
            }
            return done(err, model);
        });
    });
    return this;*/
};



/*
 * Сохраняет данные модели
 */
Mongo.prototype.save = function(fields, model, done) {
    /*var self = this,
        q = ['hmset', [model.prefix, model.key].join(':')];

    Object.keys(fields).map(function(field) {
        if (void 0 !== model[field]) {
            q.push(field);
            return q.push(model[field]);
        }
    });

    this.query(q, function(err, r) {
        if (err) {
            return done(err, model);
        }

        q = ['sadd', model.prefix, model.key];

        return self.query(q, function(err, r) {
            if (!err) {
                model.loaded = true;
            }
            return done(err, model);
        });
    });
    return this;*/
};
