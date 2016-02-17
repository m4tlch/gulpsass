# Gulp для SASS

1. Устанавливаем livereload для браузера - https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?utm_source=chrome-app-launcher-info-dialog
2. В настройках расширения в хроме включаем "Allow access to file URLs"
3. Переносим файлы .gitignore gulpfile.js bower.json package.json в корень проекта
4. Настраиваем переменные текущего рабочего окружения. В репозитории лежит папка view, по ней настроен gulpfile.js. Для примера: в корне сайта лежит папка views, и в ней все ресурсы, тогда пути будут такими:

    styles_source: 'view/scss/',
    styles_destination: 'view/css/',

5. Настроив рабочее окружение, запускаем установку нужных модулей, для этого надо выполнить команду в консоли
npm install
6. После установки, выполняем команду gulp для запуска watcher
7. Если запустить gulp с параметром --prod , то стили будут минифицированы, а скрипты конкатенированы и аглифицированы.