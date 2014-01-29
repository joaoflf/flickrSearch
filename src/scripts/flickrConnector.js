var FlickrConnector = (function() {

    // constructor (receives options such as apiKey)
    var self = function(options) {
        self.options = options;
    };

    var currentSearchText = '';

    //take raw Flickr response data and build collection of photo objects with url and other attributes

    function buildPhotoCollection(rawData) {
        var collection = {
            photos: [],
            page: rawData['photos']['page'],
            pages: rawData['photos']['pages']
        };
        rawData['photos']['photo'].forEach(function(photo) {
            //construct url with photo data
            var photoUrl = 'http://farm' + photo['farm'] + '.staticflickr.com/' + photo['server'] + '/' + photo['id'] + '_' + photo['secret'] + '.jpg';
            var processedPhoto = {
                title: photo['title'],
                url: photoUrl,
            };
            collection['photos'].push(processedPhoto);
        });
        return collection;
    }

    //search photos by supplied text. A callback also needs to be provided in order to support the XHR async response
    function searchPhotos(text, callback) {
        //build and send xhr request to Flickr API
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=9&api_key=' + self.options.apiKey + '&text=' + text);
        xhr.onload = function(e) {
            //upon response, parse data, build processed photo collection and channel it through the provided callback
            var data = JSON.parse(this.response);
            currentSearchText = text;
            callback(buildPhotoCollection(data));
        };
        xhr.send();
    }

    //fetch page from the current search
    function getCollectionPage(page, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=9&api_key=' + self.options.apiKey + '&text=' + currentSearchText + '&page=' + page);
        xhr.onload = function(e) {
            var data = JSON.parse(this.response);
            callback(buildPhotoCollection(data));
        };
        xhr.send();
    }

    // prototype for exposing public methods
    self.prototype = {
        constructor: self,
        searchPhotos: searchPhotos,
        getCollectionPage: getCollectionPage
    };

    return self;
})();