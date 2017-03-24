/* In the post_routes.js file */
// Require the Express's Router so that we can create endpoints
const router = require('express').Router();

//ROUTES
router.get('/endpoint1',function(request,response){
	response.send('User GET Endpoint Reached');
});

router.post('/endpoint1',function(req,res){
    todos = req.body
	res.json({msg:'User POST Endpoint reached'})
});

// Export the router so that the app can access it from the server.js file
module.exports = router;
