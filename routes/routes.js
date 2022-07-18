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
password: "123",
database: 'test'
};

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


const getAllBlogs = async function(conn) {
   return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM blog', function(err, result, fields) {
         if(err) {
            return reject(err)
         }
         resolve(result);
      })
      conn.end();
   })
}

const getBlogById = async function(conn,id) {
   return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM blog WHERE id = '${id}'`, function(err, result, fields) {
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

//================================
// COURSES
//===============================
router.get("/courses" , (req,res) => {
   connectToDb()
   .then(response => {
      return getAllCourse(response)
   })
   .then(response => {
      res.render("courses" , {course : response});
   })
   .catch(err => {
      console.log(err);
      res.redirect('/error')
   })
});

router.get("/courses/:id" , (req,res) => {
   connectToDb()
   .then(response => {
      return getCourseById(response,req.params.id)
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

//================================
// BLOG
//===============================
router.get("/blog" , (req,res) => {
   connectToDb()
   .then(response => {
      return getAllBlogs(response)
   })
   .then(response => {
      res.render("blogs" , {blog : response});
   })
   .catch(err => {
      console.log(err);
      res.redirect('/error')
   })
});
 
router.get("/blog/:id" , (req,res) => {
   connectToDb()
   .then(response => {
      return getBlogById(response,req.params.id)
   })
   .then(response => {
      console.log(response[0]);
      res.render("singleBlog" , {blog : response[0]});
   })
   .catch(err => {
      console.log(err);
      res.redirect('/error')
   })
});

//error
router.get("/error" , (req,res) => {
  res.render("error");
});

//faq
router.get("/faq" , (req,res) => {
   res.render("faq");
});


//================================
// API
//===============================
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

router.get("/api/notice" , (req,res) => {
   connectToDb()
   .then(response => {
      return getAllBlogs(response)
   })
   .then(response => {
      res.status(200).json(response);
   })
   .catch(err => {
      console.log(err);
      res.redirect('/error')
   })
})
//================================
// 404
//===============================
router.get("*" , (req,res) => {
  res.render("404");
});

module.exports = router;
