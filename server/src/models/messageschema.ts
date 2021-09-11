import { Schema, model } from 'mongoose';
import { Messages } from './interfaces';

const messagesCollection = 'mensajes';

const messagesSchema = new Schema<Messages>(
	{
		email: { type: String, required: true, max: 100 },
		message: { type: String, required: true, max: 100 },
		date: { type: String, required: true, max: 100 },
		time: { type: String, required: true, max: 100 },
	},
	{ versionKey: false }
);

export const messages = model<Messages>(messagesCollection, messagesSchema);
