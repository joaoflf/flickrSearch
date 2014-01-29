module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    bases: ['src'],
                    livereload: true
                }
            }
        },

        watch: {
            sass: {
                files: ['src/styles/sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            /* watch and see if our javascript files change, or new packages are installed */
            js: {
                files: ['src/scripts/main.js', 'components/**/*.js'],
                tasks: ['uglify']
            },
            /* watch our files for change, reload */
            livereload: {
                files: ['src/*.html', 'src/css/*.css', 'src/images/*', 'src/scripts/{main.min.js, plugins.min.js}'],
                options: {
                    livereload: true
                }
            },
        },

        compass: {
            dev: {
                options: {
                    sassDir: ['src/styles/sass'],
                    cssDir: ['src/styles/css'],
                    environment: 'development'
                }
            },
        },

    });

    grunt.registerTask('server', [
        'express',
        'compass:dev',
        'watch'
    ]);
}
22