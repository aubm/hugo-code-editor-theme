var gulp = require('gulp');
var pkg = require('./package.json');
var semver = require('semver');
var util = require('gulp-util');
var bump = require('gulp-bump');
var conventionalChangelog = require('gulp-conventional-changelog');
var git = require('gulp-git');
var runSequence = require('run-sequence');

var releaseType = '';

gulp.task('bump', function(cb) {
    if (!semver.valid(pkg.version)) {
        util.log(util.colors.red('Error: invalid version number - ' + pkg.version));
        process.exit(1);
    }

    if (!releaseType.match(new RegExp(/major|minor|patch/))) {
        util.log(util.colors.red('Error : required bump \'type\' is missing ! Usage : npm run release --type (major|minor|patch)'));;
        return process.exit(1);
    }

    pkg.version = semver.inc(pkg.version, releaseType);
    gulp.src('./package.json')
        .pipe(bump({ version: pkg.version }))
        .pipe(gulp.dest('./'))
        .on('end', cb);
});

gulp.task('changelog', function(cb) {
    gulp.src('./CHANGELOG.md', { buffer: false })
        .pipe(conventionalChangelog({ preset: 'angular' }))
        .pipe(gulp.dest('./'))
        .on('end', cb);
});

gulp.task('commit-changelog', function(cb) {
    gulp.src(['./CHANGELOG.md', './package.json'])
        .pipe(git.add())
        .pipe(git.commit('chore(release): ' + pkg.version))
        .on('end', cb);
});

gulp.task('create-version-tag', function(cb) {
    git.tag('v' + pkg.version, 'release v' + pkg.version, function(err) { if (err) throw err; cb(); });
});

gulp.task('push-to-origin', function(cb) {
    git.push('origin', 'master', { args: '--follow-tags' }, function(err) { if (err) throw err; cb(); });
});

gulp.task('release', function(cb) {
    runSequence('bump', 'changelog', 'commit-changelog', 'create-version-tag', 'push-to-origin', cb);
});

gulp.task('release-major', function() { releaseType = 'major'; gulp.start('release'); });
gulp.task('release-minor', function() { releaseType = 'minor'; gulp.start('release'); });
gulp.task('release-patch', function() { releaseType = 'patch'; gulp.start('release'); });
