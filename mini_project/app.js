const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/images/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

app.get("/", (req, res) => {
    console.log("hey");
    res.render("index.ejs");
});
app.get("/tests",(req,res)=>{
    res.render("test")
})
app.post("/upload",upload.single("image"), async (req, res) => {
     console.log("req.files",req.files);
})


app.get("/login", (req, res) => {
    console.log("hey");
    res.render("login.ejs");
});

app.post("/post", isloggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;
    let post = await postModel.create({
        user: user._id,
        content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});


app.get("/profile",isloggedIn,async (req, res) => {
    let user= await userModel.findOne({email:req.user.email}).populate("posts");
    console.log(user);
    // This line uses the populate() method to retrieve the posts associated with the user.
    // The populate() method takes a field name as an argument, which in this case is "posts".
    // The "posts" field is an array of ObjectId values that point to the posts collection.
    // The populate() method replaces the array of ObjectId values with the actual post documents.
    // This allows us to access the post documents in the user object using the "posts" property.
    
    res.render("profile.ejs",{user});
})
app.post('/edit/:id',async(req,res)=>{
    let post =await postModel.findOne({_id:req.params.id})
    res.redirect("edit.ejs",{post})
})
app.post('/update/:id',async(req,res)=>{
    let post =await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect("/profile");
})

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/login")
})

app.post("/register", async (req, res) => {
    try {
        const { email, password, username, name, age } = req.body;
        let user = await userModel.findOne({ email });
        if (user) return res.status(500).send("already registered");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            username,
            email,
            age,
            name,
            password: hash
        });

        let token = jwt.sign({ email: email, userid: createdUser._id }, "secret key");
        res.cookie("token", token);
        res.send("registered");
    } catch (err) {
        res.status(500).send("Error registering user");
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.status(500).send("went erong");

        bcrypt.compare(password,user.password,async(err,result)=>{
            if(result) {
                let token = jwt.sign({ email: email, userid: user._id }, "secret key");
                res.cookie("token", token);
                res.redirect("/profile");
            }else{
                res.status(500).send("wrong password")

            }
        })

    } catch (err) {
        res.status(500).send("Error registering user");
    }
});

//  now we need middleware for protecting our routes

/**
 * isloggedIn middleware function
 *
 * This middleware checks if the user is logged in by verifying the existence of a token
 * in the request cookies. If the token is not present, it sends a 401 Unauthorized response.
 * If the token is present, it verifies the token using the secret key and stores the
 * user data in the request object (req.user) before calling the next middleware.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function isloggedIn(req,res,next){
    if(req.cookies.token==="") res.status(401).send("You must be logged in");
    else{
        try {
            let data=jwt.verify(req.cookies.token,"secret key"); // If the verification succeeds, the decoded payload (data) is retrieved. This typically contains user information (e.g., email, userid).
            req.user=data; // The decoded token data (user information) is added to the req object as req.user. This makes the user's information available in subsequent middleware or route handlers.
            next();
        } catch (error) {
            res.status(401).send("Invalid token");
        }
    }
}

app.listen(3000);




// let token=jwt.sign({email:email,userid:user._id},"secret key");
// res.cookie("token",token);
// res.send("registered")

// JWT Signing (jwt.sign()):

// jwt.sign({ email: email, userid: user._id }, "secret key"): This function generates a JSON Web Token (JWT) with the payload containing the user's email and user ID (user._id). The "secret key" is used as a cryptographic key to sign the token, ensuring its authenticity and integrity.
// Setting the Token in a Cookie (res.cookie("token", token)):

// After generating the JWT, the code sets it as a cookie named "token" in the HTTP response (res). Cookies are commonly used to store session tokens securely in the user's browser.
// Sending a Response (res.send("registered")):

// Finally, the code sends a simple response of "registered" to indicate that the user has successfully registered.
// Purpose:

// Authentication: JWTs are used for authentication after a user successfully logs in or registers. The token contains encoded information (like user ID and email) that can be verified on subsequent requests to authenticate the user without needing to store session state on the server.

// Session Management: By storing the JWT in a cookie, the server can identify and authenticate the user across multiple requests during their session. This simplifies session management compared to server-side session storage, especially in stateless applications or microservices architectures.

// Security: Using a "secret key" to sign the JWT ensures that only the server can generate and validate tokens. This prevents tampering and unauthorized access to sensitive user data.