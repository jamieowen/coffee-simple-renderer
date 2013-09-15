
SceneRenderer = require "renderer/SceneRenderer"
SceneBuilder = require "examples/utils/SceneBuilder"
Rect = require "indexing/Rect"

BlackCircleRenderer = require "examples/easel/renderers/BlackCircleRenderer"
BlueCircleRenderer = require "examples/easel/renderers/BlueCircleRenderer"
GreenCircleRenderer = require "examples/easel/renderers/GreenCircleRenderer"
RedCircleRenderer = require "examples/easel/renderers/RedCircleRenderer"
YellowCircleRenderer = require "examples/easel/renderers/YellowCircleRenderer"

module.exports = class EaselRenderer

	constructor:(@canvas)->
		#--
		# create a basic test scene
		@builder = SceneBuilder.createBasic()

		@renderer = new SceneRenderer @builder.totalWidth,@builder.totalHeight,5,5,
			()=>@clearSceneDelegate(),
			(renderer,rendererData,x,y)=>@addToSceneDelegate(renderer,rendererData,x,y)

		@builder.build @renderer

		# register renderers
		@renderer.registerRenderer "black", BlackCircleRenderer, 10
		@renderer.registerRenderer "blue", BlueCircleRenderer, 10
		@renderer.registerRenderer "green", GreenCircleRenderer, 10
		@renderer.registerRenderer "red", RedCircleRenderer, 10
		@renderer.registerRenderer "yellow", YellowCircleRenderer, 10

		#-- create easel stage.
		@easel = new createjs.Stage @canvas

		# add handlers
		$(window).resize( ()=>@resize() )
		$(window).scroll( ()=>@scroll() )

		@_output = $("div#output")
		@output( ["hello", "speed"])

		@resize()

		createjs.Ticker.addEventListener "tick", ()=>@tick()
		#@tick()
		#@renderer.factory.preCreate()

	###
  Handle tick to pass to Renderer.
  Update Easel.
	###
	tick:()->
		#collectTime = window.performance.now()
		@renderer.render(false)
		#collectTime = window.performance.now() - collectTime

		#renderTime = window.performance.now()
		@easel.update()
		#renderTime = window.performance.now() - renderTime

		#@output(["collect:"+collectTime.toFixed(3), "render:"+renderTime.toFixed(3), @renderer.factory.getPoolCount() ])
		@output ["intersection tests:" + @renderer.index.intersectionTests, "renderer count:" + @renderer.renderList.length ]

	###
	Clear the Easel Stage
	###
	clearSceneDelegate:()->
		@easel.removeAllChildren()
		null

	###
	Add a renderer to the Easel Stage
	###
	addToSceneDelegate:(renderer,rendererData,x,y)->
		# set renderer
		renderer.data = rendererData
		renderer.x = x
		renderer.y = y

		@easel.addChild renderer

		null


	output:(list)->
		html = "<p>"
		for item in list
 			html+= item + "<br/>"

		html+="</p>"
		$(@_output).empty()
		$(@_output).html(html)



	###
	Resize viewport & canvas
	###
	resize:()->
		@easel.canvas.width = window.innerWidth
		@easel.canvas.height = window.innerHeight

		@renderer.viewportSize window.innerWidth,window.innerHeight


	###
	Set viewport scroll position.
	###
	scroll:()->
		x = $(window).scrollLeft()
		y = $(window).scrollTop()

		@renderer.viewportPos(x,y)



