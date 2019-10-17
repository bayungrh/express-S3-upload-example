const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const port = process.env.PORT || '4000'
const upload_s3 = require('./utils/s3')
require('dotenv').config()

app.use(fileUpload({
	limits: { fileSize: 5000000 }
}))

app.post('/upload', async(req, res) => {
    var files = req.files
    console.log(files)
    upload_s3(files.image).then(data => {
        return res.status(200).json({
            "success": true,
            "data": data
        })
    }).catch(err => {
        return res.status(500).json({
            "success": false,
            "errors": err
        })
    })
})

var server = app.listen(port, function () {
    var host = server.address().address
    console.log("RESTful API server started on http://%s:%s", host, port)
});