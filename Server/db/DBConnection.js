const mongoose = require("mongoose");

const DBConnection = () => {
    mongoose
        .connect("mongodb+srv://ssd_admin:ssdadmin123@securemessaging.fb60hqf.mongodb.net/SecureApp?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database connected");
        });
};

module.exports = DBConnection;