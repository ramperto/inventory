const express = require('express');
const { check } = require('express-validator');

const itemsControllers = require('../controllers/items-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

/*
 * @route     GET api/items
 * @desc      get all inventory items
 * @access    private
 */
router.get('/', itemsControllers.getAllItems);

/*
 * @route     POST api/items
 * @desc      create new item
 * @access    private
 */
router.post(
	'/',
	checkAuth,
	[
		check('kode').not().isEmpty(),
		check('nama').not().isEmpty(),
		check('jenis').not().isEmpty(),
		check('merk').not().isEmpty(),
		check('stok').not().isEmpty(),
		check('keterangan').not().isEmpty(),
	],
	itemsControllers.addItem
);

/*
 * @route     PATCH api/items/iid
 * @desc      updatae item by kode
 * @access    private
 */
router.patch(
	'/:iid',
	checkAuth,
	[
		check('kode').not().isEmpty(),
		check('nama').not().isEmpty(),
		check('jenis').not().isEmpty(),
		check('merk').not().isEmpty(),
		check('stok').not().isEmpty(),
		check('keterangan').not().isEmpty(),
	],
	itemsControllers.editItem
);

/*
 * @route     DELETE api/items/iid
 * @desc      delete item by kode
 * @access    private
 */
router.delete('/:iid', checkAuth, itemsControllers.deleteItem);

module.exports = router;
