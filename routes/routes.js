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
user: "paradigm_admin",
password: "paradigm_admin",
database: 'paradigm_test'
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


const getCourseById = async function(conn,id) {
   return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM course WHERE id = '${id}'`, function(err, result, fields) {
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

router.get("/courses" , (req,res) => {
   res.render("courses");
});

router.get("/courses/:id" , (req,res) => {
   let course = {
      id: 101,
      name: "Engineering",
      description: "Bachelors of business administration are a popular undergraduate course programme. The major field of academic focus on this course is management. On the undergraduate level, students are taught the basic and brief concepts of business, administration, entrepreneurship, and management.",
      salary: "The starting salary package or the above job profiles is 2 to 3 lakh per annum",
      age: ["Minimum age limit: 17 years", "Maximum age limit: 25 years"],
      duration: "3 to 4 years",
      about: [
         "Students who pursue B.B.A course can go for higher post-graduations degrees like M.B.A",
         "The prime motto of B.B.A degree is to enhance leadership qualities, decision making ability, verbal & written communication skills, etc. It studies numerous aspects of business management."
      ],
      eligibility: [
         "Candidates who passed on the (10+2) examination in any stream or any equivalent degree from an accepted university.",
         "An applicant should secure at least 50% marks on the qualifying 12th standard exam."
      ],
      scope: [
         "Business consultant",
         "Marketing manager",
         "Business administration researcher",
         "Finance Manager",
         "Research & development manager",
         "Human resource manager"
      ],
   };

   res.render("singleCourse" , {course : course});
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
