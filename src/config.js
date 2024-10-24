export const AppRoute = {
    Root: '/intern-pognali-2-8/',
    Catalog: '/intern-pognali-2-8/travelers/',
};

export const PagesTitle = {
    About: 'О сервисе',
    Root: 'Направления',
    Catalog: 'Попутчики',
};

export const ROUTES_LINK = {
    [AppRoute.Root]: PagesTitle.About,
    [AppRoute.Root]: PagesTitle.Root,
    [AppRoute.Catalog]: PagesTitle.Catalog,
};

export const APIRoute = {
    Countries: 'countries',
    Catalog: 'catalog',
    Paginate: 'paginate',
    Form: 'submit-form',
};

export const Status = {
    Idle: 'idle',
    Loading: 'loading',
    Success: 'success',
    Error: 'error',
};

export const NameSpace = {
    Data: 'DATA',
};

export const AVATARS = [
    'https://kinotv.ru/upload/delight.webpconverter/upload/setka-editor/877/h3iag5wrtxkom7gjz61v9a581isg6dxx.jpg.webp?1655915545221826',
    'https://yt3.googleusercontent.com/ytc/AIdro_k07JaBUtedB0wC-6EDx2zfI9nmd96A-gcf4zHLRCK2aQ=s900-c-k-c0x00ffffff-no-rj',
    'https://news.store.rambler.ru/img/449c00f26847d8a6e2e1b326e8a3d0cd?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen',
    'https://fotobase.co/files/img/photo/mila-kunis/mila-kunis-69.webp',
    'https://masterpiecer-images.s3.yandex.net/c352b1b9801c11ee9607720ccb3e265f:upscaled',
];

export const LETTERS = ["А","Б","В","Г","Д","Е","З","И","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ч","Ш","Э","Ю","Я"]

export const TRANSPORT_KINDS = ['fly', 'car', 'bicycle', 'run'];
