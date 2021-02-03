$(document).ready(function() {
    function findGrocery() {
        // Empty ul div so the list doesn't keep getting longer and longer
        $("#nearest-stores").empty();
        // Grabbing value of search input and inputting that into initial AJAX call for geocode API
        var address = $("#user-location").val();
        var addQueryUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic21jbWlsbGFuMjgiLCJhIjoiY2trazBsMTRmMDIyMjJvcHJ6Nzk5bGF4cCJ9.ksKKrAuT0a0V7QJP1Q-YgQ";
        
        $.ajax({
            url: addQueryUrl,
            method: "GET"   
        }).then(function(res) {
            console.log(res);
            // Isolating lat/lon from initial AJAX call to use for POI proximity search
            var lon = res.features[0].geometry.coordinates[0];
            var lat = res.features[0].geometry.coordinates[1];
            console.log(lon);
            console.log(lat);
            
            // Use lat/lon results in second AJAX call
            var groQueryUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/groceries.json?proximity=" + lon + "," + lat + "&access_token=pk.eyJ1Ijoic21jbWlsbGFuMjgiLCJhIjoiY2trazBsMTRmMDIyMjJvcHJ6Nzk5bGF4cCJ9.ksKKrAuT0a0V7QJP1Q-YgQ";
            $.ajax({
                url: groQueryUrl,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                for (var i = 0; i < 5; i++) {
                    var store = $("<li>").text(response.features[i].place_name);
                    $("#nearest-stores").append(store);
                }
            })
            $("#user-location").val(""); 
        }) 
    }

    $("#grocery-search").click(findGrocery);

    function setHome() {
        var homeAddress = $("#user-location").val();
        localStorage.setItem("home-address", JSON.stringify(homeAddress));
        $("#user-location").val(""); 
    }

    $("#set-home").click(setHome);

    function homeSearch() {
        $("#user-location").val(JSON.parse(localStorage.getItem("home-address")));
        findGrocery();
    }

    $("#use-home").click(homeSearch);
})