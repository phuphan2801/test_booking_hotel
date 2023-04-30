const mogoose = require("mongoose");

var mongoURL ='mongodb+srv://phuphan28012001:phu123@cluster0.enh0ahv.mongodb.net/mern'

mogoose.connect(mongoURL,{useUnifiedTopology : true, useNewUrlParser:true})
var connection = mogoose.connection
connection.on('error', () => {
    console.log('Mongo DB Connection failed')
})
connection.on('connected', () => {
    console.log('Mongo DB Connection Successful')
})

module.exports = mogoose