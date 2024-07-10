const express = require('express')
var bodyParser = require('body-parser')
var { z } = require('zod')

const app = express()
const port = 3000

var forms = [];
let questions = [];

app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.json(forms);
})
//get all
app.get("/getForms", (req, res) => {
  console.log(forms[0].formName);
  res.json(forms);
});
//get all question
app.get("/getQuestion", (req, res) => {
  try {
    questions = forms[0].form[0].question;
    res.json(questions);
  } catch (err) {
    res.send(forms);
  }

});
//get question by id
app.get("/getQuestionById/:id", (req, res) => {

  try {
    //check if Id exist
    if (forms[0].form[0].question.length >= parseInt(req.params.id)) {
      console.log(forms[0].form[0].question[(parseInt(req.params.id) - 1)]);
      res.json(forms[0].form[0].question[(parseInt(req.params.id) - 1)]);
    } else {
      res.status(400).send({
        message: "Question didn't exist"
      });
    }
  } catch (err) {
    res.send(err);
  }
});

//create
app.post("/createForms", /* validate(formSchema), */ (req, res) => {

  console.log("pass3");
  //loop question
  for (let i = 0; i < forms.length; i++) {
    if (req.body.formName == forms[i].formName) {
      res.status(400).send({
        message: "Question name is already in used!"
      });
      return null;
    }
  }
  for (let i = 0; i < req.body.question.length; i++) {

    let checkChoice = [];
    //loop choice
    for (let j = 0; j < req.body.question[i].choice.length; j++) {

      checkChoice.push(req.body.question[i].choice[j].correct);
      //if choice have more than 1 correct answer
      if (checkChoice.filter(Boolean).length > 1) {
        //response error message
        res.status(400).send({
          message: "There shouldn't have more than one correct answer!"
        });

        return null;
      }
    }
    checkChoice = [];
  }
  forms.push(req.body);
  return res.json({ ...req.body });
});

//Update
app.patch("/updateFormById/:id", (req, res) => {
  forms.splice(parseInt(req.params.id) - 1, parseInt(req.params.id) - 1, req.body);
  /* let oldData = forms[0].filter(function (entry){
    return forms[parseInt(req.params.id)]
  }); */
  console.log(forms);
  /* res.send(oldData); */
  res.send({
    message: "successfully update!"
  });
});

app.delete("/deleteFormById/:id", (req, res) => {
  console.log("Deleted")
  forms.splice(parseInt(req.params.id) - 1, parseInt(req.params.id) - 1);
  res.send({
    message: "Successfully deleted Form " + req.params.id
  });
});

//nodemon, เคสตั้งชื่อตัวแปร, status code, methodapi, validate ZOD, ชื่อฟอร์มซ้ำ, ลบด้วยไอดี, updateById
//typescript, docker
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})