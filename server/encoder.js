const bcrypt = require('bcryptjs');

// Function to encrypt a password
async function encryptPassword(password) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10); // 10 rounds of salt generation
        
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        
        return hashedPassword;
    } catch (error) {
        // Handle error
        console.error('Error encrypting password:', error.message);
        throw error;
    }
}

module.exports = encryptPassword;
