const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
	kode: { type: String, required: true, unique: true },
	nama: { type: String, required: true },
	jenis: { type: String, required: true },
	merk: { type: String, required: true },
	stok: { type: Number, required: true },
	keterangan: { type: String, required: true },
});

itemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', itemSchema);
