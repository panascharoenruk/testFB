/* 
import { z, AnyZodObject } from "zod";

const formSchema = z.object({
  body: z.object({
    formName: z.string({
      required_error: "formName is required",
    }),
    question: z.array({
      questionName: z.string({
        required_error: "questionName is required",
      }),
      choice: z.array({
        choice: z.string({
          required_error: "choice description cannot be empty",
        }),
      }),
    }),
  }),
});

const validate = (schema) => (req, res, next) => {
    schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    }); 
    next();

}; */