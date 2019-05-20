 
module.exports = {
	port : process.env.PORT || 9000,
	dbUrl: 'mongodb+srv://user:QmTs5zvR8Phw4CUL@bsdb-vsnj9.mongodb.net/book?retryWrites=true' || '',
	
	db : {
		"host"			: "mongodb+srv://{id}:{pwd}@bsdb-vsnj9.mongodb.net/book?retryWrites=true",
		"user"			: "user",
		"password"		: "QmTs5zvR8Phw4CUL",
		"database"		: "book"
	}
	// port:process.env.PORT ||(process.env.NODE_ENV === 'production'?8080:3000)
	// host:process.env.HOST || '127.0.0.1',
    
	// apiHost:process.env.APIHOST || '127.0.0.1',
    // apiPort:process.env.APIPORT || '3030',
    // dbHost:"localhost",
    // dbPort:"27017",
	
	/*
    app:{
        title:"personal blog",
        description:'Nealyang\'s personal blog demo',
        head:{
            titleTemplate:'blog',
            meta:[
                {
                    name:"description",
                    content:"react express demo"
                },
                {charset:"utf-8"}
            ]
        }
    }
	*/
};