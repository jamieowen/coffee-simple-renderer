Rect = require( "indexing/Rect" )
Partition = require( "indexing/Partition" )

# A simple spatial indexing class.
# Nothing complex like QTree,R-Tree, etc.  Just one depth of partitions.
# No updating - just remove and re-add.
module.exports = class SceneIndex

	constructor:(w,h,hDiv,vDiv) ->
		@bounds = new Rect 0,0,w,h
		@partitions = []

		@vDiv = vDiv == 0 ? 1 : vDiv
		@hDiv = hDiv == 0 ? 1 : hDiv

		# performance
		@intersectionTests = 0

		# setup partitions.
		pWidth = w/hDiv
		pHeight = h/vDiv

		for ix in [0..hDiv]
			for iy in [0..vDiv]
				partition = new Partition(ix*pWidth, iy*pHeight,pWidth,pHeight)
				@partitions.push partition


	# Add an object to the index.
	# The object must contain a "rect" property of type Rect.
	add:(object) ->
		added = false

		for partition in @partitions
			if partition.bounds.intersects object.rect
				partition.add object
				added = true

		return added

	remove:( object ) ->
		# later
		return

	find:(rect) ->
		results = []

		@intersectionTests = 0
		for partition in @partitions
			@intersectionTests++
			if rect.intersects partition.bounds
				for object in partition.objects
					@intersectionTests++
					if rect.intersects object.rect
						results.push object if results.indexOf(object) < 0

		return results








