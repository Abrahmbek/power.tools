const dotenv = require("dotenv");
dotenv.config();

const http = require( "http");    
const mongoose = require("mongoose");     

  //const mongoose = require("mongoose").default;       // mongo db ni talab qilib qilib oldik
//mongoose.set("strictQuery", false);               
const connectionString = process.env.MONGO_URL;



mongoose.connect(                        
    connectionString,                   
    {
        useNewUrlParser: true,               
        useUnifiedTopology: true,
    },
    (err, goose) => {                                            
        if(err) console.log("ERROR on connection MongoDB ");         
        else {                                                   
            console.log("Mongo connection succeed");       
                                                                     
            const app = require("./app");                  
            const server = http.createServer(app);             
            let PORT = process.env.PORT || 3001;                                  
           
            server.listen(PORT, function() {                   
                console.log(
                    `the server is running successfully on port: ${PORT}, http://localhost:${PORT}`
                );
            });

        }
    }
);