"use strict";
/*jshint loopfunc:true */
/*global google: false */
/*global ko: false*/
/*jslint node: true */
/*jshint strict:false */
//style for the Map.(found it on the https://snazzymaps.com/)
var styles = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 13
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#144b53"
    }, {
        "lightness": 14
    }, {
        "weight": 1.4
    }]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
        "color": "#08304b"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#0c4152"
    }, {
        "lightness": 5
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#0b434f"
    }, {
        "lightness": 25
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#0b3d51"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "color": "#146474"
    }]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
        "color": "#021019"
    }]
}];

/* variable map defined for the activities related to map.
 * markers are defined for pointing the different places.
 * locations contains the information related to the place, like name,lat-lng and
 * foursquare id for the venue details.
 */
var map;
var markers = [];
var locations = [{
    title: 'Osteria Morini', //food
    location: {
        lat: 40.721993,
        lng: -73.997793
    },
    fourSquareId: '4c7d4f1b8da18cfa1afc9ece'
}, {
    title: 'Blue Ribbon Sushi', //food
    location: {
        lat: 40.726092,
        lng: -74.002408
    },
    fourSquareId: '45ac12d6f964a5205d411fe3'
}, {
    title: 'Jane', //food
    location: {
        lat: 40.727368,
        lng: -74.000246
    },
    fourSquareId: '3fd66200f964a52044e61ee3'
}, {
    title: 'Blue Note', //bar
    location: {
        lat: 40.730894,
        lng: -74.000703
    },
    fourSquareId: '3fd66200f964a520e9e51ee3'
}, {
    title: "Mother's Ruin", //bar
    location: {
        lat: 40.721300,
        lng: -73.995013
    },
    fourSquareId: '4de3e4effa7651589f21983d'
}, {
    title: "Employees Only", //bar
    location: {
        lat: 40.733435,
        lng: -74.006111
    },
    fourSquareId: '41e46880f964a520d41e1fe3'
}, {
    title: "McSorley's Old Ale House", //bar
    location: {
        lat: 40.728761,
        lng: -73.989694
    },
    fourSquareId: '3fd66200f964a52058e41ee3'
}, {
    title: "Bathtub Gin", //bar
    location: {
        lat: 40.743569,
        lng: -74.003240
    },
    fourSquareId: '4dc34fc7ae608779d1064ae9'
}, {
    title: "Injera", //restaurents
    location: {
        lat: 40.737074,
        lng: -74.005168
    },
    fourSquareId: '52d738f011d20678fffb4db8'
}, {
    title: "Upland NYC", //restaurents
    location: {
        lat: 40.741835,
        lng: -73.984840
    },
    fourSquareId: '5440ac89498e6faac0aa08a1'
}, {
    title: "Del Posto", //restaurents
    location: {
        lat: 40.743539,
        lng: -74.007948
    },
    fourSquareId: '4533d338f964a5208f3b1fe3'
}, {
    title: "Joseph Leonard", //restaurents
    location: {
        lat: 40.733571,
        lng: -74.001691
    },
    fourSquareId: '4a78c865f964a52068e61fe3'
}, {
    title: "Barneys New York", //shopping
    location: {
        lat: 40.764653,
        lng: -73.971229
    },
    fourSquareId: '4576ddcaf964a520ac3e1fe3'
}, {
    title: "UNIQLO", //shopping
    location: {
        lat: 40.723451,
        lng: -73.998077
    },
    fourSquareId: '4c13d7d482a3c9b68536fcf8'
}, {
    title: "MUJI New York", //shopping
    location: {
        lat: 40.755860,
        lng: -73.990141
    },
    fourSquareId: '4a2411fff964a520f37d1fe3'
}, {
    title: "Trader Joe's", // grocery shopping
    location: {
        lat: 40.741900,
        lng: -73.993876
    },
    fourSquareId: '4c225ae47e85c9283ee5bb21'
}, {
    title: "Sunrise Mart", // grocery shopping
    location: {
        lat: 40.729789,
        lng: -73.989328
    },
    fourSquareId: '4a98599ef964a520a62b20e3'
}];

