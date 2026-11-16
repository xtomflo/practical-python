/* VIHR — wspólny nagłówek, menu, koszyk, stopka + render sklepu. */

const $ = (s, r = document) => r.querySelector(s);
const params = new URLSearchParams(location.search);
const pln = (n) => n.toLocaleString("pl-PL") + " zł";
const pad = (n, l = 3) => String(n).padStart(l, "0");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- koszyk (localStorage) ---------- */
const cart = {
  read() { try { return JSON.parse(localStorage.getItem("vihr-cart")) || []; } catch { return []; } },
  write(items) { try { localStorage.setItem("vihr-cart", JSON.stringify(items)); } catch {} renderCart(); },
  add(id, size) {
    const items = this.read();
    const hit = items.find((i) => i.id === id && i.size === size);
    hit ? hit.qty++ : items.push({ id, size, qty: 1 });
    this.write(items);
  },
  remove(index) { const items = this.read(); items.splice(index, 1); this.write(items); },
};

/* ---------- chrome ---------- */
function photo(src, label, cls = "") {
  const img = src ? `<img src="assets/img/${esc(src)}" alt="" loading="lazy">` : "";
  const cap = src ? "" : `<figcaption>${esc(label)}</figcaption>`;
  return `<figure class="ph ${cls}">${img}${cap}</figure>`;
}

function chrome() {
  const cat = params.get("cat");
  const cats = CATS.map((c) =>
    `<a href="shop.html?cat=${c.id}"${c.id === cat ? ' aria-current="page"' : ""}>${c.label}</a>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
<header class="top">
  <div class="top-row">
    <button class="burger" data-open="menu" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
    <a class="logo" href="index.html" aria-label="VIHR — strona główna">V<b>I</b>HR</a>
    <div class="tools">
      <a href="info.html#konto" aria-label="Konto klienta"><svg viewBox="0 0 24 24"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21c0-4.5 3-7 7-7s7 2.500 7 7"/></svg></a>
      <button data-toggle="search" aria-label="Szukaj"><svg viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6"/><path d="M15 15l6 6"/></svg></button>
      <button data-open="cart" aria-label="Koszyk"><svg viewBox="0 0 24 24"><path d="M2 4h3l3 11h10l2.500-8H7"/><circle cx="9.500" cy="19" r="1.300"/><circle cx="17" cy="19" r="1.300"/></svg><span class="mono" id="cart-count">(0)</span></button>
    </div>
  </div>
  <nav class="cats" aria-label="Kategorie">${cats}</nav>
  <form class="search" action="shop.html" role="search">
    <input name="q" type="search" placeholder="czego szukasz?" aria-label="Szukaj w sklepie">
    <button>szukaj →</button>
  </form>
</header>
<div class="scrim" data-close></div>
<aside class="panel menu" aria-label="Menu" aria-hidden="true">
  <button class="panel-close" data-close>× zamknij</button>
  <nav>
    <a href="shop.html">Shop →</a>
    ${COLLECTIONS.map((c) => `<a class="sub" href="shop.html?col=${c}">_${c}</a>`).join("")}
    <a href="about.html">About</a>
    <a href="who-cares.html"># who cares</a>
  </nav>
  <hr>
  <ul>
    <li><a href="info.html#kontakt">Kontakt</a></li>
    <li><a href="info.html#dostawa">Dostawa &amp; zwroty</a></li>
    <li><a href="info.html#konto">Konto klienta</a></li>
    <li><a href="info.html#regulamin">Regulamin</a></li>
    <li><a href="info.html#cookies">Cookies</a></li>
  </ul>
</aside>
<aside class="panel cart" aria-label="Koszyk" aria-hidden="true">
  <button class="panel-close" data-close>× zamknij</button>
  <h2>Koszyk</h2>
  <div id="cart-body"></div>
</aside>`);

  document.body.insertAdjacentHTML("beforeend", `
<footer class="foot">
  <div class="foot-in">
    <ul>
      <li><a href="info.html#kontakt">Kontakt</a></li>
      <li><a href="info.html#dostawa">Dostawa &amp; zwroty</a></li>
      <li><a href="info.html#konto">Konto klienta</a></li>
      <li><a href="info.html#regulamin">Regulamin</a></li>
      <li><a href="info.html#cookies">Cookies</a></li>
    </ul>
    <div class="social">
      <a href="#" aria-label="Pinterest">P</a>
      <a href="#" aria-label="Facebook">f</a>
      <a href="#" aria-label="Instagram">◎</a>
    </div>
  </div>
  <small class="mono">© ${new Date().getFullYear()} VIHR — objects that remember places</small>
</footer>`);

  const close = () => {
    document.body.classList.remove("menu-open", "cart-open");
    document.querySelectorAll(".panel").forEach((p) => p.setAttribute("aria-hidden", "true"));
    $(".burger").setAttribute("aria-expanded", "false");
  };
  const open = (name) => {
    close();
    document.body.classList.add(name + "-open");
    const panel = $(".panel." + name);
    panel.setAttribute("aria-hidden", "false");
    if (name === "menu") $(".burger").setAttribute("aria-expanded", "true");
    $(".panel-close", panel).focus();
  };
  window.openPanel = open;

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open],[data-close],[data-toggle],[data-remove]");
    if (!t) return;
    if (t.dataset.open) open(t.dataset.open);
    else if ("close" in t.dataset) close();
    else if (t.dataset.toggle === "search") {
      document.body.classList.toggle("search-open");
      if (document.body.classList.contains("search-open")) $(".search input").focus();
    } else if (t.dataset.remove) cart.remove(+t.dataset.remove);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { close(); document.body.classList.remove("search-open"); }
  });
  renderCart();
}

