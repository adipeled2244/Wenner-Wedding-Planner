const path = require("path");
const logger = require("../helpers/winston");
const userService = require("../services/userService");
const { createJSONToken, isValidPassword } = require('../utils/auth');

exports.authController = {
  async login(req, res) {
    const name = req.body.name;
  const password = req.body.password;
   let user;
  try {
    user = await userService.getUserByName(name);
    if(user===null){
 
      return res.status(400).json({
        error: 'User not exist',
      });
    }

    const pwIsValid = await isValidPassword(password, user.password);

    if (!pwIsValid) {
      console.log("!pwIsValid" )

      return res.status(400).json({
        error: 'Invalid name or password entered.'
      });
    }
  
    const token = createJSONToken(name);
     res.status(200).json({ user,token });

    
  } catch (error) {
    return res.status(500).json({ error: 'Authentication failed.' });
  }

 
  },

  async signup(req, res,next) {
    logger.info(`[signup] - ${path.basename(__filename)}`);
   
    const data = req.body;
    let errors = {};
  
      try {
        const existingUser =await userService.getUserByName(data.name);
         if (existingUser) {
          return res.status(400).json({
          error: 'Username exists already.',
         });
        }
      } catch (error) {}
    
      
  
  
    try {
      const createdUser = await userService.addUser(data);
       const authToken = createJSONToken(createdUser.name);
      res
        .status(200)
        .json({ message: 'User created.', user: createdUser, token: authToken });
    } catch (error) {
      next(error);
    }
  },
  
};
