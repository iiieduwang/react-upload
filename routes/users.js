var express = require('express');
var router = express.Router();
const multer = require('multer');

var users = [
  { id: 1, name: "Tom", email: "Tom@gmail.com", age: 30, photo: "photo1.jpg" },
  { id: 2, name: "Jack", email: "Jack@gmail.com", age: 27, photo: "photo2.jpg" },
  { id: 3, name: "Mary", email: "Mary@gmail.com", age: 25, photo: "photo3.jpg" },
  { id: 4, name: "Fiona", email: "Fiona@gmail.com", age: 20, photo: "photo4.jpg" }
];

//設定將上傳的檔案放到reactapp/build/uploads的資料夾下
var uploadFolder = 'reactapp/build/uploads';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);  
    }
});
var upload = multer({ storage: storage })

router
  .route("/users")
  .get(function(req, res) {//讀所有資料
     res.json(users);
  }) 
  .post(upload.single('photo'),function(req, res) {//新增資料
    var _user = req.body;
    //將上傳的檔案名稱取出加到_user物件中
    _user.photo = req.file.filename
    //取得JSON最後的id
    var lastUser = users[users.length - 1];
    var id = lastUser.id;  
    //計算最新的id加到_user物件中
    _user.id = id + 1;
    
    users.push(_user);
    res.json({message:"新增成功"})
  });   
router
  .route("/users/:id")
  .get(function(req, res) {
   // res.send("get user " + req.params.id )
    var _user = users.filter(function(user){//讀一筆資料
      return user.id == req.params.id;
    })
    res.json(_user);
  }) 
  .put(function(req, res) {//修改資料
      var _user = req.body;  
      var index = 0;
      //找到要修改資料的索引值
      users.find(function(user,i){
         if(user.id == req.params.id){
           index = i;
           return;
         }
      })
      //進行修改 splice(從第幾個位置index,刪除幾筆資料,加入的資料1,加入資料2,....)
      users.splice(index, 1, _user);

      res.json({message:"修改成功"})


  }) 
  .delete(function(req, res) {//刪除資料
    users = users.filter(function(user){
      return user.id != req.params.id;
    })
    res.json({message:"刪除成功"})
  }); 




module.exports = router;
