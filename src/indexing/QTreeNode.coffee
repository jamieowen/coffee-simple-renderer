Rect = require("indexing/Rect")

class QTreeNode

	children: null
	parent:null
	bounds:null
	data:null

	topleft:null
	topright:null
	bottomleft:null
	bottomright:null

	constructor:(parent, bounds)->
		@parent = parent
		if bounds
			@bounds = bounds
		else
			@bounds = new Rect()

	split:()->

		halfWidth = @bounds.width*0.5
		halfHeight = @bounds.height*0.5

		topleft = new QTreeNode( @, new Rect(@bounds.left,@bounds.top,halfWidth,halfHeight) )
		topright = new QTreeNode( @, new Rect(@bounds.left+halfWith,@bounds.top,halfWidth,halfHeight) )
		bottomleft = new QTreeNode( @, new Rect(@bounds.left,@bounds.top+halfHeight,halfWidth,halfHeight) )
		bottomright = new QTreeNode( @, new Rect(@bounds.left+halfWidth,@bounds.top+halfHeight,halfWidth,halfHeight) )



	add:(node)->
		null


	remove:(node)->
		null

	find:(rect)->
		null
