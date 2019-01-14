var express = require("express");
var app = express();

var request = require("request");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, resp)
  {
    resp.sendFile(__dirname+"/signup.html");
  }
)

app.post("/", function(req, resp)
{
  var firstName = req.body.firstName;
  var secondName = req.body.secondName;
  var email = req.body.email;

var data =
{
    memebers: [{email_address: email, status: "subscribed", merge_fields: {FNAME: firstName, LNAME: secondName} }]
}

var jsonData = JSON.stringify(data);

var options = {
  url: 'https://us20.api.mailchimp.com/3.0/lists/39dd190364',
  method: "POST",
  headers: {"Authorization": "vedant1 3b7a5cab4d08a27b580bb1938d73f29d-us20"},
  body: jsonData
}


request(options, function(error, response, body)
{
    if (error)
    {
      console.log(error);
    }
    else
    {
        console.log(response.statusCode);
    }
    if(response.statusCode === 200)
    {
      resp.sendFile(__dirname + "/success.html");
    }
    else
    {
        resp.sendFile(__dirname + "/failure.html");
    }


})



})


app.post
(
  "/try_again", function(req, resp)
  {
    resp.redirect("/");
  }
)

app.listen
(process.env.PORT || 3000, function()
  {
    console.log("Port is available now.");
  }
)
//3b7a5cab4d08a27b580bb1938d73f29d-us20
//39dd190364
