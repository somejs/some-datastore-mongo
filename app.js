var Db = require('./lib/Db')
var database = 'mongodb://test:test@ds047037.mongolab.com:47037/test'

Db.connect(database, function(err, db) {})

console.log('fff')
