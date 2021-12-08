const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXJldmlsZGVhZCIsImEiOiJja3Y0MjZ5d3cyOWN1MnBxd2poN2lyaHJ4In0.jF5a2SVzLMMbKPv_P4iDzQ&limit=1';
    request({url:url,json:true},(err,res) => {
            if(err){
                    callback('Unable to connect',undefine);
            }else if(res.body.features.length === 0){
                    callback('Location not found',undefined);
            }else{
                    callback(undefined,{
                        lat:res.body.features[0].center[1],
                        lon:res.body.features[0].center[0],
                        location:res.body.features[0].place_name
                    });
            }
    })
}

module.exports = geocode;