var marker;
//Function responsible for the map loading. Every time we load the file, the new map
//is created with the markers pointing to the places and different functionality related to maps.
function initMap() {
    //Creation of new google map.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        //Map zoom level.(max: 21)
        zoom: 13,
        //Application of styles to the map, defined abow.
        styles: styles,
        //allows users to change the map type to road , terrian or satellite etc.
        mapTypeControl: true
    });
    /* Adding the event listener to make the markers visible even if the viewport size is reduced.
     * Using this event listener we are centering our map to the location which are mentioned abow.
     */
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
    // For the apllication of map bound.
    var bounds = new google.maps.LatLngBounds();

    // Creating the new infowindow of max size 350. It will shows the information about the place
    // whenever the respactive marker is clicked.
    var largeInfowindow = new google.maps.InfoWindow({
        maxWidth: 300
    });

    // Styling the markers a bit. This is the default marker icon color (red).
    var defaultIcon = makeMarkerIcon('dc143c');

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker (yellow).
    var highlightedIcon = makeMarkerIcon('FFFF24');

    /* The following loop will create the marker for each and every position defined by us.
     * Here we are providing the positions, title, id to each marker.
     */
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var id = locations[i].fourSquareId;
        // Create a marker per location, and put into markers array.
        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: id
        });

        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        // Creating marker as part of viewModael. which will Provide the marker functionality to our locations in viewModel.
        viewModel.locationArray()[i].marker = marker;

        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 750);
            map.setCenter(this.getPosition());
            //  alert(this.getPosition());
        });
        bounds.extend(markers[i].position);
    } //end of for loop
    map.fitBounds(bounds);

    // Function which will populate the infowindow whenever we click the markers.
    function populateInfoWindow(marker, infowindow, locationItem) {

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.setContent('');

            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
                // to make the map appear like it did when the page loaded initmap is induced (for keeping the same center as mapzoom changes the view and all markers dont seem visible after the infowindow is opened)
                initMap();
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            // Function which gives us the view by checking the status of the place.
            // If the view is not available it will the closest view in the radius of 50 meters.
            // Using google api, we are providing the streetview of the place.
            var getStreetView = function(data, status) {
                // console.log(google.maps.StreetViewStatus);
                if (status === google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position);
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 30
                        }
                    };
                    // Providing the panorama view for the place.
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                } else {
                    alert("Sorry No streetview found !");
                    infowindow.setContent('<div id="title"><strong>' + marker.title + '</strong></div>' + '<div>sorry ! No Street View Found</div>' + '<div>' + fullList + '</div>' + '<div>' + fullWikiList + '</div>' + '<div>' + fourList + '</div>');
                }

            };
            /* There are 3 third party API we are using for providing the information about the places:
             * 1. FourSquare, 2. NewYork Times, 3. Wikipidia.
             * FourSquare will provide the rating of the place out of 10 by the visitor of the place, and one of the tip related to that place.
             * NY Time and Wikipidia gives us the links related to our place. (But not accurately !! Because the places are just for shopping, food, clothing )
             */
            // Calling the foursquare url and it's response using jQuery's getJSON method.
            var foursquareurl = 'https://api.foursquare.com/v2/venues/' + marker.id + '?&limit=1&client_id=WZV4V3OE35NQJVIHYIDFZQK0H5ZZMMS5FKX4OTCGOZ3RR2E5&client_secret=NL4SDPZJBHH03UOIJXWQPSPLJ5TWWHL4H01C1S1YULWDZHWJ&v=20171016';
            var fourList = '<div id="four"><br><strong>Related FourSquare Tip:</strong><br></div>';
            $.getJSON(foursquareurl, function(data) {
                    // variable for the tip and rating of the place.
                    var items = data.response.venue.tips.groups[0].items[0].text;
                    var ratings = data.response.venue.rating;
                    fourList = fourList + '<div class="infoContent" style="color: green;"><strong> Ratings: ' + ratings + '</strong><br></div>' + '<div class="infoContent" style="color: red;">' + items + '</div>';
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    alert("Following error occured while loading FourSquare! " + jqXHR.status + ": " + textStatus);
                });

            // Call for the wikipidia API. which will shows us the links for the clicked marker.
            var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
            var wikiList;
            var fullWikiList = '<div id="wiki"><br><strong>Related Wikipedia Articles:</strong><br></div>';

            var wikiRequestTimeout = setTimeout(function() { //there is no .error() method for JSON P.so we have to use this.
                fullWikiList = fullWikiList + "failed to get wikipedia resoueces";
            }, 8000);
            // Here we are using the AJAX method of calling web apis.
            $.ajax({
                url: wikiUrl,
                dataType: 'jsonp',
                success: function(response) {
                    var articleList = response[1].slice(0, 2); //in the wiki page's responese==(data) onject ,"1" is the key which contains the articles about the city.
                    if (articleList.length === 0) {
                        fullWikiList = fullWikiList + 'Sorry No link related to this place is found !';
                    } else {
                        articleList.forEach(function(articalStr) {
                            var url = 'http://en.wikipedia.org/wiki/' + articalStr;
                            wikiList = ('<li class="infoContent"><a href="' + url + '">' + articalStr + '</a></li>');
                            fullWikiList = fullWikiList + wikiList;
                        });
                    }
                    clearTimeout(wikiRequestTimeout); // if function executed succesfully we dont need time out !!!
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                alert("Following error occured while loading wikipedia Links! " + jqXHR.status + ": " + textStatus);
                console.log(jqXHR);
            });

            // Call for the NY times links for our locations.
            var list;
            var articles;
            var fullList = '<div id="nyTime"><br><strong>Related NY Times Articles:</strong><br></div>';
            var nytimeurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + marker.title + '&sort=newest&api-key=940686e225724e549cc82b99694abee9';

            // JSON request for the NY times articles related to the location.
            $.getJSON(nytimeurl, function(data) {
                    //used slice(0, 3) to get only 3 articles in the infowindow as it was looking overcrowded before
                    articles = data.response.docs.slice(0, 3);
                    for (var i = 0; i < articles.length; i++) {
                        var article = articles[i];
                        list = '<li class="infoContent"><a href="' + article.web_url + '"">' + article.headline.main + '</a></li><br>';
                        fullList = fullList + list;
                    }
                    // Setting the infowindow content for our information, which we got from our API calls.
                    infowindow.setContent('<div id="title"><strong>' + marker.title + '</strong></div>' + '<div><div id="pano"></div>' + '<div>' + fullList + '</div>' + '<div>' + fullWikiList + '</div>' + '<div>' + fourList + '</div>');

                    // Calling the panorama view on the selected marker location.
                    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    alert("Following error occured while loading NYTimes! " + jqXHR.status + ": " + textStatus);
                });
            // Open the infowindow on the correct marker.
            infowindow.open(map, marker);
        }
    }

}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }
    // Executed when some error related to our map loading.
