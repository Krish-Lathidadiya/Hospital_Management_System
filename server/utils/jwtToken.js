
const jwtToken=async(user,message,status,res)=>{
    const token =await user.generateToken()

    //cookie
    const cookieName=user.role==='Admin'?'adminToken':'patientToken';
    res
    .status(status)
    .cookie(cookieName,token,{
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 *60 * 60 * 1000),
        httpOnly:true
        }
    )
    .json({
        success:true,
        message,
        user,
        token
    })
}

module.exports =jwtToken