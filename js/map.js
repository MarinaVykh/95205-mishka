function initMap() {
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 16,
    center: {lat: 59.9387942, lng: 30.3230833}
  });

  setMarkers(map);
}

var points = [
  ['Мы здесь!', 59.9387942, 30.3230833],
];

function setMarkers(map) {
  var image = {
    url: 'img/icon-map-pin.svg',
    size: new google.maps.Size(66, 101),
    anchor: new google.maps.Point(33, 90)
  };

  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var marker = new google.maps.Marker({
      position: {lat: point[1], lng: point[2]},
      map: map,
      icon: image,
      title: point[0]
    });
  }
}
