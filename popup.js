window.onload = async (e) => {
	const postUserName = (await chrome.storage.local.get('postUserName'))['postUserName'];
	const postChannelId = (await chrome.storage.local.get('postChannelId'))['postChannelId'];

	if (postUserName && postChannelId) {
		window.close();
		chrome.tabs.create({ url: 'https://p.st-secure.freee.co.jp/' });
	} else {
		document.querySelector("#saveButton").addEventListener("click", () => {
			const userName = document.querySelector("#userName").value;
			const channelId = document.querySelector("#channelId").value;

			if (userName && channelId) {
				chrome.storage.local.set({ postUserName: userName }).then(() => {
					chrome.storage.local.set({ postChannelId: channelId }).then(() => {
						window.close();
						chrome.tabs.create({ url: 'https://p.st-secure.freee.co.jp/' });
					});
				});
			} else {
				alert('入力欄はどちらも必須です。');
			}
		});
	}
};
