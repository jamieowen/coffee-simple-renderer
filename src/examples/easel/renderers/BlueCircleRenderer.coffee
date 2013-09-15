
module.exports = class BlueCircleRenderer extends createjs.Shape

	@circleGraphics: null

	###
  Reuse a Graphics object for faster shape renderering.
	###
	@getGraphics:()->
		if not BlueCircleRenderer.circleGraphics
			BlueCircleRenderer.circleGraphics = new createjs.Graphics()
			BlueCircleRenderer.circleGraphics.beginFill("blue").drawCircle(40,40,40);

		return BlueCircleRenderer.circleGraphics


	data: null

	constructor:()->
		#--
		super()
		#CircleRenderer.getGraphics()

		@graphics = BlueCircleRenderer.getGraphics()

