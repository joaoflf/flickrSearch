var FlickrConnector = (function() {

    // constructor (receives options such as apiKey)
    var flickrConnector = function(options) {
        flickrConnector.options = options;
    };

    //take raw Flickr response data and build collection of photo objects with url and other attributes

    function buildPhotoCollection(rawData) {
        var collection = [];

        rawData['photos']['photo'].forEach(function(photo) {
            var photoUrl = 'http://farm' + photo['farm'] + '.staticflickr.com/' + photo['server'] + '/' + photo['id'] + '_' + photo['secret'] + '.jpg';
            var processedPhoto = {
                title: photo['title'],
                url: photoUrl
            };

            collection.push(processedPhoto);
        });
        console.log(collection);
        return collection;
    }

    // prototype
    flickrConnector.prototype = {
        constructor: flickrConnector,

        //search photos by supplied text
        searchPhotos: function(text) {
            //build and send xhr request to Flickr API
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=' + flickrConnector.options.apiKey + '&text=' + text);
            xhr.onload = function(e) {
                var data = JSON.parse(this.response);
                return buildPhotoCollection(data);
            }
            xhr.send();
        }
    };

    return flickrConnector;

})();