
Rect = require "indexing/Rect"

###
  Create a super basic Scene for testing.

	Class to centralised the build process of the scene to pass between
	Renderers ( EaselJS/ WebGL / Canvas / Dom )
###
class SceneBuilder

	@createBasic: ()->
		return new SceneBuilder 100,80,40

	constructor:(@size,@width,@height)->
		# --
		@totalWidth = @width*@size
		@totalHeight = @height*@size

	build:(renderer)->
		count = 0
		for ix in [0..@width]
			for iy in [0..@height]
				count++
				obj =
					id: count
					rect: new Rect ix*@size,iy*size,@size,@size
					rendererType: "myRenderer"

				renderer.add obj

		null









