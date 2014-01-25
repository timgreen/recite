module.exports = function(grunt) {

  var ssCompiler = require('superstartup-closure-compiler'),
      cTools     = require('closure-tools');

  grunt.loadNpmTasks('grunt-closure-linter');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-mkdir');

  function bowerPath(filename) {
    return 'tmp/bower_components/' + filename;
  }
  function destPath(path) {
    return 'tmp/dest/' + path;
  }
  function angularPrecompilePath(path) {
    return destPath('angularPrecompile/') + (path || '');
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
    copy: {
      prod: {
        files: [
          {
            expand: true,
            cwd: 'app/chrome/',
            src: ['*'],
            dest: destPath('prod/')
          },
          {
            expand: true,
            cwd: 'app/images/',
            src: ['**/*'],
            dest: destPath('prod/assets/images/')
          },
          {
            src: bowerPath('angular/angular.min.js'),
            dest: destPath('prod/assets/js/angular.min.js')
          },
          {
            src: bowerPath('dropbox-datastores-1.0-latest/index.js'),
            dest: destPath('prod/assets/js/dropbox-datastores-1.0-latest.js')
          }
        ]
      }
    },
    less: {
      prod: {
        options: {
          paths: 'app/',
        },
        files: {
          'tmp/dest/prod/assets/compiled.css': destPath('dev/imports.less')
        }
      }
    },
    closureDepsWriter: {
      options: {
        depswriter: cTools.getPath('build/depswriter.py'),
        root_with_prefix: [
          '"' + bowerPath('closure-library/closure/goog/') + ' ."',
          '"' + bowerPath('closure-library/third_party/closure/goog/') + ' ../third_party_goog"',
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
        compilerFile: ssCompiler.getPath(),
        compile: true,
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          define: ['\'goog.DEBUG=false\''],
          warning_level: 'verbose',
          jscomp_error: [
            'accessControls',
            'checkRegExp',
            'const',
            'constantProperty',
            'strictModuleDepCheck',
            'visibility',
          ],
          jscomp_off: [
            'fileoverviewTags',
          ],
          summary_detail_level: 3,
          output_wrapper: '(function(){%output%}).call(this);',
          js: bowerPath('closure-library/closure/goog/deps.js'),
          externs: [
            'externs/dropbox.js',
            bowerPath('angular-latest/closure/angular.js')
          ],
        }
      },
      app: {
        options: {
          namespaces: 'recite.angular.App',
        },
        src: [
          angularPrecompilePath('app/js/'),
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
      },
      lessFiles: {
        files: 'app/css/**/*.less',
        tasks: ['genLessImports'],
        options: {
          event: ['added', 'deleted'],
        }
      }
    },
    server: {
      dev: {
        port: 9000,
        alias: [
          {route: '/', path: destPath('dev')},
          {route: '/assets/js/angular/', path: bowerPath('angular/')},
          {route: '/assets/js/goog/', path: bowerPath('closure-library/closure/goog/')},
          {
            route: '/assets/js/third_party_goog/',
            path: bowerPath('closure-library/third_party/closure/goog/')
          },
          {route: '/assets/js/less/', path: bowerPath('less/dist/')},
          {route: '/assets/js/', path: 'app/js/'},
          {route: '/assets/css/', path: 'app/css/'},
          {route: '/assets/images/', path: 'app/images/'},
        ],
      },
      prod: {
        port: 9001,
        alias: [
          {route: '/', path: destPath('prod')},
          {route: '/assets/images/', path: 'app/images/'},
        ],
      },
    },
    concurrent: {
      dev: {
        tasks: ['server:dev', 'watch:devHaml', 'watch:depsJs', 'watch:lessFiles'],
        options: {logConcurrentOutput: true, limit: 10}
      }
    },
    closureLint: {
      app: {
        closureLinterPath: '/usr/bin/',
        command: 'python2 node_modules/closure-linter-wrapper/tools/gjslint.py --max_line_length=100',
        src: [
          'app/js/**/*.js',
          'app/chrome/main.js',
          'app/chrome/background.js',
          'externs/dropbox.js',
        ],
        options: {
          stdout: true,
          strict: true
        }
      }
    },
    closureFixStyle: {
      app: {
        closureLinterPath: '/usr/bin/',
        command: 'python2 node_modules/closure-linter-wrapper/tools/fixjsstyle.py --max_line_length=100',
        src: [
          'app/js/**/*.js',
          'externs/dropbox.js',
        ],
        options: {
          stdout: true,
          strict: true
        }
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
    grunt.log.write(
        'Server available on http://localhost:' + this.data.port + '\nWaiting forever...\n');
  });

  grunt.registerTask(
      'angularPrecompile',
      'Protect angular proprieties from closure compiler',
      function() {
        var jsFiles = grunt.file.expand('app/js/**/*.js');
        grunt.file.delete(angularPrecompilePath(), {force: true});
        jsFiles.forEach(function(jsFile) {
          var dest = angularPrecompilePath(jsFile);
          var destDir = dest.replace(/\/[^/]+$/, '');
          grunt.file.mkdir(destDir);
          var input = grunt.file.read(jsFile);
          // $scope.abc         => $scope['abc']
          // $scope.$parent.abc => $scope['$parent']['abc']
          var output = input.replace(/(\$\w+)((\.\$?\w+)+)/g, function(match, first, rest) {
            var result = [first];
            var parts = rest.substr(1).split('\.')
            var flagContinue = true;
            parts.forEach(function(part) {
              if (flagContinue) {
                result.push('[\'', part, '\']');
              } else {
                result.push('.' + part);
              }
              flagContinue = (part[0] === '$');
            });
            return result.join('');
          });
          grunt.file.write(dest, output);
        });
      });

  grunt.registerTask('genLessImports', 'Generate less imports file for dev mode to include',
      function() {
        var importsFile = destPath('dev/assets/imports.less');
        var lessFiles = grunt.file.expand('app/css/**/*.less');
        var imports = [];
        lessFiles.forEach(function(lessFile) {
          imports.push(
            '@import "' + lessFile.substr(4) + '";'
          );
        });
        grunt.file.write(importsFile, imports.join('\n'));
      });

  grunt.registerTask('compileJs', ['mkdir:prod', 'angularPrecompile', 'closureBuilder']);
  grunt.registerTask('compileCss', ['genLessImports', 'less:prod']);
  grunt.registerTask('dev', ['haml:dev', 'genLessImports', 'closureDepsWriter', 'concurrent:dev']);
  grunt.registerTask('prod', ['compileJs', 'compileCss', 'haml:prod', 'copy:prod']);
  grunt.registerTask('test', ['haml', 'compileJs', 'closureLint']);
};
