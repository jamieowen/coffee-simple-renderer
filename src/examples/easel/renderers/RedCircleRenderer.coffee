
module.exports = class RedCircleRenderer extends createjs.Shape

	@circleGraphics: null

	###
  Reuse a Graphics object for faster shape renderering.
	###
	@getGraphics:()->
		if not RedCircleRenderer.circleGraphics
			RedCircleRenderer.circleGraphics = new createjs.Graphics()
			RedCircleRenderer.circleGraphics.beginFill("red").drawCircle(40,40,40);

		return RedCircleRenderer.circleGraphics


	data: null

	constructor:()->
		#--
		super()
		#CircleRenderer.getGraphics()

		@graphics = RedCircleRenderer.getGraphics()

