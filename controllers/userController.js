import User from '../models/UserSchema.js'

// update
export const updateUser = async(req, res) =>{
    const id = req.params.id
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({success: true, message:'Successfully updated', data: updatedUser})
    }
    catch(err){
        res.status(500).json({success: false, message:'failed to updated'})
    }
}

// delete
export const deleteUser = async(req, res) =>{
    const id = req.params.id
    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({success: true, message:'Successfully deleted'})
    }
    catch(err){
        res.status(500).json({success: false, message:'failed to delete'})
    }
}


// single user
export const getSingleUser = async(req, res) =>{
    const id = req.params.id
    try{
        const user = await User.findById(id).select("-password")
        res.status(200).json({success: true, message:'User found', data: user})
    }
    catch(err){
        res.status(404).json({success: false, message:'No user found'})
    }
}

// all user
export const getAllUser = async(req, res) =>{
    try{
        const users = await User.find({}).select("-password")
        res.status(200).json({success: true, message:'Users found', data: users})
    }
    catch(err){
        res.status(404).json({success: false, message:'No users found'})
    }
}