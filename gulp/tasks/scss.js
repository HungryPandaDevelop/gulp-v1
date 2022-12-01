import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие КСС
import webpcss from 'gulp-webpcss'; // Вывоб ВебП
import autoprefixer from 'gulp-autoprefixer'; // Добавление префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка media запросов

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, {sourcemaps: true})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: 'SCSS',
      massage: 'Error <%= error.message %>'
    }))
  )
  .pipe(app.plugins.replace(/@img\//g, 'img/'))
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(groupCssMediaQueries())
  .pipe(webpcss({
    webpcss: '.webp',
    noWebpClass: '.no-webp'
  }))
  .pipe(autoprefixer({
    grid: true,
    overrideBrowserslist: ['last 3 versions'],
    cascade: true
  }))
  .pipe(app.gulp.dest(app.path.build.css))
  .pipe(cleanCss())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(app.gulp.dest(app.path.build.css))
  .pipe(app.plugins.browsersync.stream());
}