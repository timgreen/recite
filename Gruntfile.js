module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-haml');

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
    }
  });
};
