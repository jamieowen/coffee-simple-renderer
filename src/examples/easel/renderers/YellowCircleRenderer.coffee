
module.exports = class YellowCircleRenderer extends createjs.Shape

	@circleGraphics: null

	###
  Reuse a Graphics object for faster shape renderering.
	###
	@getGraphics:()->
		if not YellowCircleRenderer.circleGraphics
			YellowCircleRenderer.circleGraphics = new createjs.Graphics()
			YellowCircleRenderer.circleGraphics.beginFill("yellow").drawCircle(40,40,40);

		return YellowCircleRenderer.circleGraphics


	data: null

	constructor:()->
		#--
		super()
		#CircleRenderer.getGraphics()

		@graphics = YellowCircleRenderer.getGraphics()

