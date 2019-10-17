const AWS = require('aws-sdk');
const path = require('path');
const randomstring = require('randomstring')

//configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
});

const s3 = new AWS.S3()

function UploadS3(file) {
    return new Promise((resolve,reject) => {
        if(typeof file == "undefined") {
            return reject({"name": ''})
        }
        var name = randomstring.generate(10) + path.extname(file.name)
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: (process.env.S3_FOLDER_NAME + '/' + name),
            ACL: 'public-read',
            Body: file.data
        };
        s3.upload(params, function (err,data) {
            if(err) {
                return reject(err)
            } else {
                data['name'] = name
                return resolve(data)
            }
        })
    })
}

module.exports = UploadS3