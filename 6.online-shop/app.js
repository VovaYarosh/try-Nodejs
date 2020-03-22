let express = require('express');
let app = express();
let cookieParser = require('cookie-parser')

let admin = require('./admin')

app.use(express.static('public'));

app.set('view engine', 'pug');

let mysql = require('mysql');

app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser())

const nodemailer = require('nodemailer')

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'shop'
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

app.listen(3000, function () {
  console.log('node express work on 3000');
});

app.use(function(req,res,next){
  if(req.originalUrl == '/admin' || req.originalUrl == '/admin-order'){
    admin(req,res,con,next)
  }else{
    next()
  }
})


app.get('/', function (req, res) {
  let cat = new Promise(function (resolve, reject) {
    con.query(
      "select id,name, cost, image, category from (select id,name,cost,image,category, if(if(@curr_category != category, @curr_category := category, '') != '', @k := 0, @k := @k + 1) as ind   from goods, ( select @curr_category := '' ) v ) goods where ind < 3",
      function (error, result, field) {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
  let catDescription = new Promise(function (resolve, reject) {
    con.query(
      "SELECT * FROM category",
      function (error, result, field) {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
  Promise.all([cat, catDescription]).then(function (value) {
    res.render('index', {
      goods: JSON.parse(JSON.stringify(value[0])),
      cat: JSON.parse(JSON.stringify(value[1])),
    });
  });
});

app.get('/cat', function (req, res) {
  let catId = req.query.id;

  let cat = new Promise(function (resolve, reject) {
    con.query(
      'SELECT * FROM category WHERE id=' + catId,
      function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
  });
  let goods = new Promise(function (resolve, reject) {
    con.query(
      'SELECT * FROM goods WHERE category=' + catId,
      function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
  });

  Promise.all([cat, goods]).then(function (value) {
    res.render('cat', {
      cat: JSON.parse(JSON.stringify(value[0])),
      goods: JSON.parse(JSON.stringify(value[1]))
    });
  })
});

app.get('/goods', function (req, res) {
  con.query('SELECT * FROM goods WHERE id=' + req.query.id, function (error, result, fields) {
    if (error) throw error;
    res.render('goods', { goods: JSON.parse(JSON.stringify(result)) });
  });
});

app.get('/order', function (req, res) {
    res.render('order');
  });

app.post('/get-category-list', function (req, res) {
  con.query('SELECT id, category FROM category', function (error, result, fields) {
    if (error) throw error;
    console.log(result)
    res.json(result);
  });
});

app.post('/get-goods-info', function (req, res) {
  if (req.body.key.length != 0) {
    con.query('SELECT id,name,cost FROM goods WHERE id IN (' + req.body.key.join(',') + ')', function (error, result, fields) {
      if (error) throw error;
      let goods = {};
      for (let i = 0; i < result.length; i++) {
        goods[result[i]['id']] = result[i];
      }
      res.json(goods);
    });
  }
  else {
    res.send('0');
  }
});


app.post('/finish-order', function(req,res){
  if(req.body.key.length !=0){
    let  key = Object.keys(req.body.key);
    con.query(
      'SELECT id,name,cost FROM goods WHERE id IN (' + key.join(',') + ')', 
      function (error, result, fields) {
      if (error) throw error;
      sendMail(req.body,result).catch(console.error);
      saveOrder(req.body,result)
      res.send('1')
      });
  }else{
    res.send('0')
  }
})


app.get('/admin', function (req, res) {
      res.render('admin',{})
});

app.get('/admin-order', function (req, res) {
    con.query(`SELECT
  shop_order.id as id,
  shop_order.user_id as user_id,
  shop_order.goods_id as goods_id,
  shop_order.goods_cost as goods_cost,
  shop_order.goods_amount as goods_amount,
  shop_order.total as total,
  from_unixtime(date,"%Y-%m-%d %h:%m") as human_date,
  user_info.user_name as user,
  user_info.user_phone as phone,
  user_info.address as address
  FROM
  shop_order
  LEFT JOIN
  user_info
  ON shop_order.user_id = user_info.id ORDER BY id DESC
  `, function (error, result, fields) {
    if (error) throw error;
    res.render('admin-order', { order: JSON.parse(JSON.stringify(result)) });
  });
  })

app.get('/login', function (req, res) {
  res.render('login', {});
})

app.post('/login', function (req, res) {

  con.query(
    'SELECT * FROM user WHERE login="' + req.body.login+'" and password="'+req.body.password+'"',
    function (error, result) {
      console.log(result.length)
      if (error) reject(error);
      if(result == 0){
        console.log('error user not found')
        res.redirect('/login')
      }else{
        result = JSON.parse(JSON.stringify(result));
        let hash = makeHash(16)
        res.cookie('hash', hash)
        res.cookie('id',result[0]['id'])
        sql = "UPDATE  user SET hash='"+ hash +"'WHERE id="+result[0]['id'];
        con.query(sql, function(error,resultQ){
          if (error) throw error;
          res.redirect('/admin')
        })
      }
    });
});

function saveOrder(data,result){
  let sql;
  sql = "INSERT INTO user_info(user_name,user_phone,user_email,address) VALUES ('"+data.username+"','"+data.phone+"','"+data.email+"','"+data.address+"')"
  con.query(sql,function(error,result2){
    if(error)throw error
    console.log('1 user info saved!')
    let userId = result2.insertId
    date = new Date()/1000;
    for(let i = 0; i < result.length; i++){
      sql = "INSERT INTO shop_order(date, user_id, goods_id,goods_cost,goods_amount, total) VALUES ("+date+","+userId+"," +result[i]['id']+","+result[i]['cost']+","+data.key[result[i]['id']]+","+data.key[result[i]['id']]*result[i]['cost']+")"
      con.query(sql,function(error,result){
        if(error) throw error
        console.log('1 goods saved')
      })
    }
  })
}

async function sendMail(data,result){
  let res = '<h2>Order in a lite shop';
  let total = 0;
  for(let i=0; i < result.length; i++){
    res +=`<p>${result[i]['name']} - ${data.key[result[i]['id']]} - ${result[i]['cost']*data.key[result[i]['id']]} Uah</p>`
    total+=result[i]['cost']*data.key[result[i]['id']]
  }
  console.log(res)
  res += '<hr>';
  res += `Total ${total} uah`;
  res+= `<hr>Phone: ${data.phone}`;
  res+= `<hr>Username: ${data.username}`;
  res+= `<hr>Address: ${data.address}`;
  res+= `<hr>Email: ${data.email}`;

  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  let mailOption = {
    from: '<vovayaroshlenovo94@gmail.com>',
    to: "vovayaroshlenovo94@gmail.com,"+ data.email,
    subject: "Lite shop order",
    text:"hello world",
    html: res
};
  let info = await transporter.sendMail(mailOption);
  console.log("MessageSent: %s", info.messageId)
  console.log("PreviewSent: %s", nodemailer.getTestMessageUrl(info))
  return true;
}


function makeHash(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}