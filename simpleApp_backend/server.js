const express = require('express');
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/homeApp';
const tenantDetailsModel = require('./model/tenant_details');
const tenantCredentialsModel = require('./model/tenant_credentials');
const cityStateListSchema = require('./model/city_state_list');
const router = require('express').Router();
const app = express();
const cors = require('cors');
const moment = require('moment');
moment().format(); 

app.use(cors());

//middleware
app.use(express.json());

//connect to db
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if(err) {
        console.log('DB connection failed')
    }
    else {
        console.log('connected to db!')
    }
});

//get user details
app.get('/getTenants', (req, res) => {
    tenantDetailsModel.find({}, (err, result) => {
        if(err){
            res.json({status: false, msg: 'Could not get users!'});
        }
        else{
            console.log(result);
            res.json({status: true, msg: 'Successful', data: result});
        }
    });
    // res.send('Route is working!');
});

//get states
app.get('/getStates', (req, res) => {
    cityStateListSchema.find({}, (err, result) => {
        if(err){
            res.json({status: false, msg: 'Could not get data!'});
        }
        else{
            console.log(result);
            let stateList = [];
            result.forEach(element => {
                if(stateList.indexOf(element.state) === -1){
                    stateList.push(element.state)
                }
            });
            console.log(stateList)
            res.json({status: true, msg: 'Successful', data: stateList});
        }
    });
});

app.get('/getCities/:state', (req, res) => {
    cityStateListSchema.find({state: req.params.state}, (err, result) => {
        if(err){
            res.json({status: false, msg: 'Could not get data!'});
        }
        else{
            console.log(result)
            let cityList = [];
            result.forEach(element => {
                cityList.push(element.city);
            });
            res.json({status: true, msg: 'Successful', data: cityList});
        }
    });
});

//get creds
app.get('/getCreds', (req, res) => {
    tenantCredentialsModel.find({}, (err, result) => {
        if(err){
            res.json({status: false, msg: 'Could not get data!'});
        }
        else{
            console.log(result);
            res.json({status: true, msg: 'Successful', data: result});
        }
    });
});

//add tenant
app.post('/addTenant', (req, res) => {
    let full_name = req.body.f_name + ' ' + req.body.l_name;
    console.log(full_name);
    let dob = moment(req.body.dob);
    let today = moment(Date.now());
    let current_age = today.diff(dob, 'years');
    console.log(current_age);
    let tenantObj = new tenantDetailsModel({
        name: full_name,
        age: current_age,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        gender: req.body.gender,
        email: req.body.email,
        description: req.body.description,
        DoB: req.body.dob,
        phone: req.body.phone,
        image: req.body.image
    });

    let credentailsObj = new tenantCredentialsModel({
        username: req.body.email,
        password: req.body.password
    })

    //adding user only if not existing already
    tenantDetailsModel.find({ $or: [{phone: req.body.phone}, {email: req.body.email}]}, (err, res1) => {

        tenantCredentialsModel.find({username: req.body.email}, (err, res2) => {
            if(res1.length > 0 || res2.length > 0) {
                res.json({status: false, msg: 'User already exists!', data: err});
            }
            else {
                tenantObj.save( (err) => {
                    if(err){
                        res.json({status: false, msg: 'Error while saving user-details!', data: err});
                    }
                    else {
                        console.log('User details registered successfully!');
                        // res.json({status: true, msg: 'User details registered successfully!'});
                        //adding user credentials
                        credentailsObj.save( (err) => {
                            if(err){
                                res.json({status: false, msg: 'Error while saving user-credentials!', data: err});
                            }
                            else {

                                res.json({status: true, msg: 'User registered successfully!', data: req.body.email});
                            }
                        });
                    }
                });
            }
        });
    });
});


//authenticate user
app.post('/authenticateUser', (req, res) => {
    tenantCredentialsModel.find({ $and : [{username: req.body.username, password: req.body.password}]}, (err, result) => {
        if(err){
            res.json({status: false, msg: 'Could not get data!'});
        }
        else{
            // console.log(result);
            if(result.length > 0){
                res.json({status: true, msg: 'User authentication successful!', data: result});
            }
            else {
                res.json({status: false, msg: 'Invalid username or password!'});
            }
        }
    });
});

app.delete('/deleteUser/:username', (req, res) => {
    tenantDetailsModel.remove({email: req.params.username}, (err, result) => {
        if(err){
            res.json({status: false, msg: 'Could not delete user!'});
        }
        else {
            tenantCredentialsModel.remove({username: req.params.username}, (err, result) => {
                if(err) {
                    res.json({status: false, msg: 'Could not delete user!'});
                }
                else {
                    // res.json({status: false, msg: 'User deleted successfully!'});
                    tenantDetailsModel.find({}, (err, result) => {
                        if(err){
                            res.json({status: false, msg: 'Could not get data!'});
                        }
                        else{
                            console.log(result);
                            res.json({status: true, msg: 'Successful', data: result});
                        }
                    });
                }
            });
        }
    });
});

app.get('/getTenantNames/:keyword',(req, res) => {
    console.log(req.params.keyword);
    tenantDetailsModel.find({ name: {$regex: req.params.keyword, $options: "i"} }, (err, result) => {
        if(err){
            res.json({status: false, msg: 'Could not get users!'});
        }
        else{
            console.log(result);
            let userNames = [];
            result.forEach(element => {
                userNames.push(element.name);
            });
            console.log('userNames: ', userNames)
            res.json({status: true, msg: 'Successful', data: userNames});
        }
    });
});

app.listen(3010, () => {
    console.log('Server running on port 3010!');
});