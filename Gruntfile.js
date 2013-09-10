module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        build: {
            src: ['build/js/<%= pkg.name %>.js'],
            dest: ['build/js/<%= pkg.name %>.min.js']
        }
    },
    concat: {
        build: {
            options: {
                //stripBanners: true,
                banner: '/*! <%= pkg.name %>.js | <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            src: ['app/js/vendors/underscore.js', 'app/js/vendors/jquery.js', 'app/js/json2.js', 'app/js/vendors/backbone.js', 'app/js/vendors/backbone.localStorage.js', 'app/js/vendors/backbone.touch.min.js', 'app/js/snap.js', 'app/js/ratchet.js', 'app/js/<%= pkg.name %>.js'],
            dest: 'build/js/<%= pkg.name %>.js'
        }
    },
    jshint: {
        all: ['Gruntfile.js', 'app/js/mimir.js']
    },
    cssmin: {
        build: {
            options: {
                banner: '/*! <%= pkg.name %>.css | <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
                'build/css/<%= pkg.name %>.css': ['app/css/**/*.css']
            }
        }
    },
     copy: {
        build: {
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
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'copy', 'cssmin', 'uglify']);

};