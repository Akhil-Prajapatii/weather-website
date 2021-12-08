const request = require('request');

const forecast = (lat,lon,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c218258fe6488335ddb7a06f2b543d9b&query=${lat},${lon}&units=f`;
    request({url:url,json:true},(err,res) => {
            if(err){
                    callback('Data not availale',undefined);
            }else if(res.body.error){
                    callback('Please enter valid location',undefined)
            }else{
                    callback(undefined,{
                            temperature:res.body.current.temperature,
                            feelslike:res.body.current.feelslike,                                
                            time:res.body.location.localtime                                
                    })
            }
    })
}

module.exports = forecast
