import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}

// Register
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }
        // Handle user registration logic

        // check user exist
        if(user){
            return res.status(400).json({message: 'User already exists'})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role === 'patient'){
            user = new User({
                name, email, password: hashPassword, photo, gender,role
            })
        }
        else if(role === 'doctor'){
            user = new Doctor({
                name, email, password: hashPassword, photo, gender,role
            })
        }

        await user.save()
        res.status(200).json({success: true, message: "User successfully created"})
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login
// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         let user = null;
//         if (req.body.role === 'patient') {
//             user = await User.findOne({ email });
//         } else if (req.body.role === 'doctor') {
//             user = await Doctor.findOne({ email });
//         }

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token for authenticated user
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ success: true, token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

export const login = async (req, res) => {
    const {email} = req.body
    try{
        let user = null
        const patient = await User.findOne({email})
        const doctor = await Doctor.findOne({email})
        if(patient){
            user = patient
        }
        if(doctor){
            user = doctor
        }
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        // get token
        const token = generateToken(user)
        const {password, role, appoinment, ...rest} = user._doc
        res.status(200).json({ success: true, message: "Login successful", token, data:{...rest}, role });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
