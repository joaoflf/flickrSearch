document.addEventListener("DOMContentLoaded", function() {
    var connector = new FlickrConnector({
        apiKey: 'e4690fa0885991fc2fddd16f083f2d06'
    });

    var results = connector.searchPhotos('elephant');
});