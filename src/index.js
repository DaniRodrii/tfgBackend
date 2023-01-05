require('./bbdd');
const app = require('./app');

app.listen(app.get('port'), () => console.log('ok', app.get('port')));