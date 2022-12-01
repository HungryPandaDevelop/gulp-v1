import fileInclude from 'gulp-file-include'; // вставка html кусков
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import { tree } from 'gulp';

export const html = () => {
  return app.gulp.src(app.path.src.html)
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: 'Html',
      massage: 'Error <%= error.message %>'
    }))
  )
  .pipe(pug({
    pretty: true, // сжатие html
    verbose: true, // показывать в терминале какой файл обработан
  }))
  // .pipe(fileInclude())
  .pipe(app.plugins.replace(/@img\//g, 'img/'))
  .pipe(webpHtmlNosvg())
  .pipe(
    versionNumber({
      'value': '%DT%',
      'append':{
        'key':'_v',
        'cover': 0,
        'to':[
          'css',
          'js'
        ]
      },
      'output':{
        'file':'gulp/version.json'
      }
    })
  )
  .pipe(app.gulp.dest(app.path.build.html));
};