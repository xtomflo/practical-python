# VIHR

Strona marki VIHR — *objects that remember places*. Statyczny HTML/CSS/JS, bez builda.

## Uruchomienie

    python3 -m http.server 8000

i otwórz http://localhost:8000

## Co gdzie jest

- `index.html` — strona główna (hero z foto 1 + foto 2, index kategorii, kolekcja, # who cares)
- `shop.html` — lista produktów (`?cat=clths`, `?col=20.26`, `?q=...`)
- `product.html?id=...` — produkt, zdjęcia numerowane
- `about.html`, `who-cares.html`, `info.html` — strony tekstowe
- `assets/products.js` — kategorie, kolekcje, produkty (**teraz przykładowe**)
- `assets/img/` — tu wrzucaj zdjęcia; nazwy plików wpisz w `photos` w `products.js`
- `assets/paper.jpg` — faktura papieru w tle

## Do zrobienia

- prawdziwe zdjęcia, produkty, ceny i teksty (miejsca oznaczone „do uzupełnienia”)
- płatności / checkout (koszyk działa tylko lokalnie w przeglądarce)
- linki do Pinterest / Facebook / Instagram w stopce (`assets/site.js`)
