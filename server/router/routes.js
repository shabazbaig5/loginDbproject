const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const DataBase = require('../db/db.js');



const db = new DataBase();
const connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'ethanHunt@123',
    database: 'usersdata'
});




// userExists = (user) =>{

//     let usernames = connection.query("SELECT username FROM testusers WHERE username ='"+user+"'", (err,rows,coulms) =>{
//         console.log('users with that name are found');
//         // console.log(rows);
        
//     });
//     // console.log();
//     return usernames;
// }

//function to check if the user login already exists
// userExists = (user) => {

//     return new Promise((resolve, reject) =>{
//         let userLogins,found;
//         connection.query("SELECT username FROM testusers WHERE username ='"+user+"'", (err,rows,coloums) =>{
//             console.log('users with that name are found');
//             console.log(rows);
//             userLogins = rows;
//             console.log('printing the userLogins before resolving');
//             console.log(userLogins);
//             console.log(userLogins.length);

//             if(userLogins.length > 0){
//                 found = true;
//                 resolve(found);

//             }
//             else{
//                 found = false;
//                 resolve(found);

//             }

            
//         });
//             // console.log();
//             // console.log('printing the user Logins');
//             // console.log(userLogins);
            


//     });


// }

// var userExists = new Promise()
router.use(bodyParser.urlencoded({extended:false}));

module.exports = () => {
    router.get('/', (req,res) => {
        console.log(`URL:${req.url}`);
        console.log(`method:GET`);
        res.render('home');
    });

    router.get('/login', (req,res) => {

        console.log(`URL:${req.url}`);
        console.log(`method:GET`);
        res.render('login');
    });


    router.get('/register', (req,res) => {
        console.log(`URL:${req.url}`);
        console.log(`method:GET`);
        res.render('register');
    });

    router.post('/register', (req,res) => {
        console.log(`URL:${req.url}`);
        console.log(`method:POST`);
        // let exists = db.userExists(req.body.userId);
        // exists.then((result) => {
        //     console.log('in then');
        //     console.log(result);
        //     console.log("after the exists function is executed");
        //     // console.log(exists);
        //     if(result == true){
        //         res.render('userNameError');
        //     }
        //     else{
        //         // connection.query("INSERT INTO testusers values(NULL,'"+req.body.name+"', '"+req.body.userId+"', '"+req.body.passcode+"',DEFAULT)", (err,rows,columns) => {
    
        //         //     if(err){
        //         //         console.error(err);
        //         //     }
        //         //     else{
        //         //         console.log(`user registered in database ${rows}`);
        //         //         console.log(rows);
        //         //     }
                    
        //         //     // console.log(rows);
        //         //     // connection.end();
        //         // });
        //         db.insert(req.body.name, req.body.userId,req.body.passcode);
        //         res.render('login');
        //     }
        
        // });
        register = async () => {
            let result = await db.userExists(req.body.userId);
            if(result == true){
                res.render('userNameError');
            }
            else{
                // connection.query("INSERT INTO testusers values(NULL,'"+req.body.name+"', '"+req.body.userId+"', '"+req.body.passcode+"',DEFAULT)", (err,rows,columns) => {
                //     if(err){
                //         console.error(err);
                //     }
                //     else{
                //         console.log(`user registered in database ${rows}`);
                //         console.log(rows);
                //     }
                
                //     console.log(rows);
                //     // connection.end();
                // });
                db.insert(req.body.name, req.body.userId,req.body.passcode);
                res.render('login');
            }
        }
        register();

    });


    router.post('/login', (req,res) => {

        console.log(`URL:${req.url}`);
        console.log(`method:POST`);
        // let user = {};
        // connection.query("SELECT * FROM testusers WHERE username='"+req.body.userId+"' AND is_active='"+1+"'",(err,row,columns) => {
        //     try{
        //         if(err){
        //             console.error(err);
        //         }
        //         else{
        //             // console.log(rows[0].name);
        //             if(req.body.passcode == row[0].password){
        //                 res.render('users',{
        //                     userName : row[0].name,
        //                     id : row[0].id
        //                 });
        //             }
        //             else{
        //                 res.render('wrongPasscode');
        //             }
                    
        //         }
        //     }
        //     catch(err){
        //         res.redirect('/register');
        //     }
            
        // });
        db.getUser(req.body.userId,req.body.passcode,res);
    });


    router.post('/:name/:id', (req,res) => {
        console.log(`URL:${req.url}`);
        console.log(`method:POST`);
        console.log(req.params.id);
        console.log(req.params.name);
        // connection.query("UPDATE testusers SET is_active='"+0+"' WHERE id='"+req.params.id+"'", (err,row,columns) =>{
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         console.log('deleted the user');
        //     }
        // });

        db.deleteUser(req.params.id);
        res.render('home');
    });

    return router;
}






































// connection.query("SELECT username FROM testusers WHERE username='"+req.body.userId+"'", (err,rows,columns) => {
        //     let exists;
        //     if(rows){
        //         if(req.body.userId == rows[0].username){
        //             console.log(rows);
        //             console.log("user already exists");
        //             res.send('user already exists');
        //         }
        //     }
        //     else{
        //         if(req.body.userId != rows[0].username){
        //             // console.log('entering here while i am not supposed to');
        //             // connection.query("INSERT INTO testusers values(NULL,'"+req.body.name+"', '"+req.body.userId+"', '"+req.body.passcode+"',DEFAULT)", (err,rows,columns) => {
    
        //             //     if(err)
        //             //     console.error(err);
        //             //     else{
        //             //         console.log(rows);
        //             //     }
                        
        //             //     // console.log(rows);
        //             //     // connection.end();
        //             // });
        //             console.log('entering the values');
        //         }
        //     }
            
           


        // });

        // connection.query("INSERT INTO testusers values(NULL,'"+req.body.name+"', '"+req.body.userId+"', '"+req.body.passcode+"',DEFAULT)", (err,rows,columns) => {

        //     if(err)
        //     console.error(err);
        //     else{
        //         console.log(rows);
        //     }
            
        //     // console.log(rows);
        //     // connection.end();
        // });
        

        // res.render('login');