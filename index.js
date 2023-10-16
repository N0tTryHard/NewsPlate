const express = require('express');
const app = express();
const port = 3000;
const err403 = "<title>Error: attempt to penetrate</title><h1>403 - Access denied</h1>"

const {mongoose} = require('mongoose')


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

app.get('/news', (req, res) => {
    res.render('news');
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
mongoose.connect('mongodb://127.0.0.1:27017', {
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

app.get('/newssection', (req, res) => {
    New.find({}, function (err, news) {
        if (err) {
            console.error('Ошибка при получении новостей из базы данных:', err);
            return;
        }
        res.render('newssection', {
            newsList: news
        });
    });
});


// --------- ЗАПУСК СЕРВЕРА ----------
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});