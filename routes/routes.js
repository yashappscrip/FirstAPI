const express = require('express');
const router = express.Router();
const DemoCollection = require('../models/schema');
const jwt = require('jsonwebtoken');
// Get data
router.get('/get',(req,res,next)=>{
    /*DemoCollection.find({}).then((r)=>{
        res.send(r);
    });*/
    // DemoCollection.aggregate([{ $geoNear: { near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]}, 
    // spherical: true, maxDistance: 100000, distanceField: "dist.calculated" } }]).then(function(results){ res.send(results); });
    // DemoCollection.aggregate([{
    //     "$geoNear": {
    //       "near": {
    //         "type": "Point",
    //         "coordinates": [parseFloat(req.query.lang), parseFloat(req.params.lat)]
    //       },
    //       "spherical": true,
    //       "maxDistance": 10 * 1609,
    //       "distanceField": "distance"
    //     }
    //   }]).then((r)=>{
    //       res.send(r);
    //   });
    // DemoCollection.geoNear({
    //     type:'point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    //     {maxDistance : 10000,spherical:true}
    // ).then(r=>{
    //     res.send(r);
    // });
    // res.send({type:'GET'});
});
var verifyToken =(req,res,next)=>{
    const header = req.headers['authorization'];
    if(typeof header !=='undefined'){
        const token = header.split(' ');
        const finalToken = token[1];
        req.token = finalToken;
        next();
    }
    else{
        res.sendStatus(403)
    }
};
router.post('/login',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.send("Post Request Created");
        }
    });
    const user={
        id:1,
        username:"yash98",
        email:"yash@appscrip.com"
    };
    jwt.sign({user},'secretKey',(err,token)=>{
        res.json({token});
    });
});
// Add data
router.post('/add',(req,res,next)=>{
    //res.send("asa");
    DemoCollection.create(req.body).then((data)=>{
        res.send(data);
        // var a = req.body;
        // console.log(a);
        // res.send({type:'POST',
        //     name:a.name
        // });
    }).catch(next);
    // var demoCollection = new DemoCollection(req.body);
    // demoCollection.save();
    // res.end();
});
// Update data
router.put('/set/:id',(req,res,next)=>{
    DemoCollection.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        DemoCollection.findOne({_id:req.params.id}).then((r)=>{
            res.send(r);
            res.json(r);
        });
        // res.send(r);
    });
    // res.send({type:'PUT'});
});
// Delete data
router.delete('/remove/:id',(req,res,next)=>{
    var id2 = req.params.id;
    // console.log(id2);
    DemoCollection.findByIdAndRemove({_id:id2}).then((r)=>{
        res.send(r);
    });
    // res.send({type:'DELETE'});
});
module.exports=router;