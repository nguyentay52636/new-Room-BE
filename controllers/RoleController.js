const VaiTro = require("../models/VaiTro");
const getAllRoles = async (req, res) => {
    try {
        const roles = await VaiTro.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllRoles
}