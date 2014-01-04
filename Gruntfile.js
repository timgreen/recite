module.exports = function(grunt) {

  var ssCompiler = require('superstartup-closure-compiler'),
      cTools     = require('closure-tools');

  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-mkdir');

  function bowerPath(filename) {
    return 'tmp/bower_components/' + filename;
  }
  function destPath(path) {
    return 'tmp/dest/' + path;
  }


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    haml: {
      dev: {
        files: grunt.file.expandMapping(['app/view/**/*.haml'], destPath('dev/'), {
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
        files: grunt.file.expandMapping(['app/view/**/*.haml'], destPath('prod/'), {
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
    mkdir: {
      prod: {
        options: {
          create: [destPath('prod/assets/js')]
        }
      },
    },
    closureDepsWriter: {
      options: {
        depswriter: cTools.getPath('build/depswriter.py'),
        root_with_prefix: [
          '"' + bowerPath('closure-library/closure/goog/') + ' ."',
          '"app/js .."',
        ],
      },
      devDeps: {
        dest: destPath('dev/deps.js'),
      }
    },
    closureBuilder: {
      options: {
        builder: cTools.getPath('build/closurebuilder.py'),
        compilerFile: ssCompiler.getPathSS(),
        compile: true,
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          define: ['\'goog.DEBUG=false\''],
          warning_level: 'verbose',
          jscomp_off: ['checkTypes', 'fileoverviewTags'],
          summary_detail_level: 3,
          output_wrapper: '(function(){%output%}).call(this);',
          externs: [
            bowerPath('angular-latest/closure/angular.js')
          ],
        }
      },
      app: {
        options: {
          inputs: 'app/js/main.js',
          closure_entry_point: 'dict.App.main'
        },
        src: [
          'app/js/',
          bowerPath('closure-library/closure/goog'),
          bowerPath('closure-library/third_party/closure/')
        ],
        dest: destPath('prod/assets/js/compiled.js')
      }
    },
    watch: {
      devHaml: {
        files: 'app/view/**/*.haml',
        tasks: ['haml:dev']
      },
      depsJs: {
        files: 'app/js/**/*.js',
        tasks: ['closureDepsWriter']
      }
    },
    server: {
      dev: {
        port: 9000,
        alias: [
          {route: '/', path: destPath('dev')},
          {route: '/assets/js/angular/', path: bowerPath('angular/')},
          {route: '/assets/js/goog/', path: bowerPath('closure-library/closure/goog/')},
          {route: '/assets/js/', path: 'app/js/'}
        ],
      }
    },
    concurrent: {
      dev: {
        tasks: ['server:dev', 'watch:devHaml', 'watch:depsJs'],
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

  grunt.registerTask('compileJs', ['mkdir:prod', 'closureBuilder']);
  grunt.registerTask('dev', ['haml:dev', 'closureDepsWriter', 'concurrent:dev']);
};
