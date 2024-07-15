const express = require('express')
var bodyParser = require('body-parser')
const { z } = require("zod");


const app = express()
const port = 3000

var forms = [];

app.use(bodyParser.json());

const choiceSchema = z.object({
  description: z.string({
    required_error: "description is required"
  })
});
const questionSchema = z.object({
  questionName: z.string({
    required_error: "questionName is required"
  }),
  choice: z.array(choiceSchema)
});
const formSchema = z.object({
  
    formName: z.string({
      required_error: "formName is required"
    }),
    question: z.array(questionSchema)
  
    
});

const formArraySchema = formSchema;

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};

function validateIdInput(id) {
  if (id == 0 || id > forms.length) {
    return true;
  } else {
    return false;
  }
}

app.get('/', (req, res) => {
  res.json(forms);
})
//get all
app.get("/getForms", (req, res) => {
  console.log(forms[0].formName);
  res.json(forms);
});

//get question by id
app.get("/getFormById/:id", (req, res) => {

  try {
    //check if Id exist
    if (forms.length >= parseInt(req.params.id)) {
      console.log(forms[(parseInt(req.params.id) - 1)]);
      res.json(forms[(parseInt(req.params.id) - 1)]);
    } else {
      res.status(400).send({
        message: "Forms didn't exist"
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//create
app.post("/createForms", /* validate(formArraySchema), */ (req, res) => {
  console.log(req.body);
  //loop question
  if (forms.find((form) => { return form.formName == req.body.formName })) {
    res.status(400).send({
      message: "Form name is already in used!"
    });
    return null;
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
  if (validateIdInput(parseInt(req.params.id))) {
    res.status(400).send({
      message: "This Form Id didn't exist: " + req.params.id
    });
    return null;
  }
  if (forms.find((form) => { return form.formName == req.body.formName })) {
    res.status(400).send({
      message: "Form name is already in used!"
    });
    return null;
  }
  
  const result = forms.map((val, index) => {
    if (index == parseInt(req.params.id) - 1) {
      val = req.body;
    }
    return val;
  });
  console.log(result);
  forms = result;
  res.send(forms);
});

//Update single part by id
app.patch("/updatePartById/:id", (req, res) => {
  //forms[parseInt(req.params.id)].formName = req.body.formName;

  const result = forms.map((val, index) => {
    if (index == parseInt(req.params.id) - 1) {
      val = req.body;
    }
    return val;
  });
  res.send(result);
});

app.delete("/deleteFormById/:id", (req, res) => {
  if (validateIdInput(parseInt(req.params.id))) {
    res.status(400).send({
      message: "This Form Id didn't exist: " + req.params.id
    });
    return null;
  }
  forms = forms.slice(parseInt(req.params.id));
  res.send({
    message: "Successfully deleted Form " + req.params.id
  });

});

//nodemon, เคสตั้งชื่อตัวแปร, status code, methodapi, ชื่อฟอร์มซ้ำ, ลบด้วยไอดี, updateById
//validate ZOD, typescript, docker, mongoDB, prisma
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})