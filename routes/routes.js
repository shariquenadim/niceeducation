const express = require("express");
const router =  express.Router();
const multer = require('multer');
const path = require('path');
var mysql = require('mysql');
const {
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

var db = {
host: "localhost",
user: "root",
password: "root",
database: 'test'
};

// var db = mysql.createPool({
//    host: "localhost",
//    user: "root",
//    password: "root",
//    database: 'test'
//  });
 
// const connectToDb = async function(){
//    return new Promise((resolve,reject) => {
//       db.getConnection((err) => {
//          if(err) return reject(err);

//          resolve()
//       })
//    })
// }

// const getAllCourse = async function() {
//    return new Promise((resolve, reject) => {
//       db.query('SELECT * FROM course', function(err, result, fields) {
//          if(err) {
//             return reject(err)
//          }
//          resolve(result);
//       })
//    })
// }

// const getAllCourse = async function(conn) {
//    return new Promise((resolve, reject) => {
//       conn.query('SELECT * FROM course', function(err, result, fields) {
//          if(err) {
//             return reject(err)
//          }
//          resolve(result);
//       })
//       conn.end();
//    })
// }

const connectToDb = async function(){
   return new Promise((resolve,reject) => {
      const conn = mysql.createConnection(db)
      conn.connect(err => {
         if(err) reject(err)

         resolve(conn);
      })
   })
}

const getAllCourse = async function(conn) {
   return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM course', function(err, result, fields) {
         if(err) {
            return reject(err)
         }
         resolve(result);
      })
      conn.end();
   })
}


const getCourseByName = async function(conn,name) {
   return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM course WHERE name = '${name}'`, function(err, result, fields) {
         if(err) {
            return reject(err)
         }
         resolve(result);
      })
      conn.end();
   })
}

//================================
// nodemailer
//===============================
const nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport(smtpTransport({
    host : "mail.paradigmclasses.online",
    secureConnection: false,
    tls: {
       rejectUnauthorized: false
     },
     port : 465,
    auth : {
        user : "no-reply@paradigmclasses.online",
        pass : "Paradigm@web"
    }
}));

router.get("/" , (req,res) => {
  res.render("home");
});

router.get("/about" , (req,res) => {
   res.render("about");
 });

router.get("/courses" , (req,res) => {
   res.render("courses");
});

router.get("/courses/:name" , (req,res) => {
   connectToDb()
   .then(response => {
      return getCourseByName(response,req.params.name)
   })
   .then(response => {
      console.log(response[0]);
      res.render("singleCourse" , {course : response[0]});
   })
   .catch(err => {
      console.log(err);
      res.redirect('/error')
   })
   
})


///api to get all courses
router.get("/api/courses" , (req,res) => {
   connectToDb()
   .then(response => {
      return getAllCourse(response)
   })
   .then(response => {
      res.status(200).json(response);
   })
   .catch(err => {
      console.log(err);
      res.redirect('/error')
   })
})

//error
router.get("/error" , (req,res) => {
  res.render("error");
});

//================================
// 404
//===============================
router.get("*" , (req,res) => {
  res.render("404");
});

module.exports = router;
