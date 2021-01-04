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
    console.log('DATABASE Connection failed' + JSON.stringify(err,2));
});

app.set('views', './views');
app.set('view engine', 'ejs'); 

app.get('/', (req,res)=>{
    res.render('index');
});

// dispaly All Items (products) 
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
});

//Create New Item (products)
app.get('/add', (req, res) => {
	res.render('add');
});  

app.post('/add', (req, res) => {
	const { image, name,ville,typeOfSurf} = req.body;
 
	users.push({ ID: users.length+1,name:name,price:price,category_id:category_id });
	fs.writeFileSync('./data/users.json', JSON.stringify(users, null));
	res.redirect('/'); 
});

app.listen(port, () => console.log(`listening on port ${port}`));