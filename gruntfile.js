
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
                    compress: false,
                    beautify: true
                }
            },
            min:{
                src: ['src/**/*.js', 'tmp/**/*.js'],
                dest: 'dest/ngPopoverButton.min.js',
                options:{
                    mangle: true,
                    compress: true,
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
        }
    });

    grunt.registerTask('default', ['html2js', 'jshint', 'karma', 'less:normal','less:min', 'uglify:normal', 'uglify:min']);
    grunt.registerTask('test', ['html2js','karma']);
}