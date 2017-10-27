import * as gulp from 'gulp'
import * as path from 'path'
import * as fs from 'fs'
import * as gulpUtil from 'gulp-util'
import * as uglify from 'gulp-uglify'
import * as runsequence from 'run-sequence'
import * as yaml from 'js-yaml'

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

gulp.task('swagger', () => {
    let swaggerYaml = path.join(__dirname, "api/swagger/swagger.yaml");
    gulp.watch(swaggerYaml, () => {
        let loadyaml = yaml.safeLoad(fs.readFileSync(swaggerYaml, 'utf8'));
        let jsonPath = path.join(__dirname, "docs/swagger.json");
        fs.writeFileSync(jsonPath, JSON.stringify(loadyaml, null, " "));
        return;
    });
});

gulp.task("default", () => {
    return runsequence(["api_min", "watch", "swagger"]);
});