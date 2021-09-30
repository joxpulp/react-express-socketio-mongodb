import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoose = async (): Promise<void> => {
	try {
		await connect(
			process.env.MONGO_URL || 'mongo_url'
		);
		console.log('Conectado a base de datos');
	} catch (error) {
		console.log(error);
	}
};
