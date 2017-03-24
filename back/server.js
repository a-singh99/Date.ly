const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');
app.use(bodyParser.json());
const request = require('request');
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//middleware
const authorize = require('./middleware/authorize');

// require and configure knex first
const knex = require('knex')({
    client: 'postgres',
    connection: {
        host: 'stampy.db.elephantsql.com',
        user: 'zbruutyv',
        password: 'h3iXrLLE_gb7xHwl7JhSa_9qvmct2AKI',
        database: 'zbruutyv',
        charset: 'utf8'
    }
});
// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex);

// use the port value from the node environment, or 8080 if it can't be found'
const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
	console.log("Listening on Port:%s",PORT)
	console.log("Stop with Ctrl+C");
});

app.use(express.static(__dirname + '/../front/build'))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});




//DataBase


const User = bookshelf.Model.extend({
    tableName: 'users',
    restaurants: function () {
        return this.hasMany(Restaurant)
    },
    activities: function () {
        return this.hasMany(Activity)
    }
})

const Activity = bookshelf.Model.extend({
    tableName: 'activities',
    user: function () {
        return this.belongsTo(User)
    }
})

const Restaurant = bookshelf.Model.extend({
    tableName: 'restaurants',
    user: function () {
        return this.belongsTo(User)
    }
})

// ROUTES
app.get('/search/:searchItem', (req, res) => {
    let restaurantOptions = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?term=restaurants&limit=50&open_now=true&location=' + req.params.searchItem,
        headers:
        {
            'postman-token': 'f704ba83-0e87-8e3b-9b80-edab188f2a19',
            'cache-control': 'no-cache',
            authorization: 'Bearer n0j_ecYaghNMtMM9-WW_ixGCQ0WA8BKrl4yYLZMoRg7nMfc1Oq0A30_szXgEo0CcfxvLVe7_-ptnb98pFFI-T3AuQUf3raBHi1ndVZ-4ABHAroje7wWIUzn5yCbIWHYx',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form:
        {
            client_id: 'i6kNDRQOf-vUFRIu4yB3Tg',
            client_secret: 'uyE0oUudY8gu4wq4sx8tojkt4mWqpQjfYmMZVjOg6RBpRyKmnySMqEZlOhOTJcuN',
            access_token: "n0j_ecYaghNMtMM9-WW_ixGCQ0WA8BKrl4yYLZMoRg7nMfc1Oq0A30_szXgEo0CcfxvLVe7_-ptnb98pFFI-T3AuQUf3raBHi1ndVZ-4ABHAroje7wWIUzn5yCbIWHYx",
        }
    }
    let activitiesOptions = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?categories=escapegames,paintball,mini_golf,driveintheater,festivals,arts,zipline,zoos,artmuseums,theater,bowling,publicplazas,galleries,poolbilliards&limit=50&open_now=true&location=' + req.params.searchItem,
        headers:
        {
            'postman-token': 'f704ba83-0e87-8e3b-9b80-edab188f2a19',
            'cache-control': 'no-cache',
            authorization: 'Bearer n0j_ecYaghNMtMM9-WW_ixGCQ0WA8BKrl4yYLZMoRg7nMfc1Oq0A30_szXgEo0CcfxvLVe7_-ptnb98pFFI-T3AuQUf3raBHi1ndVZ-4ABHAroje7wWIUzn5yCbIWHYx',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form:
        {
            client_id: 'i6kNDRQOf-vUFRIu4yB3Tg',
            client_secret: 'uyE0oUudY8gu4wq4sx8tojkt4mWqpQjfYmMZVjOg6RBpRyKmnySMqEZlOhOTJcuN',
            access_token: "n0j_ecYaghNMtMM9-WW_ixGCQ0WA8BKrl4yYLZMoRg7nMfc1Oq0A30_szXgEo0CcfxvLVe7_-ptnb98pFFI-T3AuQUf3raBHi1ndVZ-4ABHAroje7wWIUzn5yCbIWHYx",
        }

    }
    request(restaurantOptions, function (error, response, body) {
        if (!error) {
            let newBody = JSON.parse(body);
            // console.log(newBody);
            let randomRestaurantArray = []
            for (let i = 0; i < 1; i++) {
                let randomRestaurant = newBody.businesses[Math.floor(Math.random() * newBody.businesses.length)]
                randomRestaurantArray.push(randomRestaurant)
            }
            // console.log(randomRestaurantArray);


            request(activitiesOptions, function (err, resp, bod) {
                if (!err) {
                    let newBod = JSON.parse(bod);
                    let randomActivtiesArray = []
                    for (let i = 0; i < 1; i++) {
                        let randomActivity = newBod.businesses[Math.floor(Math.random() * newBod.businesses.length)]
                        randomActivtiesArray.push(randomActivity)
                    }
                    // console.log(randomActivtiesArray)
                    res.json({ randomRestaurantArray, randomActivtiesArray });   // need json to send back multiples
                }
            })
        }
        else {
            console.log('thats some bullshit');
        }
    })

});




//POST endpoint for password encryption and creating user profiles
// app.post('/encrypt', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     //generate salt and create a hash the password
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//             // Store hash in your password DB. 
//             if (err) console.log(err);
//             console.log('we made it')
//             fs.writeFile('notpasswords/' + username + '.txt', hash, (err) => {
//                 if (err) throw err;
//                 res.json('Password Saved');
//                 console.log(username);
//             });
//         });
//     });
// });

