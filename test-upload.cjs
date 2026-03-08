const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dlm4xbh34',
    api_key: '967473749931618',
    api_secret: 'Y8wW8Z8OOK7bzBWmj5PebTbJ9g0'
});

cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', { folder: 'aerobill-blog' })
    .then(res => console.log(res))
    .catch(err => console.error(err));
