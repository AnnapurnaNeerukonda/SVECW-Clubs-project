const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();
const port = 8080;
const cors=require("cors")
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '22b01a12b3@A',
    database: 'clubproject'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'annapurnaneerukonda789@gmail.com',
        pass: 'olfcyhypviyphhhn'
    },
    tls: {
        rejectUnauthorized: false
    }
});
app.post('/register-user', (req, res) => {
    const { username, password, email, role, dept } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        // Check if the username or email already exists
        connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            if (results.length > 0) {
                // If username or email already exists, return an error
                return res.status(400).json({ message: 'Username or email already exists. Please choose a unique username and email.' });
            }

            // Insert user data into the appropriate table based on role
            const table = (role === 'faculty') ? 'faculty_coordinators' : 'users';
            const insertQuery = `INSERT INTO ${table} (username, password, email, role, dept) VALUES (?, ?, ?, ?, ?)`;
            connection.query(insertQuery, [username, hashedPassword, email, role, dept], (err, result) => {
                if (err) {
                    console.error('Error inserting user data into database:', err);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                console.log('User registered successfully.');
                return res.status(201).json({ message: 'User registered successfully.', register: 'success' });
            });
        });
    });
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/posts', upload.single('pimage'), (req, res) => {
    const { pdate, ptitle, pdescription } = req.body;
    const pimage = req.file.filename;

    const query = 'INSERT INTO posts (pdate, pimage, ptitle, pdescription) VALUES (?, ?, ?, ?)';
    const values = [pdate, pimage, ptitle, pdescription];
    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error inserting post:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Post created successfully', postId: results.insertId });
        }
    });
});
app.get('/posts', (req, res) => {
    connection.query('SELECT pid,pimage, ptitle, pdescription, likes FROM posts ORDER BY pid DESC', (error, results, fields) => {
        if (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            
            const posts = results.map(row => ({
                imageUrl: `/uploads/${row.pimage}`,
                title: row.ptitle,
                pid:row.pid,
                description: row.pdescription,
                likes: row.likes,
            }));
            console.log(posts)
            res.json({ posts });
        }
    });
});

app.post('/posts/:postId/like', (req, res) => {
    const postId = req.params.postId;
    console.log(postId);
    connection.query('UPDATE posts SET likes = likes + 1 WHERE pid = ?', [postId], (error, results, fields) => {
        if (error) {
            console.error('Error updating likes count:', error);
            res.status(500).json({ message: 'Failed to update likes count' });
        } else {
            res.status(200).json({ message: 'Likes count updated successfully' });
        }
    });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    // Check if email is from svecw.edu.in domain
    if (email.endsWith('@svecw.edu.in')) {
        // Login the user using the users table
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            // If user with the provided email and password does not exist
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found or incorrect password.' });
            }

            // User found, generate JWT token
            const user = results[0];
            const token = jwt.sign({ email: user.email, role: user.role }, 'secret_key');
            res.status(200).json({ message: 'Login successful.', redirect: '/create-post ',log:2 });
            
        });
    } else if (email.endsWith('@gmail.com')) {
        // Login the user using the clubs table
        connection.query('SELECT * FROM clubs WHERE cemail = ? AND cpassword = ?', [email, password], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            // If club with the provided email and password does not exist
            if (results.length === 0) {
                return res.status(404).json({ message: 'Club not found or incorrect password.' });
            }

            // Club found, generate JWT token
            const club = results[0];
            const token = jwt.sign({ email: club.cemail, role: 'club' }, 'secret_key');
            res.status(200).json({ message: 'Login successful.', redirect: '/clubs',log:1 });
        });
    } else {
        // Invalid email format
        return res.status(400).json({ message: 'Invalid email format.' });
    }
});


app.post('/send-otp', (req, res) => {

    const { email } = req.body;
    
    let otp = Math.floor(100000 + Math.random() * 900000);

    console.log(email,otp)
    connection.query('SELECT * FROM otps WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // If OTP already exists, update it
        if (results.length > 0) {
            const sqlUpdate = 'UPDATE otps SET otp = ? WHERE email = ?';
            connection.query(sqlUpdate, [otp, email], (err, result) => {
                if (err) {
                    console.error('Error updating OTP in database:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                sendEmail(email, otp, res); // Send email after updating OTP
            });
        } else {
            // If OTP doesn't exist, insert new OTP
            const sqlInsert = 'INSERT INTO otps (email, otp) VALUES (?, ?)';
            connection.query(sqlInsert, [email, otp], (err, result) => {
                if (err) {
                    console.error('Error inserting OTP into database:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                sendEmail(email, otp, res); // Send email after inserting OTP
            });
        }
    });
    res.status(201).send({
       
        message: "OTP send successfully"
      });
});

function sendEmail(email, otp, res) {
    const mailOptions = {
        from: 'annapurnaneerukonda789@gmail.com',
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('OTP sent successfully');
        }
    });
}
app.post('/verify-otp', (req, res) => {
    const { email, enteredOTP } = req.body;

    connection.query('SELECT otp FROM otps WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No OTP found for the provided email.' });
        }

        const storedOTP = results[0].otp.toString(); // Convert stored OTP to string
        console.log("both otps are here",enteredOTP,storedOTP)
        if (enteredOTP.toString() === storedOTP) { // Convert entered OTP to string for comparison
            res.status(200).json({ message: 'OTP verification successful.',match:"success" });
        } else {
            res.status(400).json({ message: 'Incorrect OTP.' });
        }
    });
});
app.post('/register-user', (req, res) => {
    const { username, password, email, role, dept } = req.body;
    console.log(req.body)
    // Check if the username or email already exists
    connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Internal server error.' });
            return;
        }

        if (results.length > 0) {
            // If username or email already exists, return an error
            res.status(400).json({ message: 'Username or email already exists. Please choose a unique username and email.' });
            return;
        }

        // Insert user data into the users table
        const sql = 'INSERT INTO users (username, password, email, role, dept) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [username, password, email, role, dept], (err, result) => {
            if (err) {
                console.error('Error inserting user data into database:', err);
                res.status(500).json({ message: 'Internal server error.' });
                return;
            }

            console.log('User registered successfully.');
            res.status(201).json({ message: 'User registeredsuccessfully.',register:"success" });
        });
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
