window.onload = async (e) => {
	const postChannelId = (await chrome.storage.local.get('postChannelId'))['postChannelId'];

	if (postChannelId) {
		window.close();
		chrome.tabs.create({ url: 'https://p.secure.freee.co.jp/' });
	} else {
		document.querySelector("#saveButton").addEventListener("click", () => {
			const channelId = document.querySelector("#channelId").value;

			if (channelId) {
				chrome.storage.local.set({ postChannelId: channelId }).then(() => {
					window.close();
					chrome.tabs.create({ url: 'https://p.secure.freee.co.jp/' });
				});
			} else {
				alert('Channel ID は必須です。');
			}
		});
	}
};
