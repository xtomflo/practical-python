/* VIHR — dane sklepu.
   UWAGA: wszystkie produkty, ceny i opisy poniżej to PRZYKŁADY (placeholdery).
   Podmień je na prawdziwe. Zdjęcia: wrzuć pliki do assets/img/ i wpisz
   ich nazwy w polu `photos`, np. photos: ["plaszcz-01-a.jpg", "plaszcz-01-b.jpg"].
   Puste `photos` = szare pole z numerem zdjęcia. */

const CATS = [
  { id: "art",    label: ".ART",    name: "Art" },
  { id: "clths",  label: ".CLTHS",  name: "Clothes" },
  { id: "dolls",  label: ".DOLLS",  name: "Dolls" },
  { id: "wrkshp", label: ".WRKSHP", name: "Workshop" },
  { id: "acc",    label: ".ACC",    name: "Accessories" },
];

const COLLECTIONS = ["20.26", "20.27"];

const PRODUCTS = [
  { id: "mapa-bez-miasta", cat: "art", col: "20.26", name: "Mapa bez miasta", price: 480,
    meta: "kolaż / papier akwarelowy 300 g / 50 × 70 cm", photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "kurz-nr-4", cat: "art", col: "20.27", name: "Kurz nr 4", price: 320,
    meta: "technika mieszana / 30 × 40 cm", photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "plaszcz-01", cat: "clths", col: "20.26", name: "Płaszcz 01", price: 1290,
    meta: "wełna z odzysku / szwy na wierzchu", sizes: ["S", "M", "L"], photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "koszula-surowa", cat: "clths", col: "20.26", name: "Koszula surowa", price: 540,
    meta: "bawełna niebielona / krój oversize", sizes: ["S", "M", "L"], photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "spodnie-robocze", cat: "clths", col: "20.27", name: "Spodnie robocze", price: 690,
    meta: "drelich / ręcznie barwione", sizes: ["S", "M", "L"], photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "lalka-07", cat: "dolls", col: "20.26", name: "Lalka nr 07", price: 380,
    meta: "len, wełna, guziki / 34 cm / jedyny egzemplarz", photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "lalka-12", cat: "dolls", col: "20.27", name: "Lalka nr 12", price: 420,
    meta: "tkaniny z odzysku / 41 cm / jedyny egzemplarz", photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "warsztat-lalka", cat: "wrkshp", col: "20.26", name: "Warsztat: uszyj lalkę", price: 260,
    meta: "4 godziny / materiały w cenie / do 8 osób", photos: [],
    desc: "Przykładowy opis warsztatu. Termin i miejsce do uzupełnienia." },
  { id: "warsztat-kolaz", cat: "wrkshp", col: "20.27", name: "Warsztat: kolaż z miejsca", price: 220,
    meta: "3 godziny / materiały w cenie / do 10 osób", photos: [],
    desc: "Przykładowy opis warsztatu. Termin i miejsce do uzupełnienia." },
  { id: "torba-plandeka", cat: "acc", col: "20.26", name: "Torba z plandeki", price: 340,
    meta: "plandeka z odzysku / pasek regulowany", photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "broszka-guzik", cat: "acc", col: "20.26", name: "Broszka-guzik", price: 90,
    meta: "guzik znaleziony / stal", photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
  { id: "szal-postrzepiony", cat: "acc", col: "20.27", name: "Szal postrzępiony", price: 280,
    meta: "wełna / brzegi surowe", photos: [],
    desc: "Przykładowy opis. Kilka zdań o tym, skąd jest ten obiekt i jakie miejsce pamięta." },
];
