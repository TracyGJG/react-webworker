import { toUpper, Converter } from '../utilities';

function Primary(props) {
	const converter = new Converter();
	console.log(converter.testMessage);
	return <div>{toUpper(converter.testMessage)}</div>;
}

export default Primary;