function renderCart() {
  const items = cart.read().filter((i) => PRODUCTS.some((p) => p.id === i.id));
  const count = items.reduce((s, i) => s + i.qty, 0);
  $("#cart-count").textContent = `(${count})`;
  if (!items.length) {
    $("#cart-body").innerHTML = `<p class="empty">pusto. jeszcze.</p>`;
    return;
  }
  let sum = 0;
  const lines = items.map((i, n) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    sum += p.price * i.qty;
    return `<div class="cart-line">
      <span class="n">${esc(p.name)}${i.size ? ` / ${esc(i.size)}` : ""} × ${i.qty}</span>
      <span class="mono">${pln(p.price * i.qty)}</span>
      <button data-remove="${n}">usuń</button>
    </div>`;
  }).join("");
  $("#cart-body").innerHTML = `${lines}
    <div class="cart-sum"><span>Razem</span><span>${pln(sum)}</span></div>
    <p class="mono note">Płatności nie są jeszcze podłączone. Koszyk jest zapisany tylko w tej przeglądarce.</p>`;
}

/* ---------- pieczątki: każda litera w czarnym polu, lekko krzywo ---------- */
function stamps() {
  document.querySelectorAll(".stamp").forEach((el) => {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    let k = 0;
    el.innerHTML = text.split(/\s+/).map((word) =>
      `<span class="w" aria-hidden="true">${[...word].map((ch) => {
        k++;
        const y = ((k * 7) % 5) - 2, r = ((k * 13) % 7 - 3) * 0.5;
        return `<span class="l" style="transform:translateY(${y}px) rotate(${r}deg)">${esc(ch)}</span>`;
      }).join("")}</span>`).join("");
  });
}

/* ---------- karty ---------- */
function card(p, n) {
  return `<a class="card" href="product.html?id=${p.id}">
    ${photo(p.photos[0], `foto ${pad(n)}`, n % 3 === 0 ? "light" : "")}
    <div class="row"><span class="num">${pad(n)}</span><span class="price">${pln(p.price)}</span></div>
    <h3>${esc(p.name)}</h3>
  </a>`;
}

