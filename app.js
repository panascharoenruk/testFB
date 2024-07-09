const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 3000

let forms = [];
/* let questions = []; */
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//get all
app.get("/forms", (req, res) => {
  console.log(forms);
  res.json(forms);
});
//get question by id
app.get("/question/:id", (req, res) => {
  console.log(forms[0].Form.question[(parseInt(req.params.id)-1)]);
  res.json(forms[0].Form.question[(parseInt(req.params.id)-1)]);
});
//create
app.post("/forms", (req, res) => {

  //loop question
  for(let i = 0; i < req.body.Form.question.length; i++){
    let checkChoice = [];
    //loop choice
    for(let j = 0; j < req.body.Form.question[i].choice.length; j++){
      checkChoice.push(req.body.Form.question[i].choice[j].correct);
    }
    //if choice have more than 1 correct answer
    console.log("Number of correction:");
    console.log(checkChoice.filter(Boolean).length);
    if(checkChoice.filter(Boolean).length > 1){
      //return error
      res.send({
        message: "There shouldn't have more than one correct answer!"
      });
      return null;
    }
    checkChoice = [];
  }

  forms.push(req.body);
  res.send(forms[0]);

});

//Update Json Data
/* app.put("/forms", (req, res) => {
  forms.push(req.body);
  console.log(req.body);
  res.send(forms);
}); */


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})