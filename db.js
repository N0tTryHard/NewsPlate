const mongoose = require('mongoose');

mongoose.connect('mongodb://u3l5xzneivjduw17jx4n:0lnek9BeJpFkFuIcIxK5@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/byaacby4zi4fkbe?replicaSet=rs0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Соединение с MongoDB успешно установлено');
    })
    .catch((error) => {
        console.error('Ошибка при подключении к MongoDB:', error);
    });