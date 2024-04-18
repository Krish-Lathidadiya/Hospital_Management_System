const express=require('express');
const Router=express.Router()

//middleware
const {validateSchema}=require('../middleware/SchemaValidate.middleware')
const {isAdminAuthenticated}=require('../middleware/auth.js')
const {isPatientAuthenticated}=require('../middleware/auth.js')

//zod 
const messageSchemaValidate=require('../validators/message.validate')
const {userSchemaValidate}=require('../validators/User.validate')
const {userLoginSchemaValidate}=require('../validators/User.validate.js')

//controller
const {sendMessage}=require('../controllers/Message.Controller')
const {getAllMessages}=require('../controllers/Message.Controller')

const {userRegister}=require('../controllers/user.Controller.js')
const {login}=require('../controllers/user.Controller.js')

const {addNewAdmin}=require('../controllers/user.Controller.js')

const {getAllDoctors}=require('../controllers/user.Controller.js') 
const {countDoctors}=require('../controllers/user.Controller.js')
const {getUserDetails}=require('../controllers/user.Controller.js') 


const {logoutAdmin}=require('../controllers/user.Controller.js')
const {logoutPatient}=require('../controllers/user.Controller.js') 

const {addNewDoctor}=require('../controllers/user.Controller.js') 

const {postAppointments}=require('../controllers/appointment.Contoller.js')
const {getAllAppoientments}=require('../controllers/appointment.Contoller.js')
const {updateAppointment}=require('../controllers/appointment.Contoller.js')
const {deleteAppointment}=require('../controllers/appointment.Contoller.js')
const {countAppointment}=require('../controllers/appointment.Contoller.js')

//send message
Router.post('/sendMessage',validateSchema(messageSchemaValidate),(sendMessage))
Router.get('/getAllMessages',getAllMessages)

//user register and login
Router.post('/userRegister',validateSchema(userSchemaValidate),(userRegister))
Router.post('/login',validateSchema(userLoginSchemaValidate),(login))

//add new admin
Router.post('/admin/addnew',validateSchema(userSchemaValidate),(addNewAdmin))

//get admin and patien details
Router.get('/admin/me',(isAdminAuthenticated),(getUserDetails))
Router.get('/patient/me',(isPatientAuthenticated),(getUserDetails))


//get all doctors
Router.post('/doctors/addNew',validateSchema(userSchemaValidate),addNewDoctor)
Router.get('/doctors',(getAllDoctors))
Router.get('/countDoctors',(countDoctors))

//appoirnments
Router.post('/postAppointments',isPatientAuthenticated,(postAppointments))
Router.get('/getAllAppoientments',(getAllAppoientments))
Router.put('/updateAppointment/:id',(updateAppointment))
Router.delete('/deleteAppointment/:id',(deleteAppointment))
Router.get('/countAppointment',(countAppointment))

module.exports =Router