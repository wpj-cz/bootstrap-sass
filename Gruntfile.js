module.exports = function(grunt) {

  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
	return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      defaultPath: 'assets',
      installPath: '../../engine/admin/static/bootstrap'
    },
    csscomb: {
      options: {
        config: '<%= meta.defaultPath %>/stylesheets/.csscomb.json'
      },
      dist: {
        files: {
          '<%= meta.installPath %>/css/<%= pkg.name %>.css': '<%= meta.installPath %>/css/<%= pkg.name %>.css'
        }
      }
    },
    cssmin: {
      options: {
          keepSpecialComments: 0
      },
      dist: {
        files: {
          '<%= meta.installPath %>/css/<%= pkg.name %>.min.css': '<%= meta.installPath %>/css/<%= pkg.name %>.css'
        }
      }
    },
    sass: {
      dist: {
        files: {
          '<%= meta.installPath %>/css/<%= pkg.name %>.css': '<%= meta.defaultPath %>/stylesheets/<%= pkg.name %>.scss'
        },
        options: {
          style: 'expanded',
          sourcemap: 'true'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.registerTask('task-css', ['sass', 'csscomb', 'cssmin']);
  grunt.registerTask('task', ['task-css']);
  grunt.registerTask('build', ['task']);
  grunt.registerTask('default', ['task']);

};
