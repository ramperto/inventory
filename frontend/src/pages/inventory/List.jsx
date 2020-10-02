import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AddItem from './components/AddItem';
import { AuthContext } from '../../shared/context/auth';
import ListItem from './components/ListItem';
import classes from './List.module.css';
import Report from './components/Report';

export default function List() {
	const context = useContext(AuthContext);
	const history = useHistory();

	const [isOpen, setIsOpen] = useState(false);
	const [openReport, setOpenReport] = useState(false);

	const openModal = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const toggleReport = useCallback(() => {
		setOpenReport((openReport) => !openReport);
	}, []);

	const [listItems, setListItems] = useState([]);

	useEffect(() => {
		let unmounted = false;
		axios
			.get('/api/items')
			.then((res) => {
				let newData;
				if (!unmounted && res.data.items.length > 0) {
					newData = res.data.items.map((element, index) => {
						return {
							nomor: res.data.items.length - index,
							...element,
						};
					});
				}
				setListItems(newData);
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			unmounted = true;
		};
	}, []);

	const addNewItem = useCallback(
		(nomor, newItem) => {
			if (context.isLoggedIn) {
				if (listItems && listItems.length > 0) {
					setListItems([{ nomor, ...newItem }, ...listItems]);
				} else {
					setListItems([{ nomor, ...newItem }]);
				}
				axios
					.post(
						'/api/items',
						{
							...newItem,
						},
						{
							headers: {
								Authorization: `Barrer ${context.token}`,
							},
						}
					)
					.then((res) => {
						console.log('Item Added');
					})
					.catch((error) => {
						console.log('Error: ', error.response.data.message);
						history.go(0); //reload
					});
			}
		},
		[context.isLoggedIn, listItems, context.token, history]
	);

	const deleteItem = useCallback(
		(kode, nomor) => {
			if (context.isLoggedIn) {
				const itemIndex = listItems.length - nomor;
				const newItemsNomor = listItems
					.map((item, index) => {
						if (index < itemIndex) {
							item.nomor--;
							return item;
						}
						return item;
					})
					.filter((item) => item.kode !== kode);
				setListItems(newItemsNomor);
				axios
					.delete(`/api/items/${kode}`, {
						headers: {
							Authorization: `Barrer ${context.token}`,
						},
					})
					.then((res) => {
						console.log('Item Deleted');
					})
					.catch((error) => {
						console.log('Error: ', error.response.data.message);
						history.go(0); //reload
					});
			}
		},
		[context.isLoggedIn, listItems, context.token, history]
	);

	const editItem = useCallback(
		(elements) => {
			if (context.isLoggedIn) {
				setListItems(listItems.map((item) => (item.kode === elements.kode ? { ...elements } : item)));
				axios
					.patch(
						`/api/items/${elements.kode}`,
						{
							...elements,
						},
						{
							headers: {
								Authorization: `Barrer ${context.token}`,
							},
						}
					)
					.then((res) => {
						console.log('Item Updated');
					})
					.catch((error) => {
						console.log('Error: ', error.response.data.message);
						history.go(0); //reload
					});
			}
		},
		[context.isLoggedIn, listItems, context.token, history]
	);

	const tableItems =
		listItems &&
		listItems.map((item, index) => (
			<ListItem
				key={index}
				nomor={item.nomor}
				kode={item.kode}
				nama={item.nama}
				jenis={item.jenis}
				merk={item.merk}
				stok={item.stok}
				keterangan={item.keterangan}
				deleteItem={deleteItem}
				editItem={editItem}
			/>
		));

	return (
		<div className={classes.wrapper + ' container'}>
			{openReport ? (
				<Report listItems={listItems} toggleReport={toggleReport} />
			) : (
				<>
					<div className={classes.flex}>
						<button className={classes.add + ' ' + classes.button} onClick={openModal}>
							{isOpen ? 'CANCEL' : 'ADD ITEM'}
						</button>

						<button className={classes.add + ' ' + classes.button} onClick={toggleReport}>
							REPORTS
						</button>
					</div>
					<table className={classes.table}>
						<thead className={classes.thead}>
							<tr>
								<th>Nomor</th>
								<th>Kode Barang</th>
								<th>Nama</th>
								<th>Jenis</th>
								<th>Merk</th>
								<th>Stok</th>
								<th>Keterangan</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody className={classes.tbody}>
							{isOpen && (
								<AddItem
									addNewItem={addNewItem}
									closeModal={closeModal}
									index={listItems && listItems.length > 0 ? listItems[0].nomor + 1 : 1}
								/>
							)}
							{tableItems}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
}
