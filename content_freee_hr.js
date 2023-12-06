// 距離を測る関数
const R = Math.PI / 180;
const getDistance = (lat1, lng1, lat2, lng2) => {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;

  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}

// 位置情報を取得完了してから処理を開始
const successGetPosition = async (position) => {
	let isInOffice = false;
	const isSyukkin = true; // ボタンのテストの時は削除
	const channelId = (await chrome.storage.local.get('postChannelId'))['postChannelId'];

	// 大崎ネストとの距離(km)
	// const distance = getDistance(position.coords.latitude, position.coords.longitude, 35.6223771,139.7248845); // 大崎ネストに戻ったらこちらを利用する
	const distance = getDistance(position.coords.latitude, position.coords.longitude, 36.3370005, 138.634776); // 軽井沢バンケットとの距離

	if ((distance * 1000) < 200) {
		isInOffice = true;
	}

	// 出退勤ボタンからのアクション
	// const element = document.querySelector('button.vb-button--appearancePrimary');

	// if (element.children[0].textContent === '出勤') {
	// 	element.addEventListener('click', (() => {
	// 		console.log('出勤ボタンが押されました');
	// 	}));
	// }
	// if (element.children[0].textContent === '退勤') {
	// 	element.addEventListener('click', (() => {
	// 		console.log('退勤ボタンが押されました');
	// 	}));
	// }

	// 出退勤の情報を渡してイベントを送る
	chrome.runtime.sendMessage({
		channelId: channelId,
		isSyukkin: isSyukkin,
		isInOffice: isInOffice,
	}, (res) => {
		console.log(res);
	});
};

// 位置情報が取れなかったら
const errorGetPosition = (position) => {
	// 出退勤ボタンからのアクション
	// const element = document.querySelector('button.vb-button--appearancePrimary');

	// if (element.children[0].textContent === '出勤') {
	// 	element.addEventListener('click', (() => {
	// 		console.log('出勤ボタンが押されました');
	// 	}));
	// }
	// if (element.children[0].textContent === '退勤') {
	// 	element.addEventListener('click', (() => {
	// 		console.log('退勤ボタンが押されました');
	// 	}));
	// }

	// 出退勤の情報を渡してイベントを送る
	chrome.runtime.sendMessage({
		isSyukkin: isSyukkin,
		isInOffice: null,
	}, (res) => {
		console.log(res);
	});
};

navigator.geolocation.getCurrentPosition(successGetPosition, errorGetPosition);
