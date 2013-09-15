
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
		# keep track of pool count
		@poolCount = {}


	###
	Register a rendererType with an associated rendererClass and
	create a number of pooled renderers if required.
	###
	register:(rendererType, rendererClass, poolCount)->
		if not poolCount
			poolCount = 0

		@poolCount[rendererType] = [rendererType,null]

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
  ( although not doing that now )
	###
	preCreate:() ->
		#console.log "Pre Create"
		for renderer in @rendererList
			pool = @rendererPool[renderer.data.rendererType]
			if not pool
				console.log "no renderer for :" + renderer.data
			else
				pool.push renderer

		for key of @rendererPool
			@poolCount[key][1] = @rendererPool[key].length

		@rendererList.splice(0)

	newRendererCount:null

	###
  Returns an array of rendererTypes and their current pool count.
  ###
	getPoolCount:()->

		count = []
		for key of @poolCount
			count.push( @poolCount[key].join(":") )

		return count




	###
	Create a renderer object from the rendererType property
	of the rendererData object.
	###
	create:(rendererData) ->
		pool = @rendererPool[rendererData.rendererType]

		# we don't have an assigned renderer for the rendererType
		if not pool
			return null

		@newRendererCount = 0
		renderer = null
		if pool.length
			renderer = pool.pop()
			@rendererList.push renderer
		else
			@newRendererCount++
			rendererClass = @rendererMap[rendererData.rendererType]
			renderer = new rendererClass()
			@rendererList.push renderer

		#console.log "New Renderer Count :" + @newRendererCount

		return renderer



	###
	Completely frees up renderers and adds them back to the pool
	###
	postCreate:()->
		null