app.post('/encrypt', (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            // Store hash in your password DB. 
            if (err) console.log(err);
            console.log('we made it')
            const newUser = new User({
                first_name: firstname,
                last_name: lastname,
                username: username,
                password: hash
            })
            newUser.save()
                .then(user => {
                    console.log(user)
                })
            res.send("User Created");
        });
    });
});



//POST endpoint for logging in to the server
// app.post('/login', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;

//     fs.readFile('notpasswords/' + username + '.txt', (err, data) => {
//         bcrypt.compare(password, data.toString(), function (err, result) {
//             if (result) {
//                 //sign a token in successful login and send to client side
//                 let token = jwt.sign({ username: username }, 'magickey');
//                 res.json({ token: token });
//             }
//             else {
//                 res
//                     .status(403)
//                     .send({ token: null });
//             }
//         });
//     })
// })

//POST endpoint for logging in to the server
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User
        .where({ 'username': username })
        .fetch()
        .then(user => {
            console.log(user);
            bcrypt.compare(password, user.attributes.password, function (err, result) {
                if (result) {
                    //sign a token in successful login and send to client side
                    let token = jwt.sign({ username: username }, 'magickey');
                    res.json({ token: token });
                }
                else {
                    res
                        .status(403)
                        .send({ token: null });
                }
            })
        })
});


//GET endpoint for '/privatedata' goes here:
app.get('/privatedata', cors(), authorize, (req, res, next) => {
    res.send(req.decoded.username);
    console.log(req.decoded);
});

//POST endpoint for Privatepage info
app.post('/private/', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.selectedRes.categories[0].title);
    User
        .where({ username: req.body.username })
        .fetch()
        .then(user => {
            let userid = user.attributes.id

            let ResName = req.body.selectedRes.name
            let ResImage_Url = req.body.selectedRes.image_url
            let ResCategory = req.body.selectedRes.categories[0].title
            let ResRating = req.body.selectedRes.rating
            let ResReview = req.body.selectedRes.review_count
            let ResAddress = req.body.selectedRes.location.address1
            let ResCity = req.body.selectedRes.location.city
            let ResProvince = req.body.selectedRes.location.state
            let ResPostal_Code = req.body.selectedRes.location.zip_code
            let ResPrice = req.body.selectedRes.price
            const newRes = new Restaurant({
                Name: ResName,
                Image_Url: ResImage_Url,
                Category: ResCategory,
                Rating: ResRating,
                Review_Count: ResReview,
                Address: ResAddress,
                City: ResCity,
                Province: ResProvince,
                Postal_Code: ResPostal_Code,
                Price: ResPrice,
                user_id: userid
            })
            newRes.save()
                .then(res => {
                    console.log(res)
                })

            let ActName = req.body.selectedAct.name
            let ActImage_Url = req.body.selectedAct.image_url
            let ActCategory = req.body.selectedAct.categories[0].title
            let ActRating = req.body.selectedAct.rating
            let ActReview = req.body.selectedAct.review_count
            let ActAddress = req.body.selectedAct.location.address1
            let ActCity = req.body.selectedAct.location.city
            let ActProvince = req.body.selectedAct.location.state
            let ActPostal_Code = req.body.selectedAct.location.zip_code
            let ActPrice = req.body.selectedAct.price
            const newAct = new Activity({
                Name: ActName,
                Image_Url: ActImage_Url,
                Category: ActCategory,
                Rating: ActRating,
                Review_Count: ActReview,
                Address: ActAddress,
                City: ActCity,
                Province: ActProvince,
                Postal_Code: ActPostal_Code,
                Price: ActPrice,
                user_id: userid
            })
            newAct.save()
                .then(act => {
                    console.log(act)
                })
            res.send("Restaurann andActvitity Created");
        })
});


app.get('/private/:username', (req, res) => {
    User
        .where({ username: req.params.username })
        .fetch()
        .then(user => {
            // console.log('HEREEEE',user.attributes)
            let currentuser = user.attributes.id;
            console.log("hereeeeeee",user.attributes)
            let restaurantdata;
            let actdata;
            Restaurant
                .where({ user_id: currentuser })
                .fetchAll()
                .then(rests => {
                    restaurantdata = (rests.models.map(rest => rest.attributes))
              
                })
            Activity
                .where({ user_id: currentuser })
                .fetchAll()
                .then(acts => {
                    actdata = (acts.models.map(act => act.attributes))
                    res.send({restaurantdata,actdata})
                })
                
        })
})


app.get('*', (req, res) => {
    res.sendFile('index.html',{root: __dirname + '/../front/build'});
    //res.sendFile('./front/build/index.html');
});




/*

App ID
i6kNDRQOf-vUFRIu4yB3Tg
App Secret
uyE0oUudY8gu4wq4sx8tojkt4mWqpQjfYmMZVjOg6RBpRyKmnySMqEZlOhOTJcuN


{
  "access_token": "n0j_ecYaghNMtMM9-WW_ixGCQ0WA8BKrl4yYLZMoRg7nMfc1Oq0A30_szXgEo0CcfxvLVe7_-ptnb98pFFI-T3AuQUf3raBHi1ndVZ-4ABHAroje7wWIUzn5yCbIWHYx",
  "token_type": "Bearer",
  "expires_in": 15551999
}

*/



