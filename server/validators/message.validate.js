const {z}=require('zod');

const messageSchemaValidate=z.object({
    firstName: z.string({ required_error: "firstname is required " })
    .trim()
    .min(3, { message: 'name must be contain at least 3 characters ' }),


    lastName: z.string({ required_error: "lastname is required" })
    .trim()
    .min(3, { message: 'lastname must be contain at least 3 characters ' }),
  

    email: z.string({ required_error: "Invalid email address" })
    .trim()
    .min(10, { message: 'Email must be at least 10 characters long' })
    .max(255, { message: 'Email cannot exceed 255 characters' }), 

    phone: z.string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: 'phone must be at least 10 digit' })
    .max(10, { message: 'phone must be at least 10 digit' }), 

    message: z.string({ required_error: "message is required" })
    .trim()
    .min(3, { message: 'message must be at least 3 characters ' })
    .max(255, { message: 'message cannot exceed 255 characters' }),
})

module.exports =messageSchemaValidate