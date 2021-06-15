const mongoose = require('mongoose')

const DB_URI = process.env.DATABASE_URI

const connectToDatabase = async () => {
	try {

		await mongoose.connect(DB_URI, {
	            'useNewUrlParser': true,
	            'useUnifiedTopology': true,
	            'useFindAndModify': false,
	            'useCreateIndex': true
	        })

		console.log('Conectado a MongoDB')
	}


	catch (error) {
		console.log(error)
	}

}

connectToDatabase()

process.on('uncaughtException', (error) => {
    console.log(error)
    mongoose.disconnect()
})

