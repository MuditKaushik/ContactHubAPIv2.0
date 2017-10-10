import * as gulp from 'gulp'
import * as path from 'path'
import * as gulpUtil from 'gulp-util'
import * as uglify from 'gulp-uglify'
import * as runsequence from 'run-sequence'

gulp.task('api_min', () => {
    let srcpath = path.join(__dirname, "app/**/*.js");
    let destpath = path.join(__dirname, 'appmin/');
    return gulp.src(srcpath).pipe(uglify()).pipe(gulp.dest(destpath));
});

gulp.task("watch", () => {
    let srcpath = path.join(__dirname, "app/**/*.js");
    let destpath = path.join(__dirname, 'appmin/');
    gulp.watch(srcpath, () => {
        return gulp.src(srcpath).pipe(uglify()).pipe(gulp.dest(destpath));
    });
});

gulp.task("default", () => {
    return runsequence(["api_min", "watch"]);
});