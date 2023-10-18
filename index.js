const express = require('express');
const app = express();
const port = 3000;
const err403 = "<title>Error: attempt to penetrate</title><h1>403 - Access denied</h1>"

const {mongoose} = require('mongoose')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

// --------- ОБРАБОТЧИК ЗАПРЕТОВ ----------
app.use('/style.js', (req, res, next) => {
    if (req.hostname === 'newsplate.lekasnet.repl.co') {
        next();
    } else {
        res.status(403).send(err403);
    }
});
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


// --------- ПОДКЛЮЧЕНИЕ СТАТИКОВ ----------
app.use(express.static('public'));


// --------- ПОЛУЧЕНИЕ НОВОСТЕЙ ---------
mongoose.connect('mongodb://localhost/my-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Соединение с MongoDB успешно установлено');
    })
    .catch((error) => {
        console.error('Ошибка при подключении к MongoDB:', error);
    });

const newsSchema = new mongoose.Schema({
    title: String,
    text: String
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
            newsList: news,
            totalPages: totalPages,
            currentPage: page
        });
    } catch (err) {
        console.error('Ошибка при получении новостей из базы данных:', err);
    }
});

// --------- ДОБАВЛЕНИЕ НОВОСТЕЙ ---------
app.post('/news', (req, res) => {
    const {title, text} = req.body;

    const newNews = new New({title, text});

    newNews.save()
        .then(() => {
            console.log('Новость успешно добавлена в базу данных');
            res.redirect('/news');
        })
        .catch(error => console.error('Ошибка при добавлении новости в базу данных:', error));
});

// --------- ЗАПУСК СЕРВЕРА ----------
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});