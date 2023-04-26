
const express = require('express')
const app = express()
const cors = require('cors');
require("../db/config");
const User = require("../db/User");
const Product = require("../db/Products");
// const bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan')

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// morgan('tiny')
// 
app.use(morgan('tiny'))
// app.use(morgan(':id :method :url :response-time'))

app.use(cors());
// app.use(express.json());

app.post("/register", async (req, res) => {
  // res.send("api in progress")
  console.log(req.body);
  try {
    console.log("hi")
    // console.log(req);

    var user = new User(req.body);
    console.log("checking")
    await user.save();
    console.log("Connected")
    res.status(200).send(user);

    console.log("Saved")
  }

  catch (error) {
    
    // console.log("error",error.name,error)
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json(errors);
    }else if (error.name === "MongoServerError"){
      let errors = {};

      // Object.keys(error.errors).forEach((key) => {
      //   errors[key] = error.errors[key].message;
      // });
      // console.log(error);
      // console.log(error.message);

      return res.status(400).json({
        message:error.message
      });
      
    }
    // return res.status(400).json({message:error.message})

  }
})

app.post("/userlogin", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "No user found" });
    }
  }
  else {
    resp.send({ result: "No user found" });
  }


})

app.post("/addproduct", async (req,res)=>{
  let product=Product(req.body);
  let result= await product.save();
  res.send(result);
})

app.get("/products", async (req,res)=>{
  let products=await Product.find();
  if(products.length>0){
    res.send(products)
  }
  else{
    res.send("No data found")
  }
})


app.delete("/product/:id", async (req,res)=>{
  let result = await Product.deleteOne({_id:req.params.id});
  res.send(result);
})

app.get("/product/:id", async (req,res)=>{
  let result= await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }
  else{
    res.send("No data found");
  }
})

app.put("/product/:id",async (req,res)=>{
  let result= await Product.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  )
  res.send(result);
})
// const mongoose = require('mongoose')

// const url="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"

// const mySecret = process.env[url]
// const intialDbConnection = async () => {
//   try {
//     await mongoose.connect(mySecret, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true
//     })
//     console.log("db connected")

//   }
//   catch (error) {
//     console.error(error);
//   }
// }

// module.exports = { intialDbConnection }




// async function connect(){
//     try{
//         await mongoose.connect(url);
//         console.log("Connected")
//     }catch(error){
//         console.error(error);
//     }
// }
// connect();



// mongoose.connect(process.env.DATABASE_URL)
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))
// app.use(express.json())
// const posts = [
//         {
//           "userId": 1,
//           "id": 1,
//           "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//           "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"        },
//         {
//           "userId": 1,
//           "id": 2,
//           "title": "qui est esse",
//           "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"        },
//         {
//           "userId": 1,
//           "id": 3,
//           "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//           "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"        },
//         {
//           "userId": 1,
//           "id": 4,
//           "title": "eum et est occaecati",
//           "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"        },
//         {
//           "userId": 1,
//           "id": 5,
//           "title": "nesciunt quas odio",
//           "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"        }
//     ];
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
// app.get('/posts', async (req, res) => {
//   let user=new User(req.body);
// // let result= await user.save();
//   res.json(user);
//   });
//     app.get('/post/:id', (req, res) => {
//         console.log(req.params.id)
//         let postId = req.params.id      
//         const post = posts.find(item => item.id == postId);
//         res.json(post);
//         });
//   app.get('/about', (req, res) => {
//     res.json({ username: 'Flavio' })
//   })
//const subscribersRouter = require('./routes/subscribers')
app.listen(4002, () => console.log('Server Started')) //3000 is port

