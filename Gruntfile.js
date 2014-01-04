module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-closure-tools');

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
    closureDepsWriter: {
      options: {
        depswriter: 'app/bower_components/closure-library/closure/bin/build/depswriter.py',
        root_with_prefix: [
          '"app/bower_components/closure-library/closure/goog/ ."',
          '"app/js .."',
        ],
      },
      devDeps: {
        dest: 'dest/dev/deps.js',
      }
    },
    watch: {
      devhaml: {
        files: 'app/view/**/*.haml',
        tasks: ['haml:dev']
      },
      depsjs: {
        files: 'app/js/**/*.js',
        tasks: ['closureDepsWriter']
      }
    },
    server: {
      dev: {
        port: 9000,
        alias: [
          {route: '/', path: 'dest/dev/'},
          {route: '/assets/js/angular/', path: 'app/bower_components/angular/'},
          {route: '/assets/js/goog/', path: 'app/bower_components/closure-library/closure/goog/'},
          {route: '/assets/js/', path: 'app/js/'}
        ],
      }
    },
    concurrent: {
      dev: {
        tasks: ['server:dev', 'watch:devhaml', 'watch:depsjs'],
        options: {logConcurrentOutput: true, limit: 10}
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
