import React, { useState } from 'react';

import classes from '../List.module.css';

export default function AddItem(props) {
	const [elements, setElements] = useState({});

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
		props.addNewItem(props.index, elements);
		props.closeModal();
	};

	return (
		<tr>
			<td>
				<input type='number' name='nomor' value={props.index} readOnly />
			</td>
			<td>
				<input type='text' name='kode' onChange={handleChange} />
			</td>
			<td>
				<input type='text' name='nama' onChange={handleChange} />
			</td>
			<td>
				<select name='jenis' defaultValue='none' onChange={handleChange}>
					<option value='none' disabled hidden>
						-- Chose Jenis --
					</option>
					<option>Perbekalan kantor</option>
					<option>Peralatan kantor</option>
					<option>Mesin-mesin kantor</option>
					<option>Perabotan kantor</option>
					<option>Hiasan kantor</option>
					<option>Alat bantu peraga</option>
				</select>
			</td>
			<td>
				<input type='text' name='merk' onChange={handleChange} />
			</td>
			<td>
				<input type='number' name='stok' onChange={handleChange} />
			</td>
			<td>
				<input type='text' name='keterangan' onChange={handleChange} />
			</td>
			<td>
				<input type='submit' value='SAVE' className={classes.save} onClick={handleSave} />
			</td>
		</tr>
	);
}