/* ---------- strona główna ---------- */
function home() {
  const index = $("#index");
  if (!index) return;
  index.innerHTML = CATS.map((c, i) => {
    const count = PRODUCTS.filter((p) => p.cat === c.id).length;
    return `<li><a href="shop.html?cat=${c.id}">
      <span class="num">${pad(i + 1)}</span><span class="big">${c.label}</span>
      <span class="mono">${esc(c.name)} (${count})</span></a></li>`;
  }).join("");
  const col = COLLECTIONS[0];
  $("#latest-title").textContent = "_" + col;
  $("#latest-link").href = "shop.html?col=" + col;
  $("#latest").innerHTML = PRODUCTS.filter((p) => p.col === col).slice(0, 4).map((p, i) => card(p, i + 1)).join("");
}

/* ---------- sklep ---------- */
function shop() {
  const grid = $("#shop-grid");
  if (!grid) return;
  const cat = params.get("cat"), col = params.get("col"), q = (params.get("q") || "").trim().toLowerCase();
  const c = CATS.find((x) => x.id === cat);
  let list = PRODUCTS;
  let title = "Shop";
  if (c) { list = list.filter((p) => p.cat === c.id); title = c.label; }
  if (col) { list = list.filter((p) => p.col === col); title = c ? `${c.label} <em>_${esc(col)}</em>` : "_" + esc(col); }
  if (q) { list = list.filter((p) => (p.name + " " + p.meta).toLowerCase().includes(q)); title = `<em>„${esc(q)}”</em>`; }

  document.title = `${title.replace(/<[^>]+>/g, "")} — VIHR`;
  $("#shop-title").innerHTML = title;
  $("#shop-count").textContent = `${pad(list.length)} ${list.length === 1 ? "obiekt" : "obiektów"}`;

  const link = (href, label, on) => `<a href="${href}"${on ? ' aria-current="page"' : ""}>${label}</a>`;
  $("#shop-filters").innerHTML =
    link("shop.html", "wszystko", !cat && !col && !q) +
    CATS.map((x) => link(`shop.html?cat=${x.id}`, x.label, x.id === cat && !col)).join("") +
    COLLECTIONS.map((x) => link(`shop.html?col=${x}`, "_" + x, x === col && !cat)).join("");

  grid.innerHTML = list.length
    ? list.map((p, i) => card(p, i + 1)).join("")
    : `<p class="empty">nic tu nie ma. spróbuj inaczej.</p>`;
}

/* ---------- produkt ---------- */
function product() {
  const root = $("#product");
  if (!root) return;
  const p = PRODUCTS.find((x) => x.id === params.get("id"));
  if (!p) { root.innerHTML = `<p class="empty">nie ma takiego obiektu. <a href="shop.html"><u>wróć do sklepu</u></a></p>`; return; }
  const c = CATS.find((x) => x.id === p.cat);
  const n = PRODUCTS.filter((x) => x.cat === p.cat).indexOf(p) + 1;
  document.title = `${p.name} — VIHR`;

  const shots = p.photos.length ? p.photos : [null, null, null, null];
  const gallery = shots.map((s, i) =>
    photo(s, `foto ${pad(i + 1, 2)} / ${pad(shots.length, 2)}`, i === 1 ? "light" : "")).join("");
  const sizes = p.sizes ? `<fieldset class="sizes"><legend class="sr">Rozmiar</legend>${p.sizes.map((s, i) =>
    `<label><input type="radio" name="size" value="${s}"${i === 0 ? " checked" : ""}><span>${s}</span></label>`).join("")}</fieldset>` : "";

  root.innerHTML = `
    <div class="gallery">${gallery}</div>
    <div class="buy">
      <div class="crumb mono"><a href="shop.html?cat=${c.id}">← ${c.label}</a><span>${pad(n)} / _${p.col}</span></div>
      <h1>${esc(p.name)}</h1>
      <div class="price">${pln(p.price)}</div>
      <p class="mono meta">${esc(p.meta)}</p>
      <p class="desc">${esc(p.desc)}</p>
      ${sizes}
      <button class="btn" id="add">Do koszyka</button>
    </div>`;
  $("#add").addEventListener("click", () => {
    const size = $('input[name="size"]:checked')?.value;
    cart.add(p.id, size);
    window.openPanel("cart");
  });
}

chrome();
home();
shop();
product();
stamps();
