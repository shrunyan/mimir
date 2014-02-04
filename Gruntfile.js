module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
            separator: ';'
        },
        libs: {
            src: ['app/js/vendors/json2.js', 'app/js/vendors/jquery.js', 'app/js/vendors/underscore.js'],
            dest: 'build/js/lib.js'
        },
        backbone: {
            src: ['app/js/vendors/backbone.js', 'app/js/vendors/backbone.localStorage.js', 'app/js/vendors/backbone.touch.js'],
            dest: 'build/js/backbone.js'
        },
        ui: {
            src: ['app/js/ratchet.js', 'app/js/snap.js'],
            dest: 'build/js/ui.js'
        },
        mimir: {
            src: ['app/js/models/*', 'app/js/views/*', 'app/js/router.js'],
            dest: 'build/js/mimir.app.js'
        }
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %>.min.js | <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        libs: {
            files: {
                'build/js/libs.min.js': ['<%= concat.libs.dest %>']
            }
        },
        backbone: {
            files: {
                'build/js/backbone.min.js': ['<%= concat.backbone.dest %>']
            }
        },
        ui: {
            files: {
                'build/js/ui.min.js': ['<%= concat.ui.dest %>']
            }
        },
        app: {
            files: {
                'build/js/mimir.min.js': 'app/js/mimir.js'
            }
        }
    },
    jshint: {
        all: ['Gruntfile.js', 'app/js/mimir.js']
    },
    cssmin: {
        build: {
            options: {
                banner: '/*! <%= pkg.name %>.min.css | <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
                'build/css/<%= pkg.name %>.min.css': ['app/css/**/*.css']
            }
        }
    },
     copy: {
        build: {
            files: [
                {expand: true, cwd: 'app/', src: ['fonts/**'], dest: 'build/'},
                {expand: true, cwd: 'app/', src: ['img/**'], dest: 'build/'},
                {expand: true, cwd: 'app/', src: ['index.html'], dest: 'build/'},
                {expand: true, cwd: 'app/', src: ['mimir.manifest'], dest: 'build/'},
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