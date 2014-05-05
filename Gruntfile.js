module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.loadTasks('build/');

  grunt.registerTask('dev', ['clean', 'copy', 'cssmin', 'jshint', 'connect:dev', 'watch']);
  grunt.registerTask('prod', ['clean', 'copy', 'jshint']);

  grunt.registerTask('default', ['dev']);

};
