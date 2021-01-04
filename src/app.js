const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'prod_categ_db'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DATABASE Connection Succeded');
    else
    console.log('DATABASE Connection failed' + JSON.stringify(err, underfined,2));
});

app.set('views', './views');
app.set('view engine', 'ejs'); 

app.get('/', (req,res)=>{
    res.render('index');
});
app.get('/product', (req,res)=>{
    let sql = 'SELECT * FROM products';
    mysqlConnection.query(sql,(err,rows,fields)=>{
        if (!err) {
            res.render('product',{
                products:rows,
            });

        }else{
            console.log(err);
        }
    })
    //res.render('product');
});


app.listen(port, () => console.log(`listening on port ${port}`));