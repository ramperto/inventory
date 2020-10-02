const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Item = require('../models/item-model');
const User = require('../models/user-model');

/*
 * @route     GET api/items
 * @desc      get all inventory items
 * @access    private
 */
const getAllItems = async (req, res, next) => {
	let items;
	try {
		items = await Item.find();
	} catch (err) {
		const error = new HttpError('Something went wrong, could not fetch items', 500);
		return next(error);
	}
	res.json({ items: items.map((item) => item.toObject({ getters: true })) });
};

/*
 * @route     POST api/items
 * @desc      create new item
 * @access    private
 */

const addItem = async (req, res, next) => {
	// input validation
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	// extract data
	const { kode, nama, jenis, merk, stok, keterangan } = req.body;

	// check if exist
	try {
		let itemExist = await Item.findOne({ kode: kode });
		if (itemExist) {
			const error = new HttpError('Creating item failed, Item already exists', 500);
			return next(error);
		}
	} catch (err) {
		const error = new HttpError('Creating item failed, please try again.', 500);
		return next(error);
	}

	// create the item
	const createdItem = new Item({
		kode,
		nama,
		jenis,
		merk,
		stok,
		keterangan,
	});

	try {
		await createdItem.save();
	} catch (err) {
		const error = new HttpError('Creating item failed, please try again.', 500);
		return next(error);
	}

	// send it back to frontend
	res.status(201).json({ item: createdItem });
};

/*
 * @route     PATCH api/items/iid
 * @desc      updatae item by kode
 * @access    private
 */

const editItem = async (req, res, next) => {
	// input validation
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	// extract data
	const { kode, nama, jenis, merk, stok, keterangan } = req.body;
	const itemKode = req.params.iid;

	// get that item
	let item;
	try {
		item = await Item.findOne({ kode: itemKode });
	} catch (err) {
		const error = new HttpError('Something went wrong, could not update item.', 500);
		return next(error);
	}

	// update it with the new data
	item.kode = kode;
	item.nama = nama;
	item.jenis = jenis;
	item.merk = merk;
	item.stok = stok;
	item.keterangan = keterangan;

	// add it to database
	try {
		await item.save();
	} catch (err) {
		const error = new HttpError('Something went wrong, could not update item.', 500);
		return next(error);
	}

	// send it back to frontend
	res.status(200).json({ item: item.toObject({ getters: true }) });
};

/*
 * @route     DELETE api/items/iid
 * @desc      delete item by kode
 * @access    private
 */

const deleteItem = async (req, res, next) => {
	// extract data
	const itemKode = req.params.iid;

	// get that item
	let item;
	try {
		item = await Item.findOne({ kode: itemKode });
	} catch (err) {
		const error = new HttpError('Something went wrong, could not delete item.', 500);
		return next(error);
	}

	// if not exist
	if (!item) {
		const error = new HttpError('Could not find item for this kode.', 404);
		return next(error);
	}

	// update database
	try {
		await item.remove();
	} catch (err) {
		const error = new HttpError('Something went wrong, could not delete item.', 500);
		return next(error);
	}

	res.status(200).json({ message: 'Deleted item.' });
};

exports.getAllItems = getAllItems;
exports.addItem = addItem;
exports.editItem = editItem;
exports.deleteItem = deleteItem;
