const express = require('express');
const app = express()
const fs = require('fs')
const uploadFile = require("./upload");


app.get('/', (req,res)=>{
    res.send("<h1>hello hello</h1>")
})

app.get('/files',(req,res)=>{
    const directoryPath = __dirname + "/Files/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files?.forEach((file) => {
      fileInfos.push({
        name: file,
        url: __dirname + file,
      });
    });

    res.status(200).send(fileInfos);
  });

})
app.post('/upload',async (req,res)=>{
    try {
        await uploadFile(req, res);
    
        if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
    
        res.status(200).send({
          message: "Uploaded the file successfully: " + req?.file?.originalname,
        });
      } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
          }
        res.status(500).send({
          message: `Could not upload the file: ${req?.file?.originalname}. ${err}`,
        });
      }
})
app.get("/files/:name", (req,res)=>{
    const fileName = req.params.name;
    const directoryPath = __dirname + "/Files/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
})
const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log("working")
})