const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

// mysqlConnection 
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
    console.log('DATABASE Connection failed' + JSON.stringify(err));
});

// set views file 
app.set('views', path.join(__dirname,'views'));

// set view engine 
app.set('view engine', 'ejs'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res)=>{
    res.render('index');
});

//////////////// PRODUCTS DATA ///////////////////
// dispaly All Items (products) 
app.get('/product', (req,res)=>{
    let sql = 'SELECT products.*, categories.name FROM products INNER JOIN categories WHERE products.category_id = categories.id';
    mysqlConnection.query(sql,(err,rows)=>{
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
	res.render('product');
});  

app.post('/save', (req, res) => {
	let data = {name: req.body.name, price: req.body.price, category_id: req.body.category_id};
    let sql = "INSERT INTO products SET ?"
    let query = mysqlConnection.query(sql,data,(err, results)=>{
        if(err) throw err;
        res.redirect('/product');
    });
});


// Delete Item (products) to Table
app.get('/product/remove/:id',(req,res)=>{
    let sql = 'DELETE FROM products WHERE id = ?';
    mysqlConnection.query(sql,[req.params.id],(err)=>{
        if(!err)
        res.redirect('/product');
        else
        console.log(err);
    })
})


//////////////// CATEGORIES DATA ///////////////////
app.get('/product', (req,res)=>{
    let sql = 'SELECT * FROM categories';
    mysqlConnection.query(sql,(err,rows)=>{
        if (!err) {
            res.render('product',{
                categories:rows,
            });
        }else{
            console.log(err);
        }
    })
});


app.listen(port, () => console.log(`listening on port ${port}`));