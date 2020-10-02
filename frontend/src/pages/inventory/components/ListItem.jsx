import React, { useEffect, useState } from 'react';

import classes from '../List.module.css';

export default function ListItem(props) {
	const [editMode, setEditMode] = useState(false);

	const [elements, setElements] = useState({});

	useEffect(() => {
		setElements({
			nomor: props.nomor,
			kode: props.kode,
			nama: props.nama,
			jenis: props.jenis,
			merk: props.merk,
			stok: props.stok,
			keterangan: props.keterangan,
		});
	}, [props]);

	const handleChange = (e) => {
		setElements({ ...elements, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		if (
			!elements.kode ||
			!elements.nama ||
			!elements.jenis ||
			!elements.merk ||
			!elements.stok ||
			!elements.keterangan
		) {
			return;
		}
		props.editItem(elements);
		setEditMode(false);
	};

	const editItem = () => {
		setEditMode(true);
	};

	if (editMode) {
		return (
			<tr>
				<td>
					<input type='number' name='nomor' value={elements.nomor} readOnly/>
				</td>
				<td>
					<input type='text' name='kode' onChange={handleChange} value={elements.kode} />
				</td>
				<td>
					<input type='text' name='nama' onChange={handleChange} value={elements.nama} />
				</td>
				<td>
					<select name='jenis' value={elements.jenis ? elements.jenis : 'none'} onChange={handleChange}>
						<option value='none' disabled hidden>
							-- Chose Jenis --
						</option>
						<option value='Perbekalan kantor'>Perbekalan kantor</option>
						<option value='Peralatan kantor'>Peralatan kantor</option>
						<option value='Mesin-mesin kantor'>Mesin-mesin kantor</option>
						<option value='Perabotan kantor'>Perabotan kantor</option>
						<option value='Hiasan kantor'>Hiasan kantor</option>
						<option value='Alat bantu peraga'>Alat bantu peraga</option>
					</select>
				</td>
				<td>
					<input type='text' name='merk' onChange={handleChange} value={elements.merk} />
				</td>
				<td>
					<input type='number' name='stok' onChange={handleChange} value={elements.stok} />
				</td>
				<td>
					<input type='text' name='keterangan' onChange={handleChange} value={elements.keterangan} />
				</td>
				<td>
					<input type='submit' value='SAVE' className={classes.save} onClick={handleSave} />
				</td>
			</tr>
		);
	}

	return (
		<tr className={classes.row}>
			<td>{elements.nomor}</td>
			<td>{elements.kode}</td>
			<td>{elements.nama}</td>
			<td>{elements.jenis}</td>
			<td>{elements.merk}</td>
			<td>{elements.stok}</td>
			<td>{elements.keterangan}</td>
			<td>
				<button className={classes.edit + ' ' + classes.button} onClick={editItem}>
					EDIT
				</button>
				<button className={classes.delete + ' ' + classes.button} onClick={() => props.deleteItem(props.kode,props.nomor)}>
					&#10006;
				</button>
			</td>
		</tr>
	);
}
