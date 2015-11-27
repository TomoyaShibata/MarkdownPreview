var babelify    = require('babelify');
var browserify  = require('browserify');
var browserSync = require('browser-sync');
var buffer      = require('vinyl-buffer');
var gulp        = require('gulp');
var node        = require('node-dev');
var source      = require('vinyl-source-stream');
var gulpStylus  = require('gulp-stylus');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var livereload  = require('gulp-livereload');

function errorHandler(err) {
    console.log('Error: ' + err.message);
}

// 自動ブラウザリロード
gulp.task('browser-sync', function() {
    browserSync({
        proxy: {
            target: 'http://localhost:3000'
        },
        port: 8080
    });
});

// Javascriptへのビルド
// ES6かつJSXなファイル群をbuild/bundle.jsへ変換する
gulp.task('build', function() {
    browserify({entries: ['./index.js']})
        .transform(babelify)
        .bundle()
        .on('error', errorHandler)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify());
});

// Stylus から CSS へのビルド
gulp.task('stylus', function() {
    gulp.src('styl/**/*.styl')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error %>')}))
        .pipe(gulpStylus({compress: true}))
        .pipe(gulp.dest('css/'))
        .pipe(notify());
});

// ローカルサーバーの起動
gulp.task('server', function() {
  node(['./server.js']);
});

// ファイルを監視して必要に応じたタスクを実行
gulp.task('watch', function() {
    gulp.watch('styl/**/*.styl'   , ['stylus']);
    gulp.watch('./index.js'       , ['build']);
    gulp.watch('./index.html'     , ['build']);
    gulp.watch('./components/**/*.js', ['build']);
});

// gulpコマンドで起動したときのデフォルトタスク
// gulp.task('default', ['server', 'build', 'watch', 'browser-sync']);
// まだサーバを使わないのでデフォルトタスクから省いている
gulp.task('default', ['build', 'watch']);