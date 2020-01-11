const express = require('express');
const bodyParser = require("body-parser"); // parse json
var ldap = require('ldapjs');
var format = require('string-format');
var fs = require('fs');
const app = express();
var session = require('express-session');
var cors = require('cors')
const request = require('request');
//const redis = require('redis');


//const redisClient = redis.createClient();
var fileupload = require("express-fileupload");
const excelToJson = require('convert-excel-to-json');
const nodemailer = require("nodemailer");
app.use(cors())
app.use(fileupload())
app.use(session({secret:"123e#$#$#$#", resave:false, saveUninitialized:true}));
app.use(bodyParser.json());
const path = require('path');
mongoose = require('mongoose').set('debug', true);
//mongoose.connect("mongodb://test:test123@test-shard-00-00-qy33i.mongodb.net:27017,test-shard-00-01-qy33i.mongodb.net:27017,test-shard-00-02-qy33i.mongodb.net:27017/test?ssl=true&replicaSet=Test-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser:true});
mongoose.connect("mongodb://test:test123@test-shard-00-00-qy33i.mongodb.net:27017,test-shard-00-01-qy33i.mongodb.net:27017,test-shard-00-02-qy33i.mongodb.net:27017/Skrum?ssl=true&replicaSet=Test-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser:true});
const myModels = require('./models.js');
//mongoose.set('useFindAndModify', false);
//const Usertype = myModels.usertype;
const Scrumd = myModels.scrumd

const Mentee = myModels.mentee;
const Mentor = myModels.mentor;
const batchdetails =myModels.batch;
//const StartDate = myModels.startdate;
const Outrec =myModels.outrec;
var date = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
date.setUTCHours(0,0,0,0);
net = require("net")

async function sendEmail(emails){
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();
  var smtpTransport = require('nodemailer-smtp-transport');

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'vishalcooldude76@gmail.com',
      pass: 'megadestruction'
    }
  }));



  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Vishal Naidu" <vishalnaidu@cerner.com>', // sender address
    to: emails, // list of receivers
    subject: "Welcome to Dev-center associates, important~", // Subject line
    html: '<b>Hello new hires</b> <hr/> <p> We are excited to welcome you to the Cerner team, register at this link  <a href = "http://0235de34.ngrok.io/register">Register</a> </p>'
             // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//sendEmail().catch(console.error);
// var client = ldap.createClient({
//     url: 'ldap://ldap.northamerica.cerner.net:389',
//     reconnect: true,
// });
// client.on('error', function(err) {
//     console.warn('LDAP connection failed, but fear not, it will reconnect OK', err);
// });

function functiontofindIndexByKeyValue1(arraytosearch, key) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i].type.toString() === key) {
            return i;
        }
    }
    return null;
}
/////////////////////////////////////////////////////////////


app.get("/scrumd/:AID", (req, res) => {
  var aid = req.params.AID;
  Scrumd.find({"AID":aid}, function(err,user){
      if(err){
        console.log(err);
      }
      else {
        console.log(user);
        res.send(user);
      }
    });
});







//////////////////////////////////////////////////////////////////POST////////////////////////////////////////////////////////////
app.post('/scores', (req, res)=> {
  var values = req.body
  console.log(values);
  var newScores = {
    week: new Date(),
    EP:values.EP,
    CE:values.CE,
    LA:values.LA,
    MK:values.MK,
    WQ:values.WQ,
    TC:values.TC,
    approved:"false",
    feedback:values.feedback,
    nfEP:values.nfEP,
    nfCE:values.nfCE,
    nfLA:values.nfLA,
    nfMK:values.nfMK,
    nfWQ:values.nfWQ,
    nfTC:values.nfTC
  }
  
  Mentee.findOneAndUpdate({AID:values.AID}, {$push:{'scorecard': newScores}}, {upsert:true,new:true}, (err, user) =>{
      if(err)
      res.send(err)
      else
     { 
       res.send("done")
     }
  })
     
})

