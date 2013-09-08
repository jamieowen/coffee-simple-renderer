module.exports = (grunt) ->

	grunt.initConfig
		stitch:
			options:
				paths:["src/"]
				dependencies:[]
				dest:"public/scripts/coffee-simple-renderer.js"

		nodeunit:
		  all:["tests/*.test.coffee"]

	grunt.loadNpmTasks('grunt-stitch')
	grunt.loadNpmTasks('grunt-contrib-nodeunit')

	grunt.registerTask 'default', 'Try Logging', ->
		grunt.log.write('test..')