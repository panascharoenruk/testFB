const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 3000

var forms = {};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//get all
app.get("/getForms", (req, res) => {
  res.json(forms);
});
//get all question
app.get("/getQuestion", (req, res) => {
  res.json(forms.Form.question);
});
//get question by id
app.get("/getQuestionById/:id", (req, res) => {
  console.log(forms.Form.question[(parseInt(req.params.id) - 1)]);
  res.json(forms.Form.question[(parseInt(req.params.id) - 1)]);
});

//create
app.post("/createForms", (req, res) => {
  forms_test = req.body;

  //loop question
  for (let i = 0; i < req.body.Form.question.length; i++) {
    let checkChoice = [];
    //loop choice
    for (let j = 0; j < req.body.Form.question[i].choice.length; j++) {
      checkChoice.push(req.body.Form.question[i].choice[j].correct);
    }
    //if choice have more than 1 correct answer
    if (checkChoice.filter(Boolean).length > 1) {
      //response error message
      res.send({
        message: "There shouldn't have more than one correct answer!"
      });
      return null;
    }
    checkChoice = [];
  }

  forms = req.body;
  res.send(forms);
  
  
});

/* //Update Form Data
//what if pressed save and update whole form
app.put("/updateForms", (req, res) => {
  //clear old form
  forms = {};

  forms = req.body;

  res.send(forms);
}); */


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})