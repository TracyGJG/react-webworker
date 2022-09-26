const PLUGIN_FOLDER = './plugins';
let currentPlugin = '';
let manifest;

function getCalculate(pluginName) {
	if (pluginName !== currentPlugin) {
		console.log(`Load plugin: ${manifest[pluginName].plugin}`);
		importScripts(`${PLUGIN_FOLDER}/${manifest[pluginName].plugin}`);
		currentPlugin = pluginName;
	}
	return calc;
}

onmessage = e => {
	if (manifest) {
		const { method, num1, num2 } = e.data;
		console.log('pluginRunner - Plugin', e.data);

		result = getCalculate(method)(num1, num2);
		console.log(`getCalculate result = ${result}`);

		postMessage(result);
	} else {
		manifest = e.data;
		console.log('pluginRunner - Loaded', JSON.stringify(manifest, null, 2));
	}
};
