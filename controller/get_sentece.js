class Data {
    static getData (req, res, next) {
        const {id}=req.params;
        const {search,page}= req.query;
        const {username, password} = req.body;
        return res.status(200).json(
            id,search,page,username,password
        )
    }
}

module.exports = {
    data : Data
}