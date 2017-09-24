import * as gulp from 'gulp'
import * as path from 'path'
import * as gulpUtil from 'gulp-util'
import * as uglify from 'gulp-uglify'
import * as runsequence from 'run-sequence'

gulp.task('minapi', () => {
    let srcpath = path.join(__dirname, "api/**/*");
    let destpath = path.join(__dirname, 'appmin/');
    return gulp.src(srcpath).pipe(uglify()).pipe(gulp.dest(destpath));
});