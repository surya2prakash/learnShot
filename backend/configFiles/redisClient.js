const {createClient} = require("redis");


const client = createClient({
    url: 'redis://host.docker.internal:6380'
});


client.on("Error",err => console.log("Redis Client Error",err));
client.on("connect",()=> console.log("Redis Connected Successfully."));


module.exports = client;