app.post('/login', (req, res)=>{
  us = req.body.username;
  toSend = {'true': 0};
  //console.log(email, password);
  Mentee.findOne({associateID:us}, function(err, user){ //just test with username for now!
      if(err || !user){
          res.send(toSend);
      }
  
      else{
          toSend.true = 1;
          req.session.user = user;
          console.log(req.session.user);
          res.send(toSend);
          //res.redirect('/');
      }
  });
});

app.post('/register', (req, res)=>{
  values = req.body.values;
  if(values.workexp > 0)
      menteetype = 'Lateral'
  else
      menteetype = 'Fresher'
  const mentee = new Mentee({
      associateID: values.associateid,
      firstname : values.firstName,
      lastname: values.lastName,
      workexp : values.workexp,
      menteetype: menteetype,
      technology: values.technologies,
      contactno: values.contactno,
      emailid: values.email,
      college: values.collegename,
      companies: values.company,
      batch:  date,
      project_details : ''
  });
  
  mentee.save().then(()=>{
      console.log("mentee succesfully saved");
  });

  const user = new Usertype({
      associateID: values.associateid,
      userType: 1 // mentee!
  }); 
  
  user.save().then(()=>{
          console.log('Usertype collection updated');
      });
  res.sendStatus(200);
  
  //console.log(email, password);

});

app.post('/validate', function(req,res){

  var userid = req.body.associateid;
  password = req.body.password;
  username = userid + "@cerner.net";
  toSend = {'test': -1};
  const newmentor = new Mentor({
      associateID: 'UU067843',
      firstname: 'Amuktha',
      lastname: 'Shilagani'
  })

  if(password !== '' || userid == ''){
     
  
  client.bind(username, password, function (err) {

      if (err) {

          res.send(toSend);

      }

      else {


          var userFilter = {

              filter: format('&(objectClass=*)(sAMAccountName={0})',  userid),
              scope: 'sub',

          };

          client.search('OU=Users,OU=Bangalore,OU=Office Locations,dc=northamerica,dc=cerner,dc=net', userFilter, function (err,res) {


              res.on('searchEntry', function (entry) {

                  var nameIndex = functiontofindIndexByKeyValue1(entry.attributes,'displayName');
                  var name = entry.attributes[nameIndex].vals[0].toString();
                  var execIndex = functiontofindIndexByKeyValue1(entry.attributes,'extensionAttribute4');
                  var exec = entry.attributes[execIndex].vals[0].toString();
                  var depIndex = functiontofindIndexByKeyValue1(entry.attributes,'department');
                  var department = entry.attributes[depIndex].vals[0].toString();
                  var title = functiontofindIndexByKeyValue1(entry.attributes,'title');
                  var profile = entry.attributes[title].vals[0].toString();
                  var userIdIndex = functiontofindIndexByKeyValue1(entry.attributes,'sAMAccountName');
                  var userId = entry.attributes[userIdIndex].vals[0].toString().toLowerCase();
                  var teamIdIndex = functiontofindIndexByKeyValue1(entry.attributes,'extensionAttribute3');
                  var teamId = entry.attributes[teamIdIndex].vals[0].toString();
                  console.log(name,exec,department,profile,userId,teamId);
                  
              });
          });
          toSend.test = 0;
          req.session.associateid = userid;
          res.send(toSend);

      }
  })
}
  else
      res.send(toSend);
  
});

app.post('/updatescorecard', (req, res)=> {
  //send as aid, professionalism
  values = req.body
  console.log(values);
  newScorecard = {
    week: date,
    ExhibitesProfessionalism : values.Professionalism,
    CommunicatesEffectively : values.Communication,
    LearningAgility : values.Learning_Agility,
    Makes_and_Keeps_Commitments : values.Commitment,
    QualityWorkProducts: values.Quality_Work_Products,
    TechnicalCompetency: values.Technical_Competancy,
    feedback : values.feedback
  }
  Mentee.findOneAndUpdate({associateID:values.AID}, {$push:{scorecard : newScorecard}}, {upsert:true}, (err, user) =>{
        console.log('Updated!');
  res.sendStatus(200);
  })
     
})

app.post('/updategoals', (req, res)=> {
//send as aid, professionalism
values = req.body
console.log(values);
newGoals = {
  week: date,
  goalstext : values.goals
}

Mentee.findOneAndUpdate({associateID:values.AID}, {$push:{'mentor.goals' : newGoals}}, {upsert:true}, (err, user) =>{
      console.log('Updated!');
})
   
})


