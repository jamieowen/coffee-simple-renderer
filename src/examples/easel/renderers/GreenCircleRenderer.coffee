
module.exports = class GreenCircleRenderer extends createjs.Shape

	@circleGraphics: null

	###
  Reuse a Graphics object for faster shape renderering.
	###
	@getGraphics:()->
		if not GreenCircleRenderer.circleGraphics
			GreenCircleRenderer.circleGraphics = new createjs.Graphics()
			GreenCircleRenderer.circleGraphics.beginFill("green").drawCircle(40,40,40);

		return GreenCircleRenderer.circleGraphics


	data: null

	constructor:()->
		#--
		super()
		#CircleRenderer.getGraphics()

		@graphics = GreenCircleRenderer.getGraphics()

