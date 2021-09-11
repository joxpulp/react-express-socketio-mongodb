import { connect } from 'mongoose';

export const mongoose = async (): Promise<void> => {
	try {
		await connect(
			'mongodb://josu:josu@cluster0-shard-00-00.jbg6c.mongodb.net:27017,cluster0-shard-00-01.jbg6c.mongodb.net:27017,cluster0-shard-00-02.jbg6c.mongodb.net:27017/ecommerce?replicaSet=atlas-ifxfb3-shard-0&ssl=true&authSource=admin'
		);
		console.log('Conectado a base de datos');
	} catch (error) {
		console.log(error);
	}
};
