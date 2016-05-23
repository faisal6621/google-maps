var map;
var infoWindow;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 14,
	  center: {lat: 28.6024018, lng: 77.3629686},
	  mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	polyShape = [];
	var myMap = new google.maps.Map(document.getElementById("map"), map);
	var poly = new google.maps.Polygon({
		  //path: polyShape,
		  strokeColor: '#FF0000',
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: '#FF0000',
		  fillOpacity: 0.30,
		  map: map
		});
	google.maps.event.addListener(myMap, 'click', function (e) {
		var loc = {lat: e.latLng.lat(), lng: e.latLng.lng()};
		polyShape.push(loc);
		sessionStorage.polyShape = JSON.stringify(polyShape);
		poly.setPath(polyShape);
		var marker = new google.maps.Marker({
		    position: loc,
		    map: map,
		    title: 'Drag to change coordinates',
		    draggable: true
		});
		var pos = -1;
		marker.addListener('dragstart',function(e){
			console.log(e.latLng);
			pos = polyShape.findIndex(function(obj,idx,arr){
				if(obj.lat==e.latLng.lat() && obj.lng==e.latLng.lng()){
					return true;
				}
			});
			console.log(pos);
		});
		marker.addListener('dragend',function(e){
			console.log(e.latLng);
			polyShape[pos] = {lat: e.latLng.lat(), lng: e.latLng.lng()};
			poly.setPath(polyShape);
		});
	});

}