app.post('/uploadfile', (req, res, next) => {
let uploadFile = req.files.file
console.log(uploadFile)
const fileName = req.files.file.name
console.log(__dirname);
uploadFile.mv(
  `${__dirname}/excelsheets/${fileName}`,
  function (err) {
    if (err) {
      return res.status(500).send(err)
    }

    res.json({
      file: `public/${req.files.file.name}`,
    })
  },
)
})

app.post('/startbatch', (req, res)=>{
let countDate = 1
let countemails = 0
StartDate.find( //query today up to tonight
  {"StartDate": { "$gt":new Date(date.getFullYear(), req.body.month, 1) ,"$lt": req.body.StartDate}}, (err,user)=>{
    countDate = user.length;
    console.log(user);
  }).then(()=>{
      countDate ++;
      batchname = months[req.body.month] + "_" + countDate + "_" + "batch";
      let startdate = new StartDate({
        StartDate: req.body.StartDate,
        Batchname : batchname
      });
      startdate.save().then(()=>{
      console.log("startdate succesfully saved");
      const result = excelToJson({
        source: fs.readFileSync('./excelsheets/'+ req.body.filename)
      });
      var emails = ""
        Object.values(result.Sheet1).forEach((item, i)=>{
        newArr = Object.values(result.Sheet1[i]);
        emails = emails + newArr[newArr.length-1] + ", "
        emails =  emails.slice(0, -1); 
        countemails+=1
        console.log(emails);
       

      })
      if(countemails == Object.keys(result.Sheet1).length) // tryna make it async
        sendEmail(emails).catch(console.error);
      

      console.log(result);
      res.sendStatus(200);
});
});
});



///////////////////////////////////////////////////////////////////GET////////////////////////////////////////////////////////

app.get("/getmentor/:usertype/:AID", (req, res) => {
  var usertype = req.params.usertype;
  var AID = req.params.AID;
    Mentee.findOne({"usertype":usertype, "AID":AID},{lname:1,fname:1,email:1,AID:1,skills:1}, function(err,user){
      if(err){
        console.log(err);
      }
      else {
        console.log(user);
        res.send(user);
      }
    });
});

app.get("/getgoals/:aid", (req, res) => {
  var aid = req.params.aid;
  console.log(aid);
    Mentee.find({"AID":aid}, function(err,user){
      if(err){
        console.log(err);
      }
      else {
        console.log(user);
        res.send(user);
      }
    });
});

app.get("/getmentee/:aid", (req, res) => {
  var aid = req.params.aid;
    Mentee.findOne({"AID":aid},{lname:1,fname:1,email:1,batch:1,AID:1,scorecard:1}, function(err,user){
      if(err){
        console.log(err);
      }
      else {
        console.log(user);
        res.send(user);
      }
    });
});

app.get("/getallmentees/:usertype/:MID", (req, res) => {
  var usertype = req.params.usertype;
  var MID = req.params.MID;
    Mentee.find({"usertype":usertype, "MID":MID},{lname:1,fname:1,email:1,batch:1,AID:1,scorecard:1}, function(err,user){
      if(err){
        console.log(err);
      }
      else {
        console.log(user);
        res.send(user);
      }
    });
});

app.get("/getusertype/:aid",(req,res) => { 
  var aid = req.params.aid;
    Usertype.find({"associateID":aid},{associateID:1,_id:0,userType:1}, function(err,user){
      if(err){
        console.log(err);
      }
      else {
        console.log(user);
      }
    });
});

app.get('/getmenteeaid', (req, res) => {
  Mentee.find({ 'mentor.firstname': "Amuktha"}, function(err, user) {
    console.log(user)
    res.send(user);
  
    //just test with username for now!
  });
});