function mapError() {
    alert("Map could not be loaded at this moment. Please try again later.");
}

// viewModel for our location and the functions related to side navigation bar.
var ViewModel = function() {
    var self = this;
    // Putting our locations into an observable array.
    self.locationArray = ko.observableArray(locations);
    // for the slide out menu bar. By default it is closed.(i.e false)
    self.navBarOpen = ko.observable(false);

    self.closeNavBar = function() {
        self.navBarOpen(false);
    };
    self.openNavBar = function() {
        self.navBarOpen(true);
    };
    // This will pop up the infowindow whenever we click on one of the places in the listview.
    self.selectListItem = function(listItems, marker) {
        google.maps.event.trigger(listItems.marker, 'click');

    };

    // This is responsible for showing the listview of the places by default, whenever we click on hamburgur icon.
    self.showplaces = function(data) {
        for (var i = 0; i < self.locationArray().length; i++) {
            if (self.locationArray()[i].marker)
                self.locationArray()[i].marker.setVisible(data);
        }
    };

    // Defining the empty observable array, for filter search.
    this.inputSearch = ko.observable('');

    // Defining the knockout computation for the filter operation.
    this.filteredPlaces = ko.computed(function() {

        // This will take the value from the search box and put it in the searchvalue.
        var SearchValue = self.inputSearch();

        // By default it will show the whole list, if we are not searching anything.
        if (SearchValue.length === 0) {
            self.showplaces(true);
            return self.locationArray();

        } else {
            // filtering the list of places and put it into the array.
            var searchArray = [];

            for (var i = 0; i < self.locationArray().length; i++) {
                if (self.locationArray()[i].title.toLowerCase()
                    .indexOf(SearchValue.toLowerCase()) > -1) {
                    self.locationArray()[i].marker.setVisible(true);
                    searchArray.push(self.locationArray()[i]);
                } else {

                    self.locationArray()[i].marker.setVisible(false);
                }
            }
            return searchArray;
        }
    });
};

var viewModel = new ViewModel();

ko.applyBindings(viewModel);