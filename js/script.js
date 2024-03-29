var inputMail = document.querySelector(".input__mail");
var dynamicText = document.querySelector(".form-send__dynamic-text");
var arrMoney = ['CNY', 'CHF', 'GBP', 'USD', 'TRY'];
var moneyName = document.querySelectorAll(".info-converter-row__name");
var moneyValue = document.querySelectorAll(".info-converter-row__value");
var blockNews = document.getElementsByClassName("info-news-block");
var arrCryptoMoney = ['BTC', 'ETH', 'BCH', 'USDT', 'LTC'];
var moneyCryptoName = document.querySelectorAll(".info-converter-crypto-row__name");
var moneyCryptoValue = document.querySelectorAll(".info-converter-crypto-row__value");
var sliderParent = document.querySelector(".slider-wrap")
var sliderControls = document.querySelector(".slider-control")

if (inputMail) {
    inputMail.addEventListener("keyup", function () {
        dynamicText.innerText = test.value;
    })
}

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        for (var i = 0; i < moneyName.length; i++) {
            moneyName[i].innerText = arrMoney[i]
            moneyValue[i].innerText = JSON.parse(this.responseText).rates[arrMoney[i]]
        }
    }
});
xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=EUR", true);
xhr.send()

var xhrN = new XMLHttpRequest();
xhrN.withCredentials = false;
xhrN.addEventListener("readystatechange", function () {
    for (var j = 0; j < blockNews.length; j++) {
        blockNews[j].setAttribute('href', JSON.parse(this.responseText).articles[j].url)
        blockNews[j].firstElementChild.innerText = JSON.parse(this.responseText).articles[j].title
    }
});
xhrN.open("GET", "https://newsapi.org/v2/top-headlines?category = business&sources=bloomberg&apiKey=d5ab78edfa2649a6b0fd66a7cf1c2c68", true);
xhrN.send()

var xhrC = new XMLHttpRequest();
xhrC.withCredentials = false;
xhrC.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        for (var i = 0; i < arrCryptoMoney.length; i++) {
            moneyCryptoName[i].innerText = arrCryptoMoney[i]
            moneyCryptoValue[i].innerText = JSON.parse(this.responseText)[arrCryptoMoney[i]]
        }
    }
});
xhrC.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=BTC,ETH,BCH,USDT,LTC&apiKey=bb98291570d521612ebd320b47a541e57dd03581bc116ddeb19abb62e7a306a6", true);
xhrC.send()

sliderControls.addEventListener("click", (e) => {
    var btnSlider = e.target;
    var activeClass = document.querySelector(".slider-control__item_active")
    if (activeClass && btnSlider.classList.contains("slider-control__item")) {
        activeClass.classList.remove("slider-control__item_active")
        btnSlider.classList.add("slider-control__item_active")
        var activeClass = document.querySelector(".slider-control__item_active")
        for (let i = 0; i < sliderControls.children.length; i++) {
            sliderParent.children[i].style.display = "none";
            if (sliderControls.children[i].children[0].classList.contains("slider-control__item_active")) {
                sliderParent.children[i].style.display = "flex";
            }
        }
    }
    clearInterval(window.myInterval)
    setTimeout(() => runSlider(), 1000);
})
function runSlider() {
    let count = 0;
    window.myInterval = setInterval(function tick(){
        for (let i = 0; i < sliderControls.children.length; i++) {
            if (sliderControls.children[count].children[0].classList.contains("slider-control__item_active")) {
                sliderParent.children[count].style.display = "none";
                sliderControls.children[count].children[0].classList.remove("slider-control__item_active")
                count++
                if (count < sliderControls.children.length) {
                    sliderControls.children[count].children[0].classList.add("slider-control__item_active")
                    sliderParent.children[count].style.display = "flex";
                }
                else {
                    count = 0
                    sliderControls.children[count].children[0].classList.add("slider-control__item_active")
                    sliderParent.children[count].style.display = "flex";
                }
            }
            i=sliderControls.children.length
        }
    }, 3000);
}
window.onload = ()=>{runSlider()}