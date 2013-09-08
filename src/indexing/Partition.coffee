
Rect = require( "indexing/Rect" )

module.exports = class Partition

	constructor:(x,y,w,h)->
		@objects = []
		@bounds = new Rect(x,y,w,h)

	add:(object)->
		@objects.push(object)
		return true

	remove:(object)->
		idx = @objects.indexOf(object)
		if idx >= 0
			@objects.splice(0,1)
			return true
		else
			return false