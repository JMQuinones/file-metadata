var express = require('express');
var cors = require('cors');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), uploadFiles);

function uploadFiles(req, res) {
  /*console.log(req.body);
  console.log(req.file);*/

  const file = req.file
  res.json({ 
    name: file.originalname,
    type: file.mimetype,
    size:  file.size,
  });
}

/*app.post("/api/fileanalyse", (req, res) => {
  console.log(req)
})*/



const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
