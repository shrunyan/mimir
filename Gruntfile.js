module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
        compile: {
            options: {
                baseUrl: './',
                mainConfigFile: 'src/requirejs/config.js',
                dir: 'prod/',
                optimize: "uglify",
                useStrict: true
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadTasks('build/');

  grunt.registerTask('dev', ['clean', 'copy', 'cssmin', 'jshint', 'connect:dev', 'watch']);
  grunt.registerTask('prod', ['clean', 'copy', 'jshint', 'concat:prod']);

  grunt.registerTask('default', ['dev']);

};
