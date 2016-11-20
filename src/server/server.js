require('babel-register')({
  presets: [ 'es2015' ]
})

var express = require('express')

var graphql = require('graphql')
var expressGraphql = require('express-graphql')

var Schema = require('./schema.js').default

var app = express()
var PORT = process.env.PORT || 3000

app.use(express.static(__dirname + './../public'))

app.use('/graphql', expressGraphql({
  schema: Schema,
  graphiql: true
}))

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT)
})
