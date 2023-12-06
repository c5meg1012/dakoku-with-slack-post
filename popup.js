//保存
localStorage.setItem("testKey", "testVal");

const target = document.querySelector('p.hello');
target.innerHTML = localStorage.getItem("testKey");
