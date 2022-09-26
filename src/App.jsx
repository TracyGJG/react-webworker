import { useEffect, useState } from 'react';
import './App.css';

let WebWorker = new Worker('./pluginRunner.js');

function App() {
	const [numOne, setNumOne] = useState(14);
	const [numTwo, setNumTwo] = useState(3);
	const [buttons, setButtons] = useState([]);
	const [result, setResult] = useState(0);
	let manifest;

	useEffect(() => {
		fetch('../public/plugins/manifest.json')
			.then(response => response.json())
			.then(data => {
				manifest = data;
				setButtons(Object.keys(manifest));
				WebWorker.postMessage(manifest);
			});
	}, []);

	WebWorker.onmessage = e => {
		setResult(e.data);
	};

	function buttonClicked(fnButton) {
		WebWorker.postMessage({
			method: fnButton,
			num1: numOne,
			num2: numTwo,
		});
	}

	return (
		<div className="App">
			<h1>Web Worker Example</h1>
			<section id="inputs">
				<label htmlFor="num1">
					<span>NUM1</span>
					<input
						type="text"
						id="num1"
						value={numOne}
						onChange={evt => setNumOne(+evt.target.value)}
					/>
				</label>
				<label htmlFor="num2">
					<span>NUM2</span>
					<input
						type="text"
						id="num2"
						value={numTwo}
						onChange={evt => setNumTwo(+evt.target.value)}
					/>
				</label>
			</section>
			<section>
				{buttons.map(btnText => (
					<button
						key={btnText}
						onClick={() => buttonClicked(btnText)}
					>
						{btnText}
					</button>
				))}
			</section>
			<section>
				<div id="divResult">{result}</div>
			</section>
		</div>
	);
}

export default App;
