const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenteeSchema = new Schema ({
    usertype:String,
    batch:String,
    MID:String,
    AID:String,
    fname:String,
    lname:String,
    skills:String,
    email:String,
    project:String,
    gitlink:String,
    mentorfeedback:[{
    content:String,
    date:Date,
    approved:String
    }],
    scorecard:[{
        week:Date,
        CE:String,
        EP:String,
        LA:String,
        MK:String,
        WQ:String,
        TC:String,
        nfCE:String,
        nfEP:String,
        nfLA:String,
        nfMK:String,
        nfWQ:String,
        nfTC:String,
        approved:String,   
        feedback: String
    }],
    
});
const BatchSchema = new Schema ({
    batch_id:String,
    start_date:Date,
    no_mentees:String,
    remainweek:Number,
    gradper:Number,
    TAT:Number,
   });

const OutlierRecord=new Schema({
    AID:String,
    MID:String,
    batch:String,
    week:String,
    date:Date,
    EP:String,
    CE:String,
    LA:String,
    MK:String,
    WQ:String,
    TC:String,
    feedback:String
    })


const MentorSchema =new Schema({
usertype:String,
AID:String,
fname:String,
lname:String,
acm:Number,
skills:String,
email:String

})

const SkrumDataSchema =new Schema({
AID:String,
Name:String,
Manager:String,    
})


const scrumd =mongoose.model('scrumdata',SkrumDataSchema,'donottouch');
const mentee =mongoose.model('mentee', MenteeSchema, 'users');
const mentor=mongoose.model('mentor', MentorSchema, 'users');
const outrec=mongoose.model('outrec', OutlierRecord, 'outliers');
const batch=mongoose.model('batch',BatchSchema,'batchdetails');


const myModels={'mentee':mentee,'mentor':mentor,'outrec':outrec,'batch':batch,'scrumd':scrumd}
module.exports = myModels;