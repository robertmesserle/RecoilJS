
fs                  = require 'fs'

paths               = {}
paths.root          = fs.realpathSync __dirname + '/..'
paths.helpers       = "#{ paths.root }/helpers"
paths.controllers   = "#{ paths.root }/controllers"
paths.public        = "#{ paths.root }/pub"
paths.tmp           = "#{ paths.root }/tmp"

global.paths        = paths