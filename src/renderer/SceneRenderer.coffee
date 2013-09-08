
###
Imports
###
SceneIndex = require "indexing/SceneIndex"
Rect = require "indexing/Rect"

###
SceneRenderer

Basic SceneRenderer to render many display objects.
Used with EaselJS for now.
###
module.exports = class SceneRenderer

	constructor:(w,h,hDiv,vDiv,@viewport, @easelStage)->
		if not @viewport
			@viewport = new Rect 0,0,100,100

		@index = new SceneIndex w,h,hDiv,vDiv
		@renderList = []

	###
  add()

  Add an object to the Renderer.
  object must implement a "rect" property of type indexing.Rect
  ###
	add:(object) ->
		@index.add object

	###
  remove()

	Removes an object from the Renderer.
  ###
	remove:(object)->
		@index.remove object

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

  Used to assign a renderer  to a specific object type
  Not implemented yet.
  Would need some RendererFactory class.
  ###
	registerRenderer: (rendererClass, rendererType ) ->
		return

	###
  render()

  Renders the
	###
	render:() ->
		# clear the stage.
		@easelStage.removeAllChildren()

		# clear the renderList
		@renderList.splice(0)
		@renderList = @index.find( @viewport )

		# create renderers
    # @factory

		# and add to stage
		for object in @renderList
			object.renderer.x = object.rect.left - @viewport.left
			object.renderer.y = object.rect.top - @viewport.top
			@easelStage.addChild object.renderer






