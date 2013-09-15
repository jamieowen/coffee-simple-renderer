
module.exports = class Performance
	constructor:()->
		#---
		@performance = {}

	add:(name)->
		@performance[name] = []

	start:(name)->
		@performance[name]
