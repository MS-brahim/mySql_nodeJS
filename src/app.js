const express = require('express');
const app = express();
const path = require("path");


app.set('views', './views');
app.set('view engine', 'ejs'); 

app.get('/', (req,res)=>{
    //res.sendFile(path.join(__dirname + '//views/index.html'));
    res.render('index');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));