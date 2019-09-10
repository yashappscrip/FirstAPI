const express = require('express');
const app = express();
// const routes = require('./routes/routes');
// app.use('/api',routes);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// ES6 Promises
mongoose.Promise = global.Promise;
const schema = require('./models/schema');
app.use(bodyParser.json());
app.use('/api',require('./routes/routes'));
app.use((err,req,res,next)=>{
    // console.log(err);
    res.status(422).send({error:err.message});
});
app.use(express.static('public'));
var MongoClient = require('mongodb').MongoClient;
const url="mongodb+srv://yash:110198@cluster0-xowlj.mongodb.net/Demno?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true });
MongoClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
    if(err) console.log("Error occured while creating a connection:"+err);
    else{
        app.listen(process.env.port||4000,()=>{
            console.log("Connected...");
        });
        // const collection = client.db("Demno").collection("First");
        // collection.insert({
        //     regNo: "3014",
        //     name: "Test Student",
        //     course: {
        //         courseName: "MCA",
        //         duration: "3 Years"
        //     },
        //     address: {
        //         city: "Bangalore",
        //         state: "KA",
        //         country: "India"
        //     }
        // })
        client.close();
    }
});
// res.end();