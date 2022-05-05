const express = require('express')
const fast2sms = require('fast-two-sms')
const app = express();
const hbs = require('hbs')
const path = require('path')
const port = process.env.PORT || 3000
require('dotenv').config()


app.use('/static', express.static(path.join(__dirname, 'public')))

const tempaltePath = path.join(__dirname, './api/templates/views');
const partialsPath = path.join(__dirname, './api/templates/partials')

app.set('view engine', 'hbs');
app.set('views', tempaltePath);
hbs.registerPartials(partialsPath);

app.use(express.urlencoded({ extended: false }))

app.post('/sendMessage',async (req,res)=>{
    var options = {authorization : process.env.API_KEY , message : req.body.message ,  numbers : [req.body.number]} 
   const response = await fast2sms.sendMessage(options)
   res.redirect('/')
})

app.get('/',(req,res)=>{
    res.render('index')
    });


app.listen(port, () => {
    console.log('listening on port 3000')
    })