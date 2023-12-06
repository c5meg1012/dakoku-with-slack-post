const slackFunc = (args) => {
	const isInOffice = args.isInOffice;
	const isSyukkin = args.isSyukkin;
	let emoji = '';

	if (isSyukkin) {
		if (isInOffice === true) {
			emoji = ':butsuri_syussya: ';
		} else if (isInOffice === false) {
			emoji = ':ronri_syussya: ';
		}

		emoji = emoji + ':ohayougozaimasu:';
	} else {
		if (isInOffice === true) {
			emoji = ':butsuri_taikin: ';
		} else if (isInOffice === false) {
			emoji = ':ronri_taikin: ';
		}

		emoji = emoji + ':otsucurry:';
	}

	window.onload = async (e) => {
		let userName = (await chrome.storage.local.get('postUserName'))['postUserName'];
		const baseTextAreaElement = document.querySelector('div.c-texty_input_unstyled__container');
		const targetTextArea = baseTextAreaElement.children[0].children[0].children[0];

		userName = '@' + userName + ' ';
		targetTextArea.innerHTML = userName + emoji;

		const targetButton = document.querySelector('button.c-wysiwyg_container__button--send');

		// ★タイミング次第で押せない
		targetButton.click();
	};
}

// イベントを受け取る
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (!message) {
		sendResponse({
			'status': false,
			'reason': 'message is missing'
		});
	} else {
		const slackUrl = 'https://app.slack.com/client/' + message.channelId;
		chrome.tabs.create({ url: slackUrl }, (tab) => {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
        func: slackFunc,
        args: [message],
			}, () => {
				sendResponse('slackOpened');
			})
		});
	}

	return true;
});
