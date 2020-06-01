const redis = require('redis')
const client = redis.createClient(6380, '127.0.0.1')

//console.log(client)

client.on("error", function(err){
    console.log("Error " + err);
})
console.log("accessed cache file")
client.set("products", "nice values");
console.log("we set the value")
client.get("products", (err, data)=>{
    if(err){
      throw err;
    }
    console.log(data);
  });
console.log("get the value")
console.log("we got the value")
module.exports = client