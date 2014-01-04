module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    haml: {
      dev: {
        files: grunt.file.expandMapping(['app/view/**/*.haml'], 'dest/dev/', {
          rename: function(base, path) {
            return base + path.substr('app/view/'.length).replace(/\.haml$/, '.html');
          }
        }),
        options: {
          context: {
            isDevMode: true
          }
        }
      },
      prod: {
        files: grunt.file.expandMapping(['app/view/**/*.haml'], 'dest/prod/', {
          rename: function(base, path) {
            return base + path.substr('app/view/'.length).replace(/\.haml$/, '.html');
          }
        }),
        options: {
          context: {
            isDevMode: false
          }
        }
      }
    },
    watch: {
      devhaml: {
        files: 'app/view/**/*.haml',
        tasks: ['haml:dev']
      }
    },
    server: {
      dev: {
        port: 9000,
        alias: [
          {route: '/', path: 'dest/dev/'},
          {route: '/assets/js/angular/', path: 'app/bower_components/angular/'},
          {route: '/assets/js/goog/', path: 'app/bower_components/closure-library/closure/goog/'}
        ],
      }
    },
    concurrent: {
      dev: {
        tasks: ['server:dev', 'watch:devhaml'],
        options: {logConcurrentOutput: true}
      }
    }
  });

  grunt.registerMultiTask('server', 'Static server', function() {
    var done = this.async();
    var connect = require('connect');
    var app = connect();
    this.data.alias.forEach(function(a) {
      app.use(a.route, connect.static(a.path));
    });
    app.listen(this.data.port);
    grunt.log.write('Server available on http://localhost:9000\nWaiting forever...\n');
  });

  grunt.registerTask('dev', ['concurrent:dev']);
};
