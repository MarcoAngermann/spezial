let food = [
    {
      name: "Frikadellen",
      image: ["img/frikadellen.jpg"],
      price: [8.95],
      amount: 0,
      text: ["Unsere leckeren frischen Frikadellen ob Rind oder Schweinefleisch"],
    },
    {
      name: "Sauerbraten",
      image: ["img/sauerbraten.jpg"],
      price: [22.95],
      amount: 0,
      text: [
        "Deutscher Rheinischer Sauerbraten mit Salzkartoffeln und leckerer Soße",
      ],
    },
    {
      name: "Currywurst mit Pommes",
      image: ["img/currywurst.jpg"],
      price: [11.95],
      amount: 0,
      text: [
        "Unsere leckere Currywurst mit Pommes, Herta Heuwer eine Imbissbesitzerin aus Berlin, erfand 1949 die Currywurst, ein Gericht, das die ganze Welt kennt.",
      ],
    },
    {
      name: "Schwäbische Maultaschen",
      image: ["img/maultaschen.jpg"],
      price: [13.95],
      amount: 0,
      text: [
        "Feiner Nudelteig mit einer kräftigen Füllung aus Schweinefleisch in Kombination mit Spinat, Brot, Ei, Zwiebeln sowie erlesenen Gewürzen. Ob geröstet oder in der Brühe: Diese schwäbische Spezialität mundet immer.",
      ],
    },
    {
      name: "Königsberger Klopse",
      image: ["img/koenigsberger.jpg"],
      price: [16.95],
      amount: 0,
      text: [
        "Königsberger Klopse sind eine bekannte ostpreußische Delikatesse, die aus Kalbs- oder Rind-/Schweinehackfleisch hergestellt werden. Ihren charakteristischen Geschmack erhalten sie durch Zugabe von Sardellen in heißer Brühe.",
      ],
    },
    {
      name: "Käse Spätzle",
      image: ["img/spätzle.jpg"],
      price: [10.95],
      amount: 0,
      text: [
        "Die Heimat der Spätzle ist Baden-Württemberg. Es handelt sich hierbei um Teigwaren in länglicher Form, die als Beilage oder mit weiteren Zutaten als eigenes Gericht serviert werden.",
      ],
    },
  ];

let shopcard = [];
let selectedItemIndex = -1;
loadStoredCart();

function renderCardmenu() {
    let menuinfo = document.getElementById('menu_card');
    menuinfo.innerHTML = ``;

    for (let i = 0; i < food.length; i++) {
        const collector = food[i];
        menuinfo.innerHTML += cardMenuHTML(collector, i);
        cardmenuePrice(collector, i);
    }
    renderShopcard();
    renderPrice();
}

function cardMenuHTML(collector, i) {
    return `
    <div class="look-single-menu">
        <div class="food-descript">
            <h2>&#160;${collector['name']}</h2>
            <img class="food" src="${collector['image'][0]}">
            <div class="price-span">
                <span>Preis:&#160;</span>
                <span id='cardmenu_price${i}'></span>
                <span>&#160;€</span>
            </div>
            <span>${collector['text']}</span>
        </div>
        <div class="button-place">
            <button class="push-shop" onclick="shoppingCard(${i})">+</button>
        </div>
    </div>
    `;
}

function cardmenuePrice(collectpricecard, i) {
    let cardprice = document.getElementById(`cardmenu_price${i}`);
    let pricecard = collectpricecard.price;
    let priceformat = pricecard.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    cardprice.innerHTML = priceformat;
}

function renderShopcard() {
    let shopping = document.getElementById('pay_card');
    shopping.innerHTML = ``;

    for (let u = 0; u < shopcard.length; u++) {
        const collectshop = shopcard[u];
        shopping.innerHTML += shopCardHTML(collectshop, u);
    }
}

function shopCardHTML(collectshop, u) {
    return `
    <div class="look-shopping-card">
        <div class="single-shopping-card">
            <div class="place-delete-button">
                <h4>&#160;${collectshop['name']}</h4>
                <button class="delete-shop" onclick="trashShop(${u})">x</button>
            </div>
            <div class="shop-info">
                <button id='minus${u}' class="minus-shop" onclick="minusFunction(${u})">-</button>
                <button id='plus${u}' class="plus-shop" onclick="plusFunction(${u})">+</button>
                <span class="numbers">Anzahl:&#160;${collectshop['amount']}</span>
                <span class="single-shop-price">Preis:&#160;${collectshop['price'].toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}&#160;€</span>
            </div>
        </div>
    </div>
    `;
}

function fullPrice() {
    let priceprice = document.getElementById('price_card');
    priceprice.innerHTML = fullPriceHTML();
}

function fullPriceHTML() {
    let total = 0;
    for (const item of shopcard) {
        total += item.price * item.amount;
    }
    let deliveryFee = total >= 40 ? 0 : 4.95;
    let totalPrice = total + deliveryFee;

    return `
    <table class="price-table">
        <tr>
            <td>Preis:</td>
            <td id='show_price'>&#160;&#160;${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>€</td>
        </tr>
        <tr>
            <td>Lieferpreis:</td>
            <td>&#160;&#160;${deliveryFee.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>€</td>
        </tr>
        <tr>
            <td>Kostenlose Lieferung ab:&#160;</td>
            <td>40,00</td>
            <td>€</td>
        </tr>
        <tr>
            <td>Gesamt Preis:</td>
            <td id='show_final_price'>&#160;&#160;${totalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>€</td>
        </tr>
    </table>
    `;
}

function renderPrice() {
    let priceprice = document.getElementById('price_card');
    priceprice.innerHTML = fullPriceHTML();
}

function shoppingCard(cardx) {
    console.log("shoppingCard() called with index:", cardx);
    let cardxselect = food[cardx];
    selectedItemIndex = shopcard.findIndex(obj => obj.name === cardxselect.name);

    if (selectedItemIndex == -1) {
        let pushamount = Object.assign({}, cardxselect, { amount: 1 });
        shopcard.push(pushamount);
    } else {
        shopcard[selectedItemIndex].amount++;
    }
    saveCartToLocalStorage();
    renderShopcard();
    renderPrice();
}

function saveCartToLocalStorage() {
    localStorage.setItem('shopcard', JSON.stringify(shopcard));
}

function minusFunction(persecution) {
    let minusprice = shopcard[persecution];
    minusprice.amount--;
    if (shopcard[persecution]['amount'] == 0) {
        trashShop(persecution);
    }
    saveCartToLocalStorage();
    renderShopcard();
    renderPrice();
}

function plusFunction(persecution) {
    let plusprice = shopcard[persecution];
    plusprice.amount++;
    saveCartToLocalStorage();
    renderShopcard();
    renderPrice();
}

function trashShop(index) {
    shopcard[index]['amount'] = 1;
    shopcard.splice(index, 1);
    saveCartToLocalStorage();
    renderShopcard();
    renderPrice();
}

function loadStoredCart(){
    let storedCart = localStorage.getItem('shopcard');
    if (storedCart) {
        shopcard = JSON.parse(storedCart);
    }
}

function clearCart() {
    shopcard = []; 
    localStorage.removeItem('shopcard');
    renderShopcard();
    renderPrice();
}