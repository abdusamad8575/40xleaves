const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  //  console.log(req.body)
   const {
      username, 
      password,
      email,
      phone,  
   } = req.body;
   console.log("sam-",username, 
    password,
    email,
    phone)

   try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      // await User.create({
      //    username,
      //    password: encryptedPassword,
      //    email,
      //    phone,
      // });
      const newUser = new User({
         username,
         password: encryptedPassword,
         phone,
         email,
       });
    
       await newUser.save();

      // const accessToken = jwt.sign(
      //    { _id: userExists._id },
      //    process.env.JWT_ACCESS_SECRET,
      //    {
      //       expiresIn: process.env.JWT_ACCESS_EXPIRY,
      //    }
      // );

      // const refreshToken = jwt.sign(
      //    { _id: userExists._id },
      //    process.env.JWT_REFRESH_SECRET,
      //    {
      //       expiresIn: process.env.JWT_REFRESH_EXPIRY,
      //    }
      // );

      // console.log({ accessToken, refreshToken });
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      return res.status(200).json({
         message: "Registration successfull",
         data: { userWithoutPassword,signupStatus:true } 

         // data: { token: { accessToken, refreshToken }, newUser } 
      });
   } catch (error) {
      console.log('err',error)
      return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
   }
};

// module.exports.signin = async (req, res) => {
//    const { email, password } = req.body; 
//    console.log('req',req.body)

//    try {
//       const pipeline = [
//          { 
//             $match: {
//                $or: [
//                   { username: email },
//                   { email: email },
//                   { phone: email },
//                ],
//             },
//          },
//          {
//             $project: {
//                _id: 1,
//                username: 1,
//                email: 1,
//                phone: 1,
//                password: 1,
//                is_admin: 1,
//                is_verified: 1,
//                profile: 1,
//                cart: 1,
//                wishlist: 1,
//                wallet: 1,
//             },
//          },
//       ];

//       await userSchema
//          .aggregate(pipeline)
//          .exec()
//          .then((users) => {
//             if (users.length === 0) {
//                console.log("User not found");
//                return res.status(404).json({ message: "user not found" })
//             } else {
//                const user = users[0];
//                bcrypt.compare(password, user.password, (err, result) => {
//                   if (err) {
//                      console.error("Password comparison error:", err);
//                      return res.status(500).json({ message: err?.message })
//                   } else if (result) {
//                      const accessToken = jwt.sign(
//                         { _id: user._id },
//                         process.env.JWT_ACCESS_SECRET,
//                         {
//                            expiresIn: process.env.JWT_ACCESS_EXPIRY,
//                         }
//                      );

//                      const refreshToken = jwt.sign(
//                         { _id: user._id },
//                         process.env.JWT_REFRESH_SECRET,
//                         {
//                            expiresIn: process.env.JWT_REFRESH_EXPIRY,
//                         }
//                      );
//                      delete user.password;
//                      return res.status(200).json({
//                         message: "login successfull",
//                         data: { token: { accessToken, refreshToken }, user }
//                      });
//                   } else {
//                      console.log(result);
//                      console.log("Incorrect password");
//                      return res.status(404).json({ message: "Incorrect password" })
//                   }
//                });
//             }
//          });
//    } catch (error) {
//       return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
//    }
// };


module.exports.signin = async (req, res) => {
   const { password, email } = req.body;
   console.log('req body',req.body)
   try {
     // Find the user by email
     const existingUser = await User.findOne({ email });
     console.log('ex usrr',existingUser)
     if (!existingUser) {
       return res.status(401).json({ message: "Invalid email or password" });
     }
 
     // Compare the provided password with the stored hashed password
     const passwordMatch = await bcrypt.compare(password, existingUser.password);
     console.log('passmach',passwordMatch)
     if (!passwordMatch) {
       return res.status(401).json({ message: "Invalid email or password" });
     }
 
     // Generate the access token
     const accessToken = jwt.sign(
       { _id: existingUser._id },
       process.env.JWT_ACCESS_SECRET,
       {
         expiresIn: process.env.JWT_ACCESS_EXPIRY,
       }
     );
 
     // Generate the refresh token
     const refreshToken = jwt.sign(
       { _id: existingUser._id },
       process.env.JWT_REFRESH_SECRET,
       {
         expiresIn: process.env.JWT_REFRESH_EXPIRY,
       }
     );
 console.log('existingUser', existingUser )
 console.log('accessToken', accessToken  )
 console.log('refreshToken', refreshToken)
     // Respond with the user data and tokens
     res.status(200).json({
       proceed: true,
       data: { token: { accessToken, refreshToken }, existingUser },
       message: "Login successful",
     });
   } catch (error) {
     console.log("Error during sign-in:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 };


module.exports.getCurrentUser = async (req, res) => {
   try {
      const _id = req.decoded._id;
      console.log('idd,',_id)
      const currentUser = await User.findOne({ _id });
      console.log('crnt user ',currentUser)
      if (!currentUser) {
         return res.status(400).json({ message: 'user does not exists' })
      }
      return res.status(200).json({ data: currentUser, message: 'user details fetched successfully' })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
   }
}