var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imageminJpegtran = require('imagemin-jpegtran'),
    jpegoptim = require('imagemin-jpegoptim'),
    imageminMozjpeg = require('imagemin-mozjpeg');
 
//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css/'));
});

//Compress img
gulp.task('imagePng',function(){
            return gulp.src('app/img/*.png')
                .pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [pngquant({quality: '40', speed: 4})]
                }))
                .pipe(gulp.dest('dist/img/'));
});

//Compress imgJpg
gulp.task('imageJpg',function(){
            return gulp.src('app/img/*.jpg')
            .pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [imageminMozjpeg({quality: '60', speed: 11})]
                }))
            .pipe(gulp.dest('dist/img/'));
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
gulp.task('use',[ 'prefix' , 'bower']);
gulp.task('img',[ 'imagePng' , 'imageJpg']);
