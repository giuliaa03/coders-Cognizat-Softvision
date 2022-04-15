const express = require('express');
const cors = require('cors');
const { initHeadlineCache } = require('./cache/headlineCache');
const headlineCachingMiddleware = require('./middlewares/headlineCachingMiddleware');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');

const app = express();

app.use(cors());

app.get('/headlines', headlineCachingMiddleware, (req, res, next) => {
  const fetchData = require('./dataSource/fetchHeadlines');
  fetchData(req.query).then(result => {
    res.send(result)
  }).catch(error => {
    next(error);
  })
});

app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

initHeadlineCache();

const server = app.listen(3000, () => {
  console.log(`app running on port ${server.address().port}`);
});

app.use(express.static(__dirname + "./headlineCache"));
app.use("/", HeadlineCache); //not checking for authorisation
app.use(restrictMiddleWare);
app.use("/", cache);

app.use(function (req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.get('./dataSource/fetchHeadlines',(req,res)=>{
  const media = [];
  //to retrieve media
  res.json(media);
});

app.post('./dataSource/fetchHeadlines',(req, res)=>{
  //to add new media
  res.json(req.body);
});

app.post('/middlewares',(req, res) =>{
  const { id }=req.body;
  const userExists = users.find(id => id.title === title);
  if(userExists){
    return res.status(400).json({error: 'User already exists'})
  }
  res.json(req.body);
})