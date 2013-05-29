
express = require 'express'

app.configure ->
  app.use express.static paths.public

app.configure 'development', ->
  console.log 'Configuring Environment: Development'
  app.enable 'dev'

app.configure 'production', ->
  console.log 'Configuring Environment: Production'
  app.enable 'prod'