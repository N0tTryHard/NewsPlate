const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const err403 = "<title>Error: attempt to penetrate</title><h1>403 - Access denied</h1>"


const {mongoose} = require('mongoose')
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://u3l5xzneivjduw17jx4n:0lnek9BeJpFkFuIcIxK5@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/byaacby4zi4fkbe?replicaSet=rs0', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        console.log('Соединение с MongoDB успешно установлено');
    })
    .catch((error) => {
        console.error('Ошибка при подключении к MongoDB:', error);
    });

app.set('view engine', 'ejs');

// --------- ОБРАБОТЧИК ЗАПРЕТОВ ----------
// app.use('/style.js', (req, res, next) => {
//     if (req.hostname === 'newsplate.lekasnet.repl.co') {
//         next();
//     } else {
//         res.status(403).send(err403);
//     }
// });
// app.use('/style.js', (req, res) => {
//   res.status(403).send(err403);
// });

// app.use('/index.js', (req, res) => {
//   res.status(403).send(err403);
// });

// app.use('/carousel.js', (req, res) => {
//   res.status(403).send(err403);
// });

// app.use('/carousel.css', (req, res) => {
//   res.status(403).send(err403);
// });

// app.use('/index.css', (req, res) => {
//   res.status(403).send(err403);
// });


// --------- АУТЕНТИФИКАЦИЯ ---------
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));

const userSchema = new mongoose.Schema({
    login: String,
    password: String
});
const User = mongoose.model('Users', userSchema);

app.post('/login', async (req, res) => {
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

app.get('/admin', async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const news = await New.find()
            res.render('admin', {newsList: news});
        } catch (err) {
            console.error('Ошибка при получении новостей из базы данных:', err);
        }
    } else {
        res.redirect('/login');
    }
});


// --------- ОБРАБОТЧИК ЗАПРОСОВ ----------
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/halls', (req, res) => {
    res.render('halls');
});

app.get('/contacts', (req, res) => {
    res.render('contacts');
});

app.get('/login', (req, res) => {
    res.render('login');
});


// --------- ПОДКЛЮЧЕНИЕ СТАТИКОВ ----------
app.use(express.static('public'));


// --------- ПОЛУЧЕНИЕ НОВОСТЕЙ ---------
const newsSchema = new mongoose.Schema({
    title: String, text: String
});

const New = mongoose.model('New', newsSchema);

app.get('/news', async (req, res) => {
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
            newsList: news, totalPages: totalPages, currentPage: page
        });
    } catch (err) {
        console.error('Ошибка при получении новостей из базы данных:', err);
    }
});

// --------- РАБОТА С НОВОСТЯМИ ---------
app.get('/admin', async (req, res) => {
    try {
        const news = await New.find();
        res.render('admin', {newsList: news});
    } catch (err) {
        console.error('Ошибка при получении новостей из базы данных:', err);
    }
});

app.post('/news/add', async (req, res) => {
    try {
        const {title, text} = req.body;
        const newNews = new New({title, text});
        await newNews.save();
        res.redirect('/admin');
    } catch (err) {
        console.error('Ошибка при добавлении новости в базу данных:', err);
    }
});

app.post('/news/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await New.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (err) {
        console.error('Ошибка при удалении новости из базы данных:', err);
    }
});


// --------- ЗАПУСК СЕРВЕРА ----------
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});