# Гайд по работе

Для начала работы необходимы:

- Пакетный менеджер `npm`
- Версия Node 18.18.0 или 20.15.1
- Для быстрой смены версий Node можно установить пакет `nvm`
- `nvm` команды ( `nvm install 18.18.0` после установки выполнить команду `nvm use 18.18.0` )

## 🐱‍💻 Команды

| Command                  | Action                                        |
| :----------------------- | :-------------------------------------------- |
| `npm install`            | Установить зависимости                        |
| `npm start`              | Запустить production build                    |
| `npm run build`          | Создать оптимизированный production build     |
| `npm run lint`           | Запустить линтер                              |

## 🚀 Структура

```text
├── public/                 # статические файлы (иконки, картинки и тп.)
│   ├── icons/
│   ├── images/
│   ├── favicon.ico
├── src/
│   ├── assets/             
│   │   ├── fonts/          # шрифты для локального подключения /font
│   |   ├── icons/
│   │   └── ...
│   ├── components/         # компоненты ( могут обладать бизнес-логикой )
│   │   ├── app/            # показан пример вызова экшна
│   │   ├── layout/
│   │   └── ..
│   ├── service/            # сервисные компоненты ( API )
│   │   ├── api.js          # подключение к бэкенду
│   │   ├── token.js        # фунцкии для добавления/удаления токена в localStorage
│   │   └── ...
│   ├── hooks/              # хуки
│   ├── pages/              # страницы ( лэйауты страниц )
│   │   ├── catalog/
│   │   └── main/
│   ├── store/              # хранилище (слайс, экшены ( запросы ), селекторы)
│   |   ├── data/           # слайс с селекторами
│   │   ├── token.js        # фунцкии для добавления/удаления токена в localStorage
│   |   └── ...
├── utils/                   # утилиты
│   └── ...
├── config.ts               # конфиг ( глобальные: enum, типы, статусы данных, константы и тд и тп )
├── package.json
└── ...
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
