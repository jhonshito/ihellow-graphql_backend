const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dc3zgkttu',
    api_key: '763574274487517',
    api_secret: '3Xf0YZvfAEa9L-U4FES7AmbNHXA'
});

module.exports = cloudinary