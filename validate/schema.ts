
import { z, AnyZodObject } from "zod";

const formSchema = z.object({
  body: z.object({
    formName: z.string({
      required_error: "formName is required",
    }),
      name: z.string({
        required_error: "questionName is required",
      }),
      description: z.string({
        required_error: "choice description cannot be empty",
      }).optional(),
  }),
});

