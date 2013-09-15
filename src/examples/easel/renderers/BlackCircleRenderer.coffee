
module.exports = class BlackCircleRenderer extends createjs.Shape

	@circleGraphics: null

	###
  Reuse a Graphics object for faster shape renderering.
	###
	@getGraphics:()->
		if not BlackCircleRenderer.circleGraphics
			BlackCircleRenderer.circleGraphics = new createjs.Graphics()
			BlackCircleRenderer.circleGraphics.beginFill("black").drawCircle(40,40,40);

		return BlackCircleRenderer.circleGraphics


	data: null

	constructor:()->
		#--
		super()
		#CircleRenderer.getGraphics()

		@graphics = BlackCircleRenderer.getGraphics()

