const app = require('./middlewares');
const router = require('./routes');
require('./db');

const port = 3000;

app.use(router);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});