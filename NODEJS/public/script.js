const socket = io();
let map,marker;
const mapDiv = document.createElement("div");
mapDiv.id = "map";
document.body.appendChild(mapDiv);
function InitMap(){
  const pos = {lat:0,lng:0};
  map = new google.maps.Map(document.getElementById("map"),{center:pos,zoom:12});
  marker =new google.maps.Marker({
    position:pos,
    map:map,
  });
}
InitMap();

socket.on("updated-Location",(live)=>{
    marker.setPosition(live);
    map.setCenter(live);
    console.log(live);
});


async function WatchPos(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                socket.emit("updateLocation", pos); 
            },
            console.error,
            { enableHighAccuracy: true }
        );
    } else {
        alert("Geolocation is not supported");
    }
}
 WatchPos();


