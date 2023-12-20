const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const port = 3000
const path = require ("path")
app.use(express.json())
app.use(fileUpload());
app.use(express.static('public'))

app.post('/upload', function (req, res) {
  let console;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  console = req.files.console;
  uploadPath = path.join(__dirname + '/public/' + console.name);

  console.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})