app.get("/getcumilativescore", (req, res) => {
Mentee.findOne({ associateID: "VK067843" }, function(err, user) {
  cumilative = {
    CommunicatesEffectively: "0",
    ExhibitesProfessionalism: "0",
    LearningAgility: "0",
    Makes_and_Keeps_Commitments: "0",
    QualityWorkProducts: "0",
    TechnicalCompetency: "0",
    week: "0"
  };
  arr = user.scorecard;
  console.log(arr);
  for (i = 0; i < arr.length; i++) {
    if (
      arr[i].CommunicatesEffectively != 0 &&
      arr[i].CommunicatesEffectively != cumilative.CommunicatesEffectively
    ) {
      cumilative.CommunicatesEffectively = arr[i].CommunicatesEffectively;
    }
    if (
      arr[i].ExhibitesProfessionalism != 0 &&
      arr[i].ExhibitesProfessionalism != cumilative.ExhibitesProfessionalism
    )
      cumilative.ExhibitesProfessionalism = arr[i].ExhibitesProfessionalism;

    if (
      arr[i].LearningAgility != 0 &&
      arr[i].LearningAgility != cumilative.LearningAgility
    )
      cumilative.LearningAgility = arr[i].LearningAgility;

    if (
      arr[i].Makes_and_Keeps_Commitments != 0 &&
      arr[i].Makes_and_Keeps_Commitments !=
        cumilative.Makes_and_Keeps_Commitments
    )
      cumilative.Makes_and_Keeps_Commitments =
        arr[i].Makes_and_Keeps_Commitments;

    if (
      arr[i].QualityWorkProducts != 0 &&
      arr[i].QualityWorkProducts != cumilative.QualityWorkProducts
    )
      cumilative.QualityWorkProducts = arr[i].QualityWorkProducts;

    if (
      arr[i].TechnicalCompetency != 0 &&
      arr[i].TechnicalCompetency != cumilative.TechnicalCompetency
    )
      cumilative.TechnicalCompetency = arr[i].TechnicalCompetency;
  }
  console.log(cumilative);

  res.send(cumilative);
  //just test with username for now!
});
});


app.get("/getmyfeedback/:mid", (req, res) => {
  var id=req.params.mid
  Mentee.find({MID:id,mentorfeedback: { $exists: true}},{AID:1,fname:1,lname:1,mentorfeedback:1},function(err, user) {
  //console.log(user)
  res.send(user)
  });
  }); 

  app.get("/getouthistory/:aid", (req, res) => {
    var id=req.params.aid
    Outrec.find({AID:id},function(err, user) {
    //console.log(user)
    res.send(user)
    });
    });  

/////////////////////////////////////////////////////////////////////LISTEN SERVER/////////////////////////////////////////////

app.listen(3002,(error)=>{
 if(error) 
  console.log(error);
  else
  console.log("connected")
})


///////////////////////////////////////////////////////////////////////////////////////

//ADMIN FUNCTIONS 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////--------------------new schema code here  ////////////////////////////////////////////////////////////////////////////////////////
    

app.get("/adminlanding",(req,res) => {
batchdetails.find({batch_id: {$exists:true} },{batch_id:1,start_date:1,no_mentees:1,remainweek:1,gradper:1,TAT:1},function(err,user){
if(err) console.log(err);
else {
res.send(user);
//console.log(user);
 }
 });
});


app.get("/shownotifsccount", (req, res) => {
  Mentee.find({scorecard: { $exists: true}},{scorecard:1,AID:1}, function(err, user) {
 // console.log(user)
 if(err)
 console.log(err)
 else
 { var count=0
   user.forEach(element => {
    var len=element.scorecard.length
    var i=len-1
    if(element.scorecard[i].approved!="true") 
     count++
   });
   var toSend={'count':count}
  res.send(toSend);
 }
  });
  }); 



