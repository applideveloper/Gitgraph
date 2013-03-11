module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['src/<%= pkg.name %>.js']
		},
		concat: {
			dist: {
				src: ['vendor/spin/dist/spin.js', 'src/<%= pkg.name %>.js'],
				dest: 'src/<%= pkg.name %>.concat.js'
			}
		},
		uglify: {
			build: {
				src: '<%= concat.dist.dest %>',
				dest: '<%= pkg.name %>.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};