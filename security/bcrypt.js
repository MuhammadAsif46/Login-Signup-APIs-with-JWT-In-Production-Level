const bcrypt = require('bcrypt');

const stringToHash =(password) => {
    const hash = bcrypt.hash(password, 10);
    return hash;
};

const comparePassword = async(password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch ? true : false;
};

module.exports = {stringToHash, comparePassword}