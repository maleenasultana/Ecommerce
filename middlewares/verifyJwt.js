const jwt =require("jsonwebtoken");
const config=require("../config/auth.config");
const db= require("../models");
const User = db.user;

verifyToken