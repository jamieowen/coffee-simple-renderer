
SceneRenderer = require "renderer/SceneRenderer"
SceneBuilder = require "examples/SceneBuilder"

Rect = require "indexing/Rect"

class EaselJSRenderer

	constructor:(@canvas)->
		#--
		# create a basic test scene
		@builder = SceneBuilder.create()

		@renderer = new SceneRenderer builder.totalWidth,builder.totalHeight,5,5,
			()=>@clearSceneDelegate,
			()=>@addToSceneDelegate

		@builder.build @renderer

		#-- create easel stage.
		@easel = new createjs.Stage @canvas

		# add handlers
		$(window).resize( @resize )
		$(window).scroll( @scroll )

		@resize()

		createjs.Ticker.addEventListener "tick", tick

	###
  Handle tick to pass to Renderer.
  Update Easel.
	###
	tick:()->
		@renderer.render(false)
		@easel.update()

	###
	Clear the Easel Stage
	###
	clearSceneDelegate:()->
		@easel.removeAllChildren()
		null

	###
	Add a renderer to the Easel Stage
	###
	addToSceneDelegate:(renderer,rendererData,x,y)=>
		renderer.x = x
		renderer.y = y

		# set renderer data
		# renderer.data = rendererData
		@easel.addChild renderer

		null

	###
	Resize viewport & canvas
	###
	resize:()->
		@easel.canvas.width = window.innerWidth
		@easel.canvas.width = window.innherHeight

		@renderer.viewportSize window.innerWidth,window.innerHeight


	###
	Set viewport scroll position.
	###
	scroll:()->
		x = $(window).scrollLeft()
		y = $(window).scrollTop()

		@renderer.viewportPos(x,y)



