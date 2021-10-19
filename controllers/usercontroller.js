const router=require('express').Router();
const {UserModel}=require('../models');
const {UniqueConstraintError}=require('sequelize/lib/errors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
router.post('/register', async (req, res) =>{
    let {email, password} = req.body.user;
    try{
    const User = await UserModel.create({email,password:bcrypt.hashSync(password,13)});
    let token = jwt.sign({id:User.id},process.env.JWT_SECRET,{expiresIn:60*60*24});
    res.status(201).json({message:'User Uploaded To MATRIX',user:User,sessionToken:token});
}catch(err){
    if (err instanceof UniqueConstraintError){
        res.status(409).json({message:'User Already Uploaded'});
    } else {
    res.status(500).json({message:'Dial Has Been Dropped'});
}}});
router.post('/login', async (req, res) =>{
    let {email, password} = req.body.user;
    try{
    let loginUser = await UserModel.findOne({
        where: {email:email},
    });
    if(loginUser){
    let passwordComparison=await bcrypt.compare(password,loginUser.password);
    if(passwordComparison){
    let token = jwt.sign({id:loginUser.id},process.env.JWT_SECRET,{expiresIn:60*60*24});
    res.status(200).json({user:loginUser,message:'User Uploaded To MATRIX',sessionToken:token});
    }else{
    res.status(401).json({message:'Patient Failed Login: Reregister Information'});}
    }else{
    res.status(401).json({message:'Incorrect Information'})
    }
} catch (error) {
    res.status(500).json({message:'Patient Reject Error From Log'})
}});
module.exports = router;