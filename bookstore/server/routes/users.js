const { application } = require("express");
const express = require("express");
const pool = require("../db/db");
const UserDeatils = require("../db/Userdetails")
const route = express.Router();

route.get("/setting", async (req, res) => {
  try {
    let id = req.session.userID;
    await pool.query(
      `SELECT * FROM user_auth WHERE id=$1`,
      [id],
      async(err, results) => {
        if (err) throw err;
        const Value = await UserDeatils.find({user_id:id})
        if (results.rows.length > 0) {
          let username = results.rows[0].username;
          let email = results.rows[0].email;
          res.render("users_settings", { username: username, email: email ,country:Value[0].country,state:Value[0].state,phone_number:Value[0].phone_number,address:Value[0].address});
        } else {  
          req.session.destroy();
          res.redirect("/auth/login");
        }
      }
    );
  } catch (error) {
    res.send(error.message);
  }
});

route.post("/update/profile", async (req, res) => {
  try {
    let id = req.session.userID;
    const { username, email, surname,address,phonenumber,state,country} = req.body;

    await pool.query(
      `UPDATE user_auth SET username = $1, email = $2 WHERE id=$3 RETURNING username,email`,
      [username, email, id],
      (err, results) => {
        if (err) throw err;
        res.redirect("/users/setting")
      }
    );
  } catch (error) {
    res.send(error.message);
  }
});

route.post("/update/details", async (req, res) => {

    const { country =" ", state =" ", phone_number =" ", address= "" } = req.body;
    const user_id = req.session.userID;
    const Getdata =await UserDeatils.find({user_id:user_id})
    if(Getdata.length){
      const qurey1= {country:country,state:state,phone_number:phone_number,address:address}
        try {
    const Value = await UserDeatils.findOneAndUpdate({user_id:user_id},qurey1)  
    res.redirect("/users/setting")
  } catch (error) {
    throw error
  }
       }else{
        const qurey = {user_id:user_id,country:country,state:state,phone_number:phone_number,address:address}
          try {
    const Value = await UserDeatils.insertMany(qurey)  
    if(Value.length){
      res.redirect("/users/setting")
    }  
  } catch (error) {
    throw error
  }
       }

})


route.get("/delete",(req,res)=>{
  const id = req.userID
  pool.query(`DELETE FROM user_auth WHERE id=$1`,[id],(err,result)=>{
    if(err) throw err
    res.destroy()
  })
})

module.exports = route;
