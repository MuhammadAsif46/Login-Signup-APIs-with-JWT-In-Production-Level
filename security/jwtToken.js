const jwt = require('jsonwebtoken');

const createJwtToken=({userName,password})=>{
    const token = jwt.sign(
        {userName, password},
        'testkey',
        {
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 5),
        }
    );
    return token
}
module.exports = {createJwtToken}
