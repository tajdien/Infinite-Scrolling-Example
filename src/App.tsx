import React, { useEffect, useState } from 'react';

const api_url = `https://dog.ceo/api/breeds/image/random`;

const fetchDog = async (amount: number = 10) => {
	const data: string[] = [];
	for (let i = 0; i < amount; i++) {
		const res = await fetch(api_url);
		const { message } = await res.json();
		data.push(message);
	}
	return data;
};

const App = () => {
	const [data, setData] = useState<any[]>([]);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const dog = await fetchDog();
			setData(data => [...data, ...dog]);
		}
		fetchData();
	}, [fetched]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
			document.documentElement.offsetHeight
		)
			return;
		setFetched(!fetched);
		console.log('Fetching more dogs');
	};

	const refetch = async () => {
		const dogs = await fetchDog();
		setData(data => [...data, ...dogs]);
	};

	return (
		<div>
			<h1> Infinite scrolling </h1>
			{data?.map(img => (
				<img
					key={img}
					src={img}
					height={400}
					width={400}
					alt=""
					style={{ marginBottom: '1rem' }}
				/>
			)) ?? <p>loading</p>}
			{fetched === true && <button onClick={refetch}>More</button>}
		</div>
	);
};

export default App;

/*
1. fetch baseurl/product_search?${startWith} -> useProductSearchQuery
2. State = Data: object[] , start: number
3. Scrolling to the end of the div triggers a refetch method
4. Method if start < foo ? fetch : render button with onClick => fetch 
*/
