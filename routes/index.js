var express = require('express');
var router = express.Router();

// database
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'momoko2019',
  database: 'fookbest',
  multipleStatements: true
})
db.connect();

// function 
function convertRow2Arr(raw) {
  let arr = [];
  for (i in raw) {    
    let obj = {};
    for (j in raw[i]) {    
      obj[j] = raw[i][j];
    }  
    arr.push(obj);
  }  
  return arr;
}

///*** GET home page. ***///
let username = 'Kittipong';
let usernickname = 'Tent';
let userimg = '/images/tent.jpg';

// === get -> refresh post === //
router.get('/', function(req, res, next) {  
  // === express -> db -> express
  let query = 'SELECT * FROM home_posted';
  db.query(query, (error, result) => {      
    //console.log(convertRow2Arr(result));    
    // === express -> home_page
    res.render('index', { 
      title: 'Fookbace',
      firstname: username, 
      nickname: usernickname,    
      main_img: userimg,    
      arr_home_posted: convertRow2Arr(result)
    });
  })  
});

// === get -> refresh comment === //
router.get('/:idhome_posted', function(req, res, next) {    
  // === express -> db -> express
  let query = 'SELECT idcomment_home_posted, text_comment '+ 
              'FROM comment_home_posted WHERE idhome_posted = '+req.params.idhome_posted;
  db.query(query, (error, result) => {      
    //console.log(convertRow2Arr(result));        
    // === express -> home_page
    res.send(result);
  });
});  

// === post -> insert === //
router.get('/add/:posted', function(req, res, next) {    
  let query = `INSERT INTO home_posted(text_posted) VALUE ('${req.params.posted}')`;
  db.query(query, (error, result) => {  
    res.send('Success');    
  });
});

// === comment -> insert === //
router.get('/add/:comment/:idhome_posted', function(req, res, next) {    
  let query = `INSERT INTO comment_home_posted(text_comment,idhome_posted) VALUE ('${req.params.comment}','${req.params.idhome_posted}')`;
  db.query(query, (error, result) => {  
    res.send('Success');    
  });
});

// === post -> update === // 
router.get('/update/:idhome_posted/:posted', function(req, res, next) {    
  let query = `UPDATE home_posted SET text_posted = '${req.params.posted}' WHERE idhome_posted = '${req.params.idhome_posted}'`;  
  db.query(query, (error, result) => {  
    res.send('Success');    
  });
});

// === post -> delete === // ****************
router.get('/delete/:idhome_posted', function(req, res, next) {    
  let query1 = `DELETE FROM home_posted WHERE idhome_posted = '${req.params.idhome_posted}'`;    
  let query2_1 = `SET SQL_SAFE_UPDATES = 0`;    
  let query2_2 = `DELETE FROM comment_home_posted WHERE idhome_posted = '${req.params.idhome_posted}'`;    
  db.query(query1+';'+query2_1+';'+query2_2, (error, result) => {      
    res.send('Success');    
  });    
});

///*** Zoro page. ***///
// === get -> refresh icon === //
router.get('/users/zoro', function(req, res, next) {
  let query = 'SELECT * FROM follow';
  db.query(query, (error, result) => {      
    res.render('zoro', {
      username: username,
      nickname: usernickname,       
      userimg: userimg,
      firstname: 'Roronoa', 
      nickname: 'Zoro',    
      isfollow: result[0].isfollow
    })
  })  
});
// === post -> update follow  === // 
router.get('/users/zoro/follow/:follow', function(req, res, next) {
  let query = `UPDATE follow SET isfollow = '${req.params.follow}' WHERE idfollow = 1`;  
  db.query(query, (error, result) => {      
    res.send('Success');    
  });
});







module.exports = router;
