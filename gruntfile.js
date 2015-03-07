
module.exports = function (grunt){
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma:{
            unit:{
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        less:{
            normal:{
                src: ['src/styles.less'],
                dest: 'dest/ngPopoverButton.css'
            },
            min:{
                src: ['src/styles.less'],
                dest: 'dest/ngPopoverButton.min.css',
                options:{
                    compress: true
                }
            }
        },
        uglify:{
            normal:{
                src: ['src/**/*.js', 'tmp/**/*.js'],
                dest: 'dest/ngPopoverButton.js',
                options:{
                    mangle: false,
                    beautify: true
                }
            },
            min:{
                src: ['src/**/*.js', 'tmp/**/*.js'],
                dest: 'dest/ngPopoverButton.min.js',
                options:{
                    mangle: true,
                    compress: {},
                    beautify: false
                }
            }
        },
        html2js:{
            all:{
                src: ['src/**/*.html'],
                dest: 'tmp/templates.js',
                options: {
                    module: 'templates',
                    base: ''
                }
            }
        },
        jshint:{
            all:{
                src: ['src/**/*.js']
            }
        },
        connect:{
            server:{
                options:{
                    open: {
                        target: 'http://localhost:8000/demo/index.html'
                    },
                    keepalive: true
                }
            }
        }
    });

    grunt.registerTask('build', ['html2js', 'jshint', 'less:normal','less:min', 'uglify:normal', 'uglify:min']);
    grunt.registerTask('default', ['build','karma']);
    grunt.registerTask('test', ['default']);
    grunt.registerTask('serve', ['build', 'connect:server']);
}