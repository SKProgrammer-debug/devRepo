const signUp = async (req, res, next) => {
    try {
        let { firstName, lastName, email, password, phoneNumber, isSubscribed } = req.body;

        if (isSubscribed)
            return ``;
    } catch (error) {

    }
}


module.exports = {
    signUp: signUp,
};
