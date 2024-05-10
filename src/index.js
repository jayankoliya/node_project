const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000 // Enviroment variable

// public static path for html page
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

app.set('view engine', 'hbs');
app.set('views',template_path);

app.use(express.static(static_path))

// routing
app.get("/", (req,res)=>{ 
    res.render('index')
})

app.get("/contact", (req,res)=>{
    res.render('contact')
})

app.get("/live_camera", (req,res)=>{
    res.render('live_camera')
})

app.get("/news", (req,res)=>{
    res.render('news')
})

app.get("/photos", (req,res)=>{
    res.render('photos')
})

app.get("/single", (req,res)=>{
    res.render('single')
})

app.get("*", (req,res)=>{
    res.render('404error',{
        errorMsg: 'Oops! Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });