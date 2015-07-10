var gulp = require("gulp"),
	wiredep = require('wiredep').stream,
	autoprefixer = require('gulp-autoprefixer'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css');
 
//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css/'));
});

//wiredep
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      'directory' : "app/bower/"
    }))
    .pipe(gulp.dest('./app'));
});

//useref
gulp.task('html', function () {
    var assets = useref.assets();
    
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});


//default
gulp.task('use',[ 'prefix' , 'bower'])