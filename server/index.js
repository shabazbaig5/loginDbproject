const express = require('express');
const app = express();
const router = require('./router/routes');



app.set('view engine', 'pug');

app.use(express.static('public'));

app.set('views',__dirname+'/views');



app.use('/',router());


app.listen(3000, () => {
    console.log("listening to the port 3000");
});