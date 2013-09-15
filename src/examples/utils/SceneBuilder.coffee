
Rect = require "indexing/Rect"

###
	Create a super basic Scene for testing.

	Class to centralised the build process of the scene to pass between
	Renderers ( EaselJS/ WebGL / Canvas / Dom )
###
module.exports = class SceneBuilder

	@createBasic: ()->
		return new SceneBuilder(100,80,40,["red","blue","green","black","yellow"])

	constructor:(@size,@width,@height,@rendererTypes)->
		# --
		@totalWidth = @width*@size
		@totalHeight = @height*@size

	getRandomRendererType:()->
		random = Math.round( Math.random()*(@rendererTypes.length-1) )
		return @rendererTypes[ random ]

	build:(renderer)->
		count = 0
		for ix in [0..@width]
			for iy in [0..@height]
				count++
				obj =
					id: count
					rect: new Rect ix*@size,iy*@size,@size,@size
					rendererType: @getRandomRendererType()
				renderer.add obj

		null









