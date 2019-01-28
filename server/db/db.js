const mysql = require('mysql');


const connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'ethanHunt@123',
    database: 'usersdata'
});

class DataBase{


    userExists(user){
        console.log('called userExists');
        return new Promise((resolve, reject) =>{
            let userLogins,found;
            connection.query("SELECT username FROM testusers WHERE username ='"+user+"'", (err,rows,coloums) =>{
                console.log('users with that name are found');
                console.log(rows);
                userLogins = rows;
                console.log('printing the userLogins before resolving');
                console.log(userLogins);
                console.log(userLogins.length);
    
                if(userLogins.length > 0){
                    found = true;
                    resolve(found);
                }
                else{
                    found = false;
                    resolve(found);
    
                }
            });
    
        });
    
    }

    insert(name,userId,passcode){
        connection.query("INSERT INTO testusers values(NULL,'"+name+"', '"+userId+"', '"+passcode+"',DEFAULT)", (err,rows,columns) => {
    
            if(err){
                console.error(err);
            }
            else{
                console.log(`user registered in database ${rows}`);
                console.log(rows);
            }
            
            // console.log(rows);
            // connection.end();
        });
    }


    getUser(userId,passcode,res){
        connection.query("SELECT * FROM testusers WHERE username='"+userId+"' AND is_active='"+1+"'",(err,row,columns) => {
            try{
                if(err){
                    console.error(err);
                }
                else{
                    console.log(row[0]);
                    if(passcode == row[0].password){
                        res.render('users',{
                            userName : row[0].name,
                            id : row[0].id
                        });
                    }
                    else{
                        res.render('wrongPasscode');
                    }
                    
                }
            }
            catch(err){
                res.redirect('/register');
            }
            
        });
    }


    deleteUser(id){

        connection.query("UPDATE testusers SET is_active='"+0+"' WHERE id='"+id+"'", (err,row,columns) =>{
            if(err){
                console.log(err);
            }
            else{
                console.log('deleted the user');
            }
        });
    }



}



module.exports = DataBase;