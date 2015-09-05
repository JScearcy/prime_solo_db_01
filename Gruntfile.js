module.exports = function(grunt) {
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     uglify: {
       my_target: {
         files: {
           'public/javascripts/app.min.js': 'client/javascripts/app.js'
         }
       }
     },
     copy: {
       main: {
         files: [
           {expand: true, cwd: 'client', src: 'stylesheets/*', dest: 'public/', filter: 'isFile'},
           {expand: true, cwd: 'client/javascripts', src: 'jquery.min.js', dest: 'public/javascripts', filter: 'isFile'},
           {expand: true, cwd: 'node_modules/bootstrap/dist/js', src: 'bootstrap.min.js', dest: 'public/javascripts', filter: 'isFile'},
           {expand: true, cwd: 'node_modules/bootstrap/dist/css', src: 'bootstrap.min.css', dest: 'public/stylesheets', filter: 'isFile'}
         ]
       }
     }
   })
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.registerTask('default', ['uglify', 'copy']);
};
