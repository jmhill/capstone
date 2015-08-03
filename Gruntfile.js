module.exports = function(grunt) {
  grunt.initConfig({

    // Default Configurations
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext:'js, html',
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      },
      debug: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js, html',
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      }
    },

    watch: {
      js: {
        files: ['server.js, config/**/*.js', 'app/**/*.js', 'public/js/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: ['public/css/*.css'],
        tasks: ['csslint']
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      debug: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    'node-inspector': {
      debug: {
        options: {
          'web-port': 8989
        }
      }
    },

    // Testing Configurations
    mochaTest: {
      src: 'test/**/*.js',
      options: {
        reporter: 'spec'
      }
    },

    // Linting Configurations
    jshint: {
      all: {
        src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js']
      }
    },
    csslint: {
      all: {
        src: 'public/css/*.css'
      }
    }

  });

  // Load Default Tasks
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-inspector');

  // Load Testing Tasks
  grunt.loadNpmTasks('grunt-mocha-test');

  // Load Linting Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // Register Tasks
  grunt.registerTask('default', ['env:dev', 'lint', 'concurrent:dev']);
  grunt.registerTask('debug', ['env:dev', 'lint', 'concurrent:debug']);
  grunt.registerTask('test', ['env:test', 'mochaTest']);
  grunt.registerTask('lint', ['jshint', 'csslint']);
}
