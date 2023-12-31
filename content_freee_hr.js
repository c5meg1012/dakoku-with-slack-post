// 距離を測る関数
// https://qiita.com/kawanet/items/a2e111b17b8eb5ac859a
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
	const channelId = (await chrome.storage.local.get('postChannelId'))['postChannelId'];

	// 大崎ネストとの距離(km)
	const distance = getDistance(position.coords.latitude, position.coords.longitude, 35.6223771,139.7248845);

	if ((distance * 1000) < 200) {
		isInOffice = true;
	}

	// 出退勤ボタンからのアクション
	const element = document.querySelector('button.vb-button--appearancePrimary');

	if (element.children[0].textContent === '出勤') {
		element.addEventListener('click', (() => {
			// 出退勤の情報を渡してイベントを送る
			chrome.runtime.sendMessage({
				channelId: channelId,
				isSyukkin: true,
				isInOffice: isInOffice,
			}, (res) => {
				console.log(res);
			});
		}));
	}
	if (element.children[0].textContent === '退勤') {
		element.addEventListener('click', (() => {
			// 出退勤の情報を渡してイベントを送る
			chrome.runtime.sendMessage({
				channelId: channelId,
				isSyukkin: false,
				isInOffice: isInOffice,
			}, (res) => {
				console.log(res);
			});
		}));
	}
};

// 位置情報が取れなかったら
const errorGetPosition = (position) => {
	// 出退勤ボタンからのアクション
	const element = document.querySelector('button.vb-button--appearancePrimary');

	if (element.children[0].textContent === '出勤') {
		element.addEventListener('click', (() => {
			// 出退勤の情報を渡してイベントを送る
			chrome.runtime.sendMessage({
				channelId: channelId,
				isSyukkin: true,
				isInOffice: null,
			}, (res) => {
				console.log(res);
			});
		}));
	}
	if (element.children[0].textContent === '退勤') {
		element.addEventListener('click', (() => {
			// 出退勤の情報を渡してイベントを送る
			chrome.runtime.sendMessage({
				channelId: channelId,
				isSyukkin: false,
				isInOffice: null,
			}, (res) => {
				console.log(res);
			});
		}));
	}
};

navigator.geolocation.getCurrentPosition(successGetPosition, errorGetPosition);
