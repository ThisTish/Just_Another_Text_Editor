const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let installPrompt = null
window.addEventListener('beforeinstallprompt', (event) => {
	event.preventDefault()
	installPrompt = event	
});

butInstall.addEventListener('click', async () => {
	if(!installPrompt){
		return
	}
	try {
		const result = await installPrompt.prompt()
		console.log(`app download result: ${result}`)
		installPrompt = null
	} catch (error) {
		console.log(`Error during app installation: ${error}`);
	}
});

window.addEventListener('appinstalled', (event) => {
	console.log('Thanks for download JATE')
	installPrompt = null
});
