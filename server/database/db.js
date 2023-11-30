import mongoose   from "mongoose";

const DBConnection = async () => {
    const URI =`mongodb://amanjgd2626:amankumarnitkkr@ac-cg3vgvf-shard-00-00.eccbper.mongodb.net:27017,ac-cg3vgvf-shard-00-01.eccbper.mongodb.net:27017,ac-cg3vgvf-shard-00-02.eccbper.mongodb.net:27017/?ssl=true&replicaSet=atlas-245jn5-shard-0&authSource=admin&retryWrites=true&w=majority`; 
    try{
        await mongoose.connect(URI, { useNewUrlParser : true});
        console.log('Database connected successfully');
    } catch(error){
        console.error('Error while connecting with the database', error.message);
    }
} 

export default DBConnection;


// amankumarnitkkr
// 104.28.247.116/32