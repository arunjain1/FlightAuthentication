const express = require("express");
const { PORT } = require("./config/serverConfig");
const  bodyParser = require('body-parser');
const db = require("./models/index");
const app = express();
const {User,Role} = require("./models/index");
const apiRoutes = require('./routes/index');

const prepareAndStartServer = async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true})); 
    app.use('/api',apiRoutes); 
    if(process.env.DB_SYNC){
        db.sequelize.sync({alter : true})
    }
    // const u1 = await User.findByPk(7);
    // const r1 = await Role.findByPk(1);

    // u1.addRoles(r1);

    app.listen(PORT,()=>{
        console.log(`Server Started on PORT : ${PORT}`);
    })
}

prepareAndStartServer();

 