var FlickrGallery = (function() {
    var container, thumbnailContainer, paginationControl, collection;

    // constructor 
    var self = function(options) {
            self.options = options;
            container = self.options.element;
            initialize();
        };

    function initialize() {
        var connector = new FlickrConnector({
            apiKey: 'e4690fa0885991fc2fddd16f083f2d06'
        });

        connector.searchPhotos('elephant', function(data) {
            collection=data;
            generateThumbnails();
            generatePaginationControl();
            connector.getCollectionPage('3', function(pageData) {
                console.log(pageData);
            });
        });
    }

    function generateThumbnails() {
        container.insertAdjacentHTML('afterbegin','<div class=thumbnailContainer></div>');
        thumbnailContainer = document.querySelector(".thumbnailContainer");

        collection['photos'].forEach(function(photo) {
            thumbnailContainer.insertAdjacentHTML('beforeend', '<img class="thumbnail" src="' + photo['url'] + '" alt="" />');
        });
    }

    function generatePaginationControl() {
        thumbnailContainer.insertAdjacentHTML('beforeend','<div class=paginationControl></div>');
        paginationControl= document.querySelector(".paginationControl");

        for(var i=0;i<collection['pages'];i++) {
            if (i==6) {
                break;
            }
            paginationControl.insertAdjacentHTML('beforeend','<a class=pageLink>'+(i+1)+'</a>');
        }
    }

    // prototype for exposing public methods
    self.prototype = {
        constructor: self
    };

    return self;
})();