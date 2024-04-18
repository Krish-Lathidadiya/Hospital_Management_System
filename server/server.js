
require('dotenv').config();

const express=require('express')
const app= express()

//router file
const Router=require('./routers/router.js')

//cookie
const cookieParser = require('cookie-parser')
const expressfileupload =require('express-fileupload')

//error middleware
const errorMiddleware=require('./middleware/Error.middleware.js')


//databse connection
const connectionDB=require('./utils/db.js')

//tackle cors
const cors = require('cors');
const Options = {
  origin:  ['http://127.0.0.1:5173','http://127.0.0.1:5174'],
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};
app.use(cors(Options));

const cloudinary=require ('cloudinary')
cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

//ane router ni(badhay ni) pela define karvu
app.use(express.json());
app.use(cookieParser())

app.use(express.urlencoded({ extended:true }));
app.use(expressfileupload({
    useTempFiles: true,
    tempFileDirectory:'/tmp/'
}))

const port = process.env.PORT || 3000;

app.use(Router)
app.use(errorMiddleware)
connectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