app.get("/amentee/:batch", (req, res) => {
  var b=req.params.batch
  Mentee.find({batch:b,MID: { $ne: "-" }}, function(err, user) {
 // console.log(user)
  res.send(user);
  
  });
  }); 

  app.get("/umentee/:batch", (req, res) => {
    var b=req.params.batch
    Mentee.find({batch:b,MID:"-" }, function(err, user) {
   // console.log(user)
    res.send(user);
    
    });
    }); 
  
  
  
  //GET ALL MENTORS
  app.get("/assignedmentors", (req, res) => {
    Mentor.find({ acm: { $gt:0} }, function(err, user) {
   // console.log(user)
    res.send(user);
   
    });
    }); 

    app.get("/freementors", (req, res) => {
      Mentor.find({ acm: { $lt:5} }, function(err, user) {
     // console.log(user)
      res.send(user);
     
      });
      }); 

    app.get("/nsumentor", (req, res) => {
      Mentor.find({ acm:0 }, function(err, user) {
     // console.log(user)
      res.send(user);
      });
      }); 

    //get mentees of mentor MID
    app.get("/menteesundermentor/:mid", (req, res) => {
      var aid=req.params.mid
      Mentee.find({MID:aid}, function(err, user) {
     // console.log(user)
      res.send(user)
      });
      }); 

      app.get("/freementees", (req, res) => {
        Mentee.find({MID:'-'}, function(err, user) {
        //console.log(user)
        res.send(user)
        });
        }); 
  
        app.post('/alignmentees', (req, res)=> {
          values = req.body
        // console.log(values);     
        // console.log(values.AIDs)
         values.AIDs.forEach(element => {
          Mentee.findOneAndUpdate({AID:element}, {MID:values.MID} ,{new:true}, (err, user) =>{
            {
            
            } 
          }) 
         });
         
         Mentor.findOneAndUpdate({AID:values.MID},{ $set: { acm: values.num }},{new:true}, (err, user) =>{
          {
            
          }    
        })   
          
       
        })
        ///get outlier 
        app.get("/getoutlierorder/:b", (req, res) => {
          var bat=req.params.b
          Mentee.find({batch:bat,scorecard: { $exists: true}},{AID:1,MID:1,fname:1,scorecard:1},function(err, user) {
          //console.log(user)
          res.send(user)
          });
          }); 

     //set approved
        app.post('/setapproved', (req, res)=> {
            arr = req.body.selected
        var c=0
        var l=arr.length
       
        arr.forEach(element => {
          var setObject = {};
            setObject["scorecard."+element.weekno+".approved"]=true
     
            Mentee.findOneAndUpdate({AID:element.aid},{$set:setObject },{new:true}, (err, user) =>{
              {
                if(err)
                console.log(err)
                else
              {
                c++
                if(c==l)
                res.send("done")
              }
               }   
            })
        });    
      
          })

          app.post('/setasoutlier', (req, res)=> {   
            arr = req.body.selected
            var c=0
            var l=arr.length
           console.log(l)    
            arr.forEach(element => {
              var setObject = {};
                setObject["scorecard."+element.weekno+".approved"]="markedforreview"
         
                Mentee.findOneAndUpdate({AID:element.aid},{$set:setObject },{new:true}, (err, user) =>{
                  {
                    if(err)
                    console.log(err)
                    else
                  {
                    c++
                    if(c==l)
                    res.send("done")
                  }
                  }   
                })
            });   
          })
  


     
          app.get("/getdistinctbatches", (req, res) => {

            Mentee.distinct('batch',{},function(err, user) {
              if(err){
                console.log(err);
              }
              else {
                //console.log();
                res.send(user);
              //  console.log(user)
              }
                 
            });
          });

          app.post('/normalize', (req, res)=> {
        
            values = req.body
            
            
            var setObject = {};
            setObject["scorecard."+values.week+".EP"]=values.EP
            setObject["scorecard."+values.week+".CE"]=values.CE
            setObject["scorecard."+values.week+".LA"]=values.LA
            setObject["scorecard."+values.week+".MK"]=values.MK
            setObject["scorecard."+values.week+".WQ"]=values.WQ
            setObject["scorecard."+values.week+".TC"]=values.TC
            setObject["scorecard."+values.week+".feedback"]=values.feedback
            setObject["scorecard."+values.week+".approved"]="true"
            
            //console.log(setObject)
            Mentee.findOneAndUpdate({AID:values.AID},{$set:setObject },{new:true}, (err, user) =>{
              {
                if(err)
                res.send(err)
                else
                res.send("done")
              
              }  
             
            })
               
          })
            
          app.post('/removementor', (req, res)=> {
        
            values = req.body
            var final=values.acm-values.num
            Mentor.findOneAndUpdate({usertype:2,AID:values.mAID},{ $set: { acm:final }}, (err, user) =>{
              {
                if(err)
                console.log(err)
                
              }    
            }).then(
            values.list.forEach(element => {
            Mentee.findOneAndUpdate({usertype:3,AID:element},{$set:{MID:'-'}}, (err, user) =>{
              {
                if(err)
                console.log(err)
              }    
            })
            
          })
          );
          })


      app.post('/addoutlier',(req,res)=>{

        values = req.body
      var out=new Outrec({
        AID:values.AID,
        MID:values.MID,
        batch:values.batch,
        week:values.week,
        date:values.date,
        EP:values.EP,
        CE:values.CE,
        LA:values.LA,
        MK:values.MK,
        WQ:values.WQ,
        TC:values.TC,
        feedback:values.feedback
        })
        out.save().then(()=>{
          if(err)
          console.log(err)
          else
         res.send("done")
        });
      })

      app.get("/getallout/:b", (req, res) => 
      { 
        var b=req.params.b
        Outrec.find({batch:b},function(err, user) {
        //console.log(user)
        res.send(user)
        });
        }); 

      app.get("/getmentorfeedback", (req, res) => {
          Mentee.find({mentorfeedback: { $exists: true}},{AID:1,fname:1,mentorfeedback:1,MID:1,graduated:1,lname:1},function(err, user) {
          //console.log(user)
          res.send(user)
          });
          }); 

          app.post('/mentorfapprove', (req, res)=> {   
            values = req.body
            var setObject = {};
            setObject["mentorfeedback."+values.i+".approved"]=values.app
            //console.log(setObject)
            Mentee.findOneAndUpdate({AID:values.AID},{$set:setObject },{new:true}, (err, user) =>{
              {
                
              }    console.log(res);
            })
               
          })   
      
 ///mentorfeedback function will only get the data where feedback 1 or more exists else error
 ///so when registering mentee mentorfeedback will not be present to avoid errors
 
 
//this functiona adds mentorfeedback array to the db








///////////////////////////////////////////////////////////////////////////////// 

//MENTEE FUNCTIONS
///////////////
app.get("/getprofile/:aid", (req, res) => {
  var id=req.params.aid
  Mentee.findOne({ AID:id}, function(err, user) {
  console.log(user)
  res.send(user);
  //just test with username for now!
  });
  }); 

  
app.get("/checkfeedbackavail/:aid", (req, res) => {
    var id=req.params.aid
    Mentee.findOne({AID:id},{mentorfeedback:1,scorecard:1,graduated:1},function(err, user) {
    //console.log(user)
    res.send(user)
    });
    }); 

    app.post('/fxmentorfeedback', (req, res)=> {
 
      var values = req.body
     
      var newfeedback = {
      content:values.text,
      date:new Date(),
      approved:"needreview"
      }
      
      Mentee.findOneAndUpdate({AID:values.aid}, {$push:{'mentorfeedback': newfeedback}}, {upsert:true,new:true}, (err, user) =>{
          if(err)
          res.send(err)
          else
          res.send("done")
      })
         
    })


app.get("/getscorecard/:aid", (req, res) => {
  var id=req.params.aid
  Mentee.findOne({AID:id }, function(err, user) {
    if(err){
      console.log(err);
    }
    else {
      
var size=user.scorecard.length
var i=size-1
while(i>=0)
{
if(user.scorecard[i].approved=="true")
 {var final=i
 break
 }
else
 i--;
}
console.log(i)
var list=[];
for(var x=0;x<=final;x++)
{
list[x]=user.scorecard[x]

}


      res.send(list);
    }
     
  });
});

