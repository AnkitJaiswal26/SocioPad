const mongoose = require('mongoose')

module.exports = connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://Ankit:Ankit2001@cluster0.iy8av.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}