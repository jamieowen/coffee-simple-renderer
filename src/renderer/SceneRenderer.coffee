
###
Imports
###
SceneIndex = require "indexing/SceneIndex"
Rect = require "indexing/Rect"
RendererFactory = require "renderer/RendererFactory"

###
SceneRenderer

Basic SceneRenderer to render many display objects.
Used with EaselJS for now.
###
module.exports = class SceneRenderer

	###
	The add to stage

	w = The total width of the scene
	h = The total height of the scene
	hDiv = The total divisions horizontally for the spatial index
	vDiv = The total divisions vertically for the spatial index
	clearScene = The function to use to clear the rendering scene ( canvas / dom / webgl / etc )
	addToScene = The function to use to add a renderer to the scene ( canvas / dom / webgl / etc )
	###
	constructor:(w,h,hDiv,vDiv,@clearScene, @addToScene )->
		if not @viewport
			@viewport = new Rect 0,0,100,100

		# if we supply no handlers for clearing/adding to the stage
		# just create empty methods
		# method sigatures are as defined below
		if not @clearScene
			@clearScene = ()->
				null

		if not @addToScene
			@addToScene = (renderer,rendererData,x,y)->
				null

		# create the scene index and the factory
		@index = new SceneIndex w,h,hDiv,vDiv
		@factory = new RendererFactory()


	###
	add()

	Add an object to the Renderer.
	object must implement a "rect" property of type indexing.Rect
	###
	add:(rendererData) ->
		@index.add rendererData

		f = (func) ->
			null

		f( ()=>
			@index.add()
		)

		null



	###
	remove()

	Removes an object from the Renderer.
	###
	remove:(rendererData)->
		@index.remove rendererData


	###
	update()

	Updates an object in the index.
	###
	update:(rendererData)->
		@index.update rendererData

	###
	viewportSize()

	Resize the viewport.
	###
	viewportSize:(width,height) ->
		@viewport.update @viewport.left,@viewport.top,width,height

	###
	viewportMove()

	Position the viewport.
	###
	viewportPos:(x,y) ->
		console.log x,y
		@viewport.update x,y,@viewport.width,@viewport.height

	###
	registerRenderer()

	Register a specific rendererType to a rendererClass.
	Specify a poolCount if you want to instantiate a number of renderers up front.
	###
	registerRenderer: (rendererType, rendererClass, poolCount) ->
		@factory.registerRenderer rendererType,rendererClass,poolCount
		null


	###
	render()

	Handles the rendering and instantiating of the renderers.
	The clearScene() and addToScene() delegates need to be specified
	as they do the positioning and assigning of rendererData.
	###
	render:() ->
		# clear the scene
		@clearScene()

		# clear the renderList
		@renderList.splice(0)
		@renderList = @index.find @viewport

		# notify the factory
		@factory.detach()

		# and add to stage
		for rendererData in @renderList
			renderer = @factory.create ren
			x = object.rect.left - @viewport.left
			y = object.rect.top - @viewport.top

			@addToScene renderer,rendererData,x,y

			#@easelStage.addChild object.renderer






