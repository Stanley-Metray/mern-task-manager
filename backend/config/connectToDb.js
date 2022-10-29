import mongoose from 'mongoose';

const connect = () => {
    mongoose
        .connect("mongodb+srv://stanley-metray:0OIzQx8Eu3sj1kOb@task-manager.rxta0cd.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
            console.log("Mongoose connected...");
        })
        .catch((err) => {
            console.log(err);
        });
}

export default connect;