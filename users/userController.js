const mongoose = require("../dbConnections/connection");
const { ObjectId } = mongoose.Types;
const bcrypt = require('bcrypt');

const userModel = require("./userModel");
const jwtToken = require("../security/jwtToken");
const { comparePassword, stringToHash } = require("../security/bcrypt");


const apiResponse = (status, success, data, message) => {
  return {
    status,
    success,
    data,
    message,
  };
};


const signupUser = async (req, res) => {
  // const { userName, password } = req.body;

  const userName = req.body?.userName;
  const password = req.body?.password;

  if (!userName || !password) {
    return res.status(404).send(apiResponse(404,false,{userName,password},"Please provide all required field!"));
  }

  try {
    let userExist = await userModel.findOne({ userName: userName });


    if (!userExist) {

      const hashPassword = await stringToHash(req.body.password); 
      const createUser = await userModel.create({
        userName: userName,
        password: hashPassword,
        createdOn: Date.now(),
      });
      // console.log(" CraeteUser : ", createUser);

      return res.status(200).send(apiResponse(200,true,{createUser},"Signup user successfully"));

    } else {
      // user already exists
      return res.status(403).send(apiResponse(403,false,{userName},"User already exist with this userName"));
   
    }
  } catch (err) {
    console.log("error getting data mongodb: ",err);
    return res.status(500).send(apiResponse(500,false,{err},"server error, please try later.."));
  } 
}


const loginUser = async (req, res) => {
  const userName = req.body?.userName;
  const password = req.body?.password;

  if (!userName || !password) {
    // condition check
    res.status(403);
    res.send(`required parameters missing, 
              example request body:
              {
                  userName: "some one name",
                  password: "some password"
              } `);
    return;
  }

  try {
    let result = await userModel.findOne({ userName: userName });
    // console.log("result: ", result);

    if (!result) {
      return res.status(401).send(apiResponse(401,false,{},"userName or password incorrect!"));
    
    } else {

      if (await comparePassword(password, result.password)) {
        //Match found
        const token = jwtToken.createJwtToken({userName, password});
        return res.status(200).send(apiResponse(200,true,{result,token},"Login user successfully"));
  
      } else {
        //Match not found
        return res.status(401).send(apiResponse(401,false,{},"userName or password incorrect!"));
      }
    }
  } catch (e) {
    console.log("error getting data mongodb: ", e);
    return res.status(500).send(apiResponse(500,false,{},"server erro, please try later...!"));
  }
};




module.exports = {
  signupUser,
  loginUser,
  // signupUser
};
