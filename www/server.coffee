#!/usr/bin/env coffee

# Configure Express Server
express     = require 'express'
global.app  = express()

# Load Config Files
require './config/paths'
require './config/environment'
require './config/routes'

# Start the app
port = process.env.PORT or 3000
app.listen( port )
console.log "Listening on port #{ port }"