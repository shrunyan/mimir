module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
  });

  grunt.loadTasks('build/');

  grunt.registerTask('dev', ['clean', 'copy', 'jshint', 'connect:dev', 'watch']);
  grunt.registerTask('build', []);
  grunt.registerTask('prod', []);

  grunt.registerTask('default', ['dev']);

};