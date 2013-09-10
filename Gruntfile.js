module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['app/js/<%= pkg.name %>.js', 'app/js/snap.js', 'app/js/ratchet.js', 'app/js/json2.js', 'app/js/vendors/jquery.js'],
        dest: ['build/js/<%= pkg.name %>.min.js', 'build/js/snap.min.js', 'build/js/ratchet.min.js', 'build/js/json2.min.js', 'build/js/vendors/jquery.min.js'],
      }
    },
    concat: {
        js: {
            src: ['app/js/vendors/underscore.js', 'app/js/vendors/jquery.js', 'app/js/json2.js', 'app/js/vendors/backbone.js', 'app/js/vendors/backbone.localStorage.js', 'app/js/vendors/backbone.touch.min.js', 'app/js/snap.js', 'app/js/ratchet.js', 'app/js/<%= pkg.name %>.js'],
            dest: 'build/js/<%= pkg.name %>.min.js'
        }
     },
    cssmin: {
        add_banner: {
            options: {
                banner: '/*! <%= pkg.name %>.css <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
                'build/css/<%= pkg.name %>.css': ['app/css/**/*.css']
            }
        }
    },
     copy: {
        main: {
            files: [
                {expand: true, cwd: 'app/', src: ['fonts/**'], dest: 'build/'},
                {expand: true, cwd: 'app/', src: ['img/**'], dest: 'build/'},
                {expand: true, cwd: 'app/', src: ['index.html'], dest: 'build/'},
            ]
        }
     }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'copy', 'cssmin']);

};