
###
A RendererFactory to instantiate renderer classes from a type identifier.
###
module.exports = class RendererFactory

	constructor:()->
		# map rendererType to a class instance
		@rendererMap = {}
		# a pool of renderers mapped to each type that have been used before.
		@rendererPool = {}
		# the list of renderers currently in use.
		@rendererList = []


	###
	Register a rendererType with an associated rendererClass and
	create a number of pooled renderers if required.
	###
	register:(rendererType, rendererClass, poolCount)->
		if not poolCount
			poolCount = 0

		if not @rendererMap[rendererType]
			@rendererMap[rendererType] = rendererClass
			@rendererPool[rendererType] = []
			if poolCount > 0
				for i in [0..poolCount]
					@rendererPool[rendererType].push new rendererClass()

		return



	###
	Detaches renderers and assumes they may not be used again.
	But holds on to association of rendererData to rendererObject
	to main
	###
	preCreate:() ->
		null


	###
	Create a renderer object from the rendererType property
	of the rendererData object.
	###
	create:(rendererData) ->
		pool = @rendererPool[rendererType]
		if not pool
			return null

		if pool.length
			return pool.pop()


	###
	Completely frees up renderers and adds them back to the pool
	###
	postCreate:()->
		null








