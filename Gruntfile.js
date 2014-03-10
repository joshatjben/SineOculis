module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          browsers: ['Chrome'],
          singleRun: true,
          files: [
            'lib/*.js',
            'test/**/*.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('default', ['karma']);
};
