const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


// mySQL Connection 
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'prod_categ_db',
    debug: false,
    multipleStatements: true
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


app.use(session({
    secret:'him',
    saveUninitialized:true,
    resave:true
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


app.get('/', (req,res)=>{
    res.render('index');
});


//////////////// PRODUCTS DATA ///////////////////
// dispaly All Items (products) 
app.get('/product', (req,res)=>{
    //let sql1 = 'SELECT * FROM products categories';
    let sql = 'SELECT * FROM categories;SELECT * FROM products P , categories C WHERE P.category_id = C.id';
    mysqlConnection.query(sql, [1, 2],(err,rows)=>{
        if (!err) {
            //console.log(rows[1])
            res.render('product',{
                products:rows[1],
                categories:rows[0]
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
	let data = {nameP: req.body.name, price: req.body.price, category_id: req.body.category_id};
    let sql = "INSERT INTO products SET ?"
    let query = mysqlConnection.query(sql,data,(err)=>{
        if(err) throw err;
        if (query) {
            req.flash('success', 'Product Added Success !!!')
            res.redirect('/product');
        }else{
            req.flash('error', 'Added failed ! Please Try Again!')
        }
    });
});


// EDIT Item (products) 
app.get('/product/edit/:id',(req,res)=>{
    var Uid = req.params.id;
    let sql = 'SELECT * FROM products P , categories C WHERE P.category_id = C.id WHERE Pid ='+Uid;
    mysqlConnection.query(sql,(err,result)=>{
        if(!err)
        console.log(result[1]),
        res.redirect('/product',{
           productEdit:result[0]
           
        });
        else
        console.log(err);        
    })
});
app.post('/product/update', (req, res) => {
    var Uid = req.body.id;
    let sql = "UPDATE products SET nameP = '"+req.body.name+"', price = '"+req.body.price+"', category_id = '"+req.body.category_id+"' WHERE Pid ="+Uid;
    mysqlConnection.query(sql,(err)=>{
        if(!err) {
        //res.redirect('/product');
            req.flash('success', 'Product Updated Success !!!')
            res.redirect('/product');
        }else
            req.flash('error', 'Updated failed ! Please Try Again')
    });
});


// Delete Item (products) to Table
app.get('/product/remove/:id',(req,res)=>{    
    let sql = 'DELETE FROM products WHERE Pid = ?';
    let query = mysqlConnection.query(sql,[req.params.id],(err)=>{
        if(!err){
            if(query){
                req.flash('success', 'Product Deleted Success !!!');
                res.redirect('/product'); 
            }else{
                req.flash('error', 'Product Deleted faild ');
            }
        }
        else
        console.log(err);
    })
})


//////////////// CATEGORIES DATA ///////////////////


app.listen(port, () => console.log(`listening on port ${port}`));