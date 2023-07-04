// this is a server
const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true})); // body object is now accessible

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://comments_4ews_user:C2OTkpFo5Lv0OOyFUWIVaU6P9M9YaCtf@dpg-cii8bpiip7vpelqhkkeg-a.singapore-postgres.render.com/comments_4ews',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

let comments = []

// get all the comment
app.get('/', (req, res)=>{
    res.redirect('/users');
})

app.get('/initDB', async (req, res)=>{
    const dropTable = await client.query('DROP TABLE comments');
    const createTable = await client.query('CREATE TABLE IF NOT EXISTS comments(id INT, name TEXT, comment TEXT, phone TEXT, email TEXT);');
    const firstValue = await client.query(`INSERT INTO comments(id, name, comment, phone, email) VALUES(1, 'Shashank', 'this is a test comment.', '9910712463', 'shashankc1705@gmail.com');`);
    res.redirect('/users');
})

app.get('/users', async (req, res)=>{
    const result = await client.query('SELECT * FROM comments ORDER BY id;');
    comments = result.rows;
    // console.log(comments)
    res.render('index', {comments}); // views > index.ejs, {passing data to ejs file}
})

// new user form
app.get('/users/new', (req, res)=>{
    res.render('forms');
})

// after new user created/ user edited
app.post('/users', async (req, res)=>{

    if(req.body.nore == 'new'){
        const result1 = await client.query('SELECT id FROM comments ORDER BY id DESC LIMIT 1');
        const nc = {
            id: result1.rows[0].id + 1, // OR USE UUID PACKAGE
            ...req.body
        }
        const result2 = await client.query(`INSERT INTO comments(id, name, comment, phone, email) VALUES (${nc.id}, '${nc.name}', '${nc.comments}', '${nc.phone}', '${nc.email}');`);
    }
    else{
        // console.log(req.body);
        const result3 = await client.query(`UPDATE comments SET name='${req.body.name}', phone='${req.body.phone}', email='${req.body.email}', comment='${req.body.comments}' WHERE id=${req.body.nore};`);
    }
    res.redirect('/users');
})

// showing particular employee
app.get('/users/:id', async (req, res)=>{
    const {id} = req.params;
    const foundEmp = await client.query(`SELECT * FROM comments where id=${id}`);
    var foundRow = foundEmp.rows[0];
    res.render('show', {foundRow});
})

// editing an employee
app.get('/users/:id/edit', async (req, res)=>{
    const {id} = req.params;
    const foundEmp = await client.query(`SELECT * FROM comments where id=${id}`);
    var foundRow = foundEmp.rows[0];
    res.render('edit', {foundRow});
})

// deleting
app.get('/users/:id/delete', async (req, res)=>{
    const {id} = req.params;
    const result1 = await client.query(`DELETE FROM comments WHERE id=${id}`);
    res.redirect('/users');
})

const port = process.env.PORT || 5432;

app.listen(port, ()=>{
    console.log('server connected');
})