app.get("/getcurrentweek/:aid",(req,res)=>{
  var id=req.params.aid
  
   Mentee.findOne({ AID:id }, function(err, user) {
     if(err){
       console.log(err);
     }
     else {
       //console.log(user);
     var size=user.scorecard.length; //8
     var curweek=size-1; //contaINS LATEST WEEEK IF APPROVED 7
     var pastweek=size-2; //WILL CONTAIN WEEK BEFORE LAST 
     console.log(user.scorecard[curweek].approved)

    if(user.scorecard[curweek].approved==="true")
     { 
       res.send(user.scorecard[curweek]);
       console.log(user.scorecard[curweek])
     }
    else
    {
       
      if(pastweek>=0)
      res.send(user.scorecard[pastweek])
      else
     {  var message="nse"
        res.send(message)
     }
    }

     }
     
 });
 });


 app.get("/jirasummary", (req, res) => { 
  request('https://jira2.cerner.com/rest/api/2/issue/DEVACDMY-23507.json',{ json: true }, (err, response, body) => {
  if (err) { return console.log(err); }
  console.log(response);
  res.send(response.body.fields.summary)
  console.log(response.body.fields.subtasks)
 });
  
 });
  
 app.get("/jirasubtasks", (req, res) => { 
  request('https://jira2.cerner.com/rest/api/2/issue/DEVACDMY-23507.json',{ json: true }, (err, response, body) => {
  if (err) { return console.log(err); }
  console.log(response);
  res.send(response.body)
  // console.log("lets see again")
  //console.log(response.body.fields.subtasks)
 });
 });

 app.get("/jiraorion", (req, res) => { 
  request('https://jira2.cerner.com/rest/api/2/issue/ION-20256.json',{ json: true }, (err, response, body) => {
  if (err) { return console.log(err); }
  console.log(response);
  res.send(response.body)
  // console.log("lets see again")
  //console.log(response.body.fields.subtasks)
 });
 });










 //////////////////////////redis extras
//  const getweekdate = (req,res) => {
//   associateID = req.params.aid;
//   Mentee.findOne({ associateID: associateID }, function(err, user) {
//     var startBatchdate = user.batch; //get the date
//     var count = user.scorecard.length;
//     var username = user.firstname;
//     var mentorfname = user.mentor.firstname;
//     var mentorlname = user.mentor.lastname;
//     var usernamelast =user.lastname;
//     result = getRange();
//     toSend = {result: result, count: count, username, mentorfname, mentorlname,usernamelast}
//     redisClient.setex(associateID +'x', 3600, JSON.stringify(toSend));
//     console.log(toSend);
//     res.send(toSend);
    
// })

// }

// const getallgoals = (req, res) => {
//   associateID = req.params.aid ;
//   Mentee.findOne({ associateID: associateID }, function(err, user) {
//     console.log("hey");
//     console.log(user.mentor.goals);
//     for(var i = 0; i<user.mentor.goals.length; i++){
//     user.mentor.goals[i] = user.mentor.goals[i].toObject();
//     }
//     for(var i = 0; i<user.mentor.goals.length; i++){
//       var month = user.mentor.goals[i].duedate.getMonth();
//       var monthname =  months[month]
//       var date = user.mentor.goals[i].duedate.getDate();
//       var year = user.mentor.goals[i].duedate.getFullYear()
//       var date_with_suffix =  ordinal_suffix_of(date)
//       user.mentor.goals[i].year = year;
//       user.mentor.goals[i].monthname = monthname
//       user.mentor.goals[i].date_with_suffix =  date_with_suffix
      
//     };
//     redisClient.setex(associateID, 3600, JSON.stringify(user.mentor.goals));
//     res.send(user.mentor.goals);
//    //console.log(user.mentor.goals);
// })
// }

// const getCache1 = (req, res) => {
//   let associateID = req.params.aid;
//   console.log(associateID);
//   //Check the cache data from the server redis
//   redisClient.get(associateID, (err, result) => {
//     if (result) {
//       console.log("Showing the cached output, so its faster now!, getCache1")
//       res.send(result);
//     } else {
//       getallgoals(req, res);
//     }
//   });
// }
// const getCache2 = (req, res) => {
//   let associateID = req.params.aid;
//   console.log("Showing the cached output, so its faster now!, getCache2")
//   redisClient.get(associateID+'x', (err, result) => {
//     if (result) {
//       res.send(result);
//     } else {
//       getweekdate(req, res);
//     }
//   });
// }
// app.get("/getweekdate/:aid", getCache2)
// app.get("/getallgoals/:aid", getCache1);

