const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const templatePath = path.join(__dirname, "../templates");
const collection = require("./mongodb");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatePath);


app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});


app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  
  await collection.insertMany([data]);
  res.render("home");
});

app.post("/login",async(req,res)=>{
    try{
    const check = await collection.findOne({name:req.body.name})
    
    if(check.password===req.body.password){
        res.render("home")
    }else{
        res.send("Wrond Password")
    }
    }
    catch{
        res.send("Wrond Details")
    }
})

app.listen(port, () => {
  console.log(`APP LISTEN PORT ${port} :)`);
});
