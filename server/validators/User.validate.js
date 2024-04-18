const { z } = require("zod");

const userSchemaValidate = z.object({
  firstName: z
    .string({ required_error: "Firstname is required." })
    .trim()
    .min(3, { message: "Firstname must contain at least 3 characters." }),

  lastName: z
    .string({ required_error: "Lastname is required." })
    .trim()
    .min(3, { message: "Lastname must contain at least 3 characters." }),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .min(10, { message: "Email must be at least 10 characters long." })
    .max(255, { message: "Email cannot exceed 255 characters." })
    .email({ message: "Invalid email address." }),

  phone: z
    .string({ required_error: "Phone is required." })
    .trim()
    .min(10, { message: "Phone must be at least 10 digits." })
    .max(10, { message: "Phone must be at most 10 digits." }),

  nic: z
    .string({ required_error: "NIC is required." })
    .trim()
    .min(5, { message: "NIC must be at least 5 digits." }),

  dob: z.string({ required_error: "Date of birth is required." }).
      trim()
      .min(1, { message: "DOB is required" }),

  gender: z
    .string({ required_error: "Gender is required." })
    .trim()
    .refine((value) => value === "male" || value === "female", {
      message: 'Gender must be either "male" or "female".',
      path: ["gender"],
    }),

  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(3, { message: "Password must be at least 3 characters long." }),

  role: z
    .string({ required_error: "Role is required." })
    .trim()
    .refine((value) => ["admin", "patient", "doctor"].includes(value), {
      message: 'Role must be one of "admin", "patient", or "doctor".',
      path: ["role"],
    })
    .optional(),

  doctorDepartment: z
    .string({ required_error: "Doctor department is required." })
    .min(1, { message: "department field is required" })
    .optional(),

  // docAvatar: z.object({
  //     public_id: z.string(),
  //     url: z.string()
  // }).optional() // Assuming docAvatar is optional
});

const userLoginSchemaValidate = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address." }),

  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(3, { message: "Password must be at least 3 characters long." }),

  role: z
    .string({ required_error: "Role is required." })
    .trim()
    .refine((value) => ["admin", "patient", "doctor"].includes(value), {
      message: 'Role must be one of "admin", "patient", or "doctor".',
      path: ["role"],
    }),
});

module.exports = { userSchemaValidate, userLoginSchemaValidate };
