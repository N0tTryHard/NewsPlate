const express = require('express');
const router = express.Router();

const {User, New} = require('./models');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/hall1', (req, res) => {
    res.render('hall1');
});

router.get('/contacts', (req, res) => {
    res.render('contacts');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = User.findOne({username, password}).exec();

        if (user) {
            req.session.loggedIn = true;
            res.redirect('/admin');
        } else {
            res.send('Неправильный логин или пароль');
        }
    } catch (error) {
        console.error('Ошибка при поиске пользователя:', error);
        res.send('Произошла ошибка');
    }
});

router.get('/admin', async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const news = await New.find();
            res.render('admin', {newsList: news});
        } catch (err) {
            console.error('Ошибка при получении новостей из базы данных:', err);
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/news', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const count = await New.countDocuments({});
        const totalPages = Math.ceil(count / limit);

        const news = await New.find()
            .skip(skip)
            .limit(limit);

        res.render('news', {
            newsList: news,
            totalPages: totalPages,
            currentPage: page
        });
    } catch (err) {
        console.error('Ошибка при получении новостей из базы данных:', err);
    }
});

router.post('/news/add', async (req, res) => {
    try {
        const {title, text} = req.body;
        const newNews = new New({title, text});
        await newNews.save();
        res.redirect('/admin');
    } catch (err) {
        console.error('Ошибка при добавлении новости в базу данных:', err);
    }
});

router.post('/news/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await New.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (err) {
        console.error('Ошибка при удалении новости из базы данных:', err);
    }
});

router.use(function (req, res, next) {
    res.status(404).send("<h1>Error 404: Страница не найдена</h1>");
});

// Обработчик ошибки 500 (внутренняя ошибка сервера)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("<h1>Error 500: Внутренняя ошибка сервера</h1>\n" +
        "<div style='opacity: 0.3'>Не волнуйтесь, это не ваша ошибка, вскоре мы исправим проблему</div>");
});

// Обработчик ошибки 403 (доступ запрещен)
router.use((req, res, next) => {
    res.status(403).send("<h1>Error 403: Доступ запрещён</h1>");
});

// Обработчик ошибки 400 (неверный запрос)
router.use((req, res, next) => {
    res.status(400).send("<h1>Error 400: Не верный запрос</h1>");
});

// Обработчик ошибки 401 (неавторизован)
router.use((req, res, next) => {
    res.status(401).render('error', {message: 'Неавторизован'});
});

module.exports = router;