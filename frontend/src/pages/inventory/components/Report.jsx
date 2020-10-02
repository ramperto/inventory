import React, { useCallback, useEffect, useState } from 'react';

import classes from '../List.module.css';

export default function Report(props) {
	const [jenisSum, setJenisSum] = useState({});
	const [total, setTotal] = useState(0);

	const computeSum = useCallback((items) => {
		let holder = {};

		items.forEach(function (d) {
			if (holder.hasOwnProperty(d.jenis)) {
				holder[d.jenis] = +holder[d.jenis] + +d.stok;
			} else {
				holder[d.jenis] = +d.stok;
			}
		});
		setJenisSum(holder);
		return holder;
	}, []);

	const computeTotal = useCallback((results) => {
		let temp = 0;
		for (let stok in results) {
			temp += +results[stok];
		}
		setTotal(temp);
	}, []);

	useEffect(() => {
		const results = computeSum(props.listItems);
		computeTotal(results);
	}, [computeSum, computeTotal, props.listItems]);

	const handleClick = () => {
		props.toggleReport();
	};

	return (
		<div className='container' style={{ textAlign: 'center' }}>
			<button className={classes.add + ' ' + classes.button} onClick={handleClick}>
				LIST
			</button>

			<table className={classes.table}>
				<thead className={classes.thead}>
					<tr>
						<th>Jenis</th>
						<th>Stok</th>
					</tr>
				</thead>

				<tbody className={classes.tbody}>
					<tr className={classes.row}>
						<td>Perbekalan kantor</td>
						<td>{jenisSum['Perbekalan kantor']}</td>
					</tr>
					<tr className={classes.row}>
						<td>Peralatan kantor</td>
						<td>{jenisSum['Peralatan kantor']}</td>
					</tr>
					<tr className={classes.row}>
						<td>Mesin-mesin kantor</td>
						<td>{jenisSum['Mesin-mesin kantor']}</td>
					</tr>
					<tr className={classes.row}>
						<td>Perabotan kantor</td>
						<td>{jenisSum['Perabotan kantor']}</td>
					</tr>
					<tr className={classes.row}>
						<td>Hiasan kantor</td>
						<td>{jenisSum['Hiasan kantor']}</td>
					</tr>
					<tr className={classes.row}>
						<td>Alat bantu peraga</td>
						<td>{jenisSum['Alat bantu peraga']}</td>
					</tr>
				</tbody>

				<tfoot className={classes.tfoot}>
					<tr>
						<td>TOTAL</td>
						<td>{total}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
