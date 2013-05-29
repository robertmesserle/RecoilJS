
express = require 'express'

app.configure 'development', ->
  console.log 'Configuring Environment: Development'
  app.enable 'dev'
  app.use express.static paths.public

app.configure 'production', ->
  console.log 'Configuring Environment: Production'
  app.use express.static paths.build