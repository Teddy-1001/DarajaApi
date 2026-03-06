import mysql2 from 'mysql2'


const connectDB = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ted@485651268',
    database: 'daraja_db',
    port: 4000
})

connectDB.connect((err)=>{
    if(err){
        console.error("CONNECT ERROR",err)
    }else{
        console.log("Connect to my sql")
    }
})

export default connectDB