const express = require("express");
const morgan = require("morgan");
const randomstring = require('randomstring')
const app = express();
app.use(morgan("dev"));
app.use('/static', express.static('public'))

app.get('/',(req,res)=>{
  const host = (req.get('host'))
  res.render('index.ejs', {host, urls});
})

const urls = [
  {
    slug: randomstring.generate(8),
    longUrl: 'https://www.naver.com'
  }
]

app.get('/:slug',(req,res)=>{
  const urlItem = urls.find(item=> item.slug===req.params.slug)
  if(urlItem){
    res.redirect(301, urlItem.longUrl)
  }else{
    res.status(404)
    res.send('404 Not Found')
  }
})

app.listen(3000, () => {
  console.log("listening...");
});

