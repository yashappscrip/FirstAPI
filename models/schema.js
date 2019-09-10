const mongoose = require('mongoose');
const schema = mongoose.Schema;
const geoSchema = new schema({
   type:{
       type: String,
       default: 'Point'
   },
   coordinates:{
       type:[Number],
       index:"2dsphere"
   }
});
const demoSchema = new schema({
    name:{
        type: String,
        required:[true,'Name is required']
    },
    rank:{
        type: String
    },
    available:{
        type: Boolean,
        default: false
    },
    geometry: geoSchema
});
const Demo = mongoose.model('demoCollection',demoSchema);
module.exports=Demo;