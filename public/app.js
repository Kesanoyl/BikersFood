/* ============================================================
   BIKERS FOOD — app.js
   Menu · Visual Taco Composer · Cart · Checkout · Tracking
   ============================================================ */

// ═══ DATA ═══════════════════════════════════════════════════
const VIANDES = [
  'Escalope Crème','Escalope Curry','Escalope Tandoori','Escalope 4 Épices',
  'Steak','Chicken Épicé','Merguez','Cordon Bleu','Nuggets','Fish'
];
const GRATINAGES = ['Mozzarella','Gruyère','Raclette','Chèvre','Chèvre Miel','Boursin'];
const SAUCES = ['Ketchup','Mayo','Harissa','Algérienne','Burger','Blanche','Curry','Andalouse','Samouraï','Tartare'];
const SAUCES_BOL = ['Ketchup','Mayo','Harissa','Algérienne','Burger','Blanche','Curry','Andalouse','Samouraï','Tartare','Barbecue','Thaï','Poivre','Gruyère'];
const CRUDITES = ['Salade','Chakchouka','Tomates','Oignons','Olives','Cornichons','Salade+Tomates+Oignons','Chakchouka+Olives','Sans légumes'];
const ACCOMPAGNEMENTS = ['Pâtes','Riz','Frites','Salade'];

// Suppléments fromages (hors sauces/viandes)
const SUPPS_TACOS = [
  { name:'Gruyère', price:0.50 },{ name:'Cheddar', price:1.00 },
  { name:'Vache qui rit', price:1.00 },{ name:'Raclette', price:1.50 },
  { name:'Roquefort', price:1.50 },{ name:'Boursin', price:1.50 },
  { name:'Œuf', price:0.50 },{ name:'Lardons', price:1.00 },
  { name:'Jambon de dinde', price:1.00 }
];
const SUPPS_BOL = [
  { name:'Cheddar', price:0.50 },{ name:'Vache qui rit', price:1.00 },
  { name:'Mozzarella', price:1.50 },{ name:'Raclette', price:1.50 },
  { name:'Roquefort', price:1.50 },{ name:'Boursin', price:1.50 },
  { name:'Œuf', price:0.50 },{ name:'Lardons', price:1.00 },
  { name:'Jambon de dinde', price:1.00 }
];
const SUPPS_GRILLADE = [
  { name:'Cheddar', price:0.50 },{ name:'Vache qui rit', price:1.00 },
  { name:'Mozzarella', price:1.50 },{ name:'Raclette', price:1.50 },
  { name:'Roquefort', price:1.50 },{ name:'Boursin', price:1.50 },
  { name:'Œuf', price:0.50 },{ name:'Lardons', price:1.00 },
  { name:'Jambon de dinde', price:1.00 }
];
const SUPPS_SALADE = [
  { name:'Œuf', price:0.50 },{ name:'Cheddar', price:0.50 },
  { name:'Vache qui rit', price:1.00 },{ name:'Lardons', price:1.00 },
  { name:'Jambon de dinde', price:1.00 },{ name:'Mozzarella', price:1.50 },
  { name:'Raclette', price:1.50 },{ name:'Roquefort', price:1.50 },
  { name:'Boursin', price:1.50 }
];
const SUPPS_KIDS = [];

// extrasConfig : { sauces:bool, viandes:bool, saucePrice, viandePrice, supps:array, sauceList }
// On génère les extras dynamiquement dans le modal

// BOISSONS / OPTIONS (listes de choix pour les modals)
const DRINKS = ['Coca Cola','Coca Cola Cherry','Coca Cola Zéro','Fanta Orange','7up','Schweppes Agrum','Orangina','Lipton Ice tea Pêche','Oasis Tropical','Oasis Pomme Cassis Framboise','Perrier','Cristaline'];
const PAINS = ['Cheese Naan','Pain Maison','Tortilla'];
const COND = { list:['Salade','Tomate','Oignon','Olive Verte','Maïs'], max:5, default:['Salade','Tomate','Oignon'] };

// MENU - Carte Bikers Food (Noisy-le-Sec)
const MENU = [
  { id:'formules-menu-sandwich-gourmand', cat:'formules', name:'Menu Sandwich Gourmand', desc:'1 burger classique au choix + 1 Naan au choix , servi avec frites et boisson', price:13.90, emoji:'🍔', img:'formules-menu-sandwich-gourmand.jpg', custom:{boissonMenu:DRINKS} },
  { id:'formules-menu-tacos-gourmand', cat:'formules', name:'Menu Tacos Gourmand', desc:'1 burger classique au choix + 1 Tacos L au choix , servi avec 1 frites etboisson au choix.', price:13.90, emoji:'🌮', img:'formules-menu-tacos-gourmand.jpg', custom:{boissonMenu:DRINKS} },
  { id:'formules-menu-duo-burgers', cat:'formules', name:'Menu Duo Burgers', desc:'2 Burgers au choix, servi avec 1 frite + 1 boisson au choix.', price:12.90, emoji:'🍔', img:'formules-menu-duo-burgers.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b1-cheese-double-cheese', cat:'menus-duo-burgers', name:'Menu B1 (Cheese Double Cheese)', desc:'Double cheese + cheese, servi avec frites et boisson au choix.', price:10.00, emoji:'🍔', img:'menus-duo-burgers-menu-b1-cheese-double-cheese.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b2-big-burger-chicken-burge', cat:'menus-duo-burgers', name:'Menu B2 (Big Burger Chicken Burger)', desc:'Big burger et Chicken burger. Servi avec frites et boisson au choix.', price:13.00, emoji:'🍔', img:'menus-duo-burgers-menu-b2-big-burger-chicken-burge.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b3-big-burger-cheese', cat:'menus-duo-burgers', name:'Menu B3 (Big Burger Cheese)', desc:'Big burger et cheese. Servi avec frites et boisson au choix.', price:11.50, emoji:'🍔', img:'menus-duo-burgers-menu-b3-big-burger-cheese.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b4-2-big-burgers', cat:'menus-duo-burgers', name:'Menu B4 (2 Big Burgers)', desc:'2 big burgers, servi avec frites et boisson au choix.', price:12.50, emoji:'🍔', img:'menus-duo-burgers-menu-b4-2-big-burgers.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b5-2-chicken-burgers', cat:'menus-duo-burgers', name:'Menu B5 (2 Chicken Burgers)', desc:'2 chicken burgers, servi avec 1 frite et boisson au choix', price:13.50, emoji:'🍔', img:'menus-duo-burgers-menu-b5-2-chicken-burgers.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b6-1-chicken-burger-double-', cat:'menus-duo-burgers', name:'Menu B6 (1 Chicken Burger Double cheese)', desc:'1 chicken burger + 1 double cheese servi avec 1 frite et boisson au choix', price:13.00, emoji:'🍔', img:'menus-duo-burgers-menu-b6-1-chicken-burger-double-.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b7-big-burger-giiant', cat:'menus-duo-burgers', name:'Menu B7 (Big Burger Giiant)', desc:'Big burger + Giiant servi avec 1 frite et boisson au choix.', price:12.50, emoji:'🍔', img:'menus-duo-burgers-menu-b7-big-burger-giiant.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-duo-burgers-menu-b8-2-giiant-bugers', cat:'menus-duo-burgers', name:'Menu B8 (2 Giiant Bugers)', desc:'2 Giiants burger servi avec 1 frite et boissonau choix', price:12.50, emoji:'🍔', img:'menus-duo-burgers-menu-b8-2-giiant-bugers.jpg', custom:{boissonMenu:DRINKS} },
  { id:'smash-burgers-seuls-beef-smash', cat:'smash-burgers-seuls', name:'Beef Smash', desc:'Potato buns, 2 steaks smashés, cheddar, salade, tomate, sauce smash.', price:8.90, emoji:'🍔', img:'menu-smash-burgers-menu-beef-smash.jpg', custom:{menu:2.60} },
  { id:'smash-burgers-seuls-bikers-smash', cat:'smash-burgers-seuls', name:'Bikers Smash', desc:'Potato buns, 2 steak smashés, bacon de bœuf, cheddar, salade, cornichons, oignon, sauce smash', price:8.90, emoji:'🍔', img:'menu-smash-burgers-menu-bikers-smash.jpg', custom:{menu:3.60} },
  { id:'smash-burgers-seuls-chicken-smash', cat:'smash-burgers-seuls', name:'Chicken Smash', desc:'Potato buns, Filet de poulet pané, cheddar, salade, tomate, sauce smash.', price:8.90, emoji:'🍔', img:'menu-smash-burgers-menu-chicken-smash.jpg', custom:{menu:3.60} },
  { id:'burgers-seuls-giant-burger', cat:'burgers-seuls', name:'Giant Burger', desc:'Pain simple , 2 steaks, 1 cheddar, sauce giant et salade', price:5.00, emoji:'🍔', img:'menus-burgers-menu-giiant-burger.jpg', custom:{menu:3.00} },
  { id:'burgers-seuls-big-burger', cat:'burgers-seuls', name:'Big Burger', desc:'Pain double sésame, 2 steaks, cheddar, sauce big, salade, oignon et cornichons.', price:5.50, emoji:'🍔', img:'menus-burgers-menu-big-burger.jpg', custom:{menu:2.50} },
  { id:'burgers-seuls-triple-cheese', cat:'burgers-seuls', name:'Triple Cheese', desc:'Pain simple,3 steaks, ketchup, moutarde, oignonset cornichons', price:6.00, emoji:'🍔', img:'menus-burgers-menu-triple-cheese.jpg', custom:{menu:2.50} },
  { id:'burgers-seuls-tasty-burger', cat:'burgers-seuls', name:'Tasty Burger', desc:'Pain sésame, 1 steak 90grs, sauce tasty, emmental, salade, oignons rouge et tomate.', price:7.50, emoji:'🍔', img:'menus-burgers-menu-tasty-burger.jpg', custom:{menu:2.40} },
  { id:'burgers-seuls-cheese-burger', cat:'burgers-seuls', name:'Cheese Burger', desc:'Pain simple, 1 steak, cheddar, ketchup, moutarde, oignon et cornichons.', price:3.00, emoji:'🍔', img:'menus-burgers-menu-cheese-burger.jpg', custom:{menu:3.50} },
  { id:'burgers-seuls-double-cheese-bacon', cat:'burgers-seuls', name:'Double Cheese Bacon', desc:'Pain simple, 2 steaks, 2 cheddar, bacon, ketchup, moutarde, oignon et cornichon.', price:5.00, emoji:'🍔', img:'menus-burgers-menu-double-cheese-bacon.jpg', custom:{menu:3.00} },
  { id:'burgers-seuls-double-chesse-burger', cat:'burgers-seuls', name:'Double Chesse Burger', desc:'Pain simple, 2 steaks, 2 cheddar, ketchup, moutarde, oignon et cornichons.', price:4.00, emoji:'🍔', img:'menus-burgers-menu-double-cheese.jpg', custom:{menu:3.50} },
  { id:'burgers-seuls-chicken-burger', cat:'burgers-seuls', name:'Chicken Burger', desc:'Pain sésame, tenders, cheddar, salade, sauce mayo.', price:6.00, emoji:'🍔', img:'menus-burgers-menu-chicken-burger.jpg', custom:{menu:2.50} },
  { id:'burgers-seuls-fish-burger', cat:'burgers-seuls', name:'Fish Burger', desc:'Pain simple, poisson pané, cheddar, sauce Fish.', price:4.90, emoji:'🍔', img:'menus-burgers-menu-fish-burger.jpg', custom:{menu:3.00} },
  { id:'naan-burgers-seuls-naan-burger-giant', cat:'naan-burgers-seuls', name:'Naan Burger Giant', desc:'Pain Naan, 2 steaks, cheddar, salade, sauce Giant.', price:9.90, emoji:'🫓', img:'menu-naan-burgers-menu-naan-burger-giant.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'naan-burgers-seuls-naan-burger-big', cat:'naan-burgers-seuls', name:'Naan Burger Big', desc:'Pain Naan, 2 steaks, cheddar, oignons, cornichons, salade, sauce Big.', price:10.90, emoji:'🫓', img:'menu-naan-burgers-menu-naan-burger-big.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'naan-burgers-seuls-naan-burger-chicken', cat:'naan-burgers-seuls', name:'Naan Burger Chicken', desc:'Pain Naan, Filet de poulet pané, cheddar, salade, tomate, oignon.', price:10.90, emoji:'🫓', img:'menu-naan-burgers-menu-naan-burger-chicken.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-taandori', cat:'menu-naandwich', name:'Naan Taandori', desc:'Poulet mariné au Tandoori, cheddar, crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-taandori.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-triple-steaks', cat:'menu-naandwich', name:'Naan Triple steaks', desc:'3 Steaks, cheddar, œuf et bacon de Bœuf, crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-triple-steaks.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-suprême', cat:'menu-naandwich', name:'Naan Suprême', desc:'2 steaks, Escalope de poulet, œuf, bacon et cheddar, crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-suprême.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-fondu', cat:'menu-naandwich', name:'Naan Fondu', desc:'Escalope de poulet, Mozzarela, poulet fumé, crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-fondu.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-boursin', cat:'menu-naandwich', name:'Naan Boursin', desc:'Escalope de poulet, Boursin et cheddar,crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-boursin.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-quattro', cat:'menu-naandwich', name:'Naan Quattro', desc:'4 steaks, bacon et cheddar, crudités et sauce au choix.', price:7.90, emoji:'🌯', img:'menu-naandwich-menu-naan-quattro.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-escalope', cat:'menu-naandwich', name:'Naan Escalope', desc:'Escalope de Poulet, Oignon Frit, cheddar,crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-escalope.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-cordon', cat:'menu-naandwich', name:'Naan Cordon', desc:'2 steaks, Cordon Bleu, cheddar, crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-cordon.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-tornado', cat:'menu-naandwich', name:'Naan Tornado', desc:'2 steaks, Tenders, œuf, Poulet fumé et cheddar, crudités et sauce au choix.', price:7.90, emoji:'🌯', img:'menu-naandwich-menu-naan-tornado.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-super-trio', cat:'menu-naandwich', name:'Naan Super Trio', desc:'3 steaks, œuf, Boursin, poulet fuméet cheddar, crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-super-trio.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menu-naandwich-menu-naan-farmer', cat:'menu-naandwich', name:'Naan Farmer', desc:'Escalope de poulet, Vache qui Rit,crudités et sauce au choix.', price:6.90, emoji:'🌯', img:'menu-naandwich-menu-naan-farmer.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-triple-steaks', cat:'menus-sandwichs', name:'Triple Steaks', desc:'Pain au choix, 3 steaks, œuf, bacon de bœuf, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-triple-steaks.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-super-trio', cat:'menus-sandwichs', name:'Super Trio', desc:'Pain au choix, 3 steaks, œuf, cheddar, poulet fumé, Boursin, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-super-trio.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-tornado', cat:'menus-sandwichs', name:'Tornado', desc:'Pain au choix, 2 steaks, tenders, oeuf, poulet fumé, cheddar, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-tornado.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-chicken-tandoori', cat:'menus-sandwichs', name:'Chicken Tandoori', desc:'Pain au choix, Emincé de poulet Tandoori et cheddar, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-chicken-tandoori.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-cordon', cat:'menus-sandwichs', name:'Cordon', desc:'Pain au choix, 2 steaks, cordon bleu, cheddar, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-cordon.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-escalope-du-chef', cat:'menus-sandwichs', name:'Escalope Du chef', desc:'Pain au choix, Escalope de poulet oignons frits, cheddar, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-escalope-du-chef.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-boursin', cat:'menus-sandwichs', name:'Boursin', desc:'Pain au choix, escalope, sauce Boursin, cheddar, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-boursin.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-quattro', cat:'menus-sandwichs', name:'Quattro', desc:'Pain au choix, 4 steaks, bacon de bœuf, cheddar, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-quattro.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-farmer', cat:'menus-sandwichs', name:'Farmer', desc:'Pain au choix, escalope de poulet, poulet fumé et Vache Qui Rit, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-farmer.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-fondu', cat:'menus-sandwichs', name:'Fondu', desc:'Pain au choix, escalope de poulet, poulet fumée et Mozzarella, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-fondu.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'menus-sandwichs-menu-suprême', cat:'menus-sandwichs', name:'Suprême', desc:'Pain au choix, 2 steaks, escalope de poulet, bacon, de bœuf, œuf, cheddar, crudités et sauce au choix.', price:6.50, emoji:'🌯', img:'menus-sandwichs-menu-suprême.jpg', custom:{menu:3.00,pain:PAINS,condiments:COND} },
  { id:'tacos-seuls-tacos-m', cat:'tacos-seuls', name:'Tacos M', desc:'1 viande au choix et sauce fromagère servi avec 1 boisson au choix', price:8.90, emoji:'🥤', img:'tacos-seuls-tacos-m.jpg', custom:{boissonMenu:DRINKS} },
  { id:'tacos-seuls-tacos-l', cat:'tacos-seuls', name:'Tacos L', desc:'2 viandes au choix et sauce fromagère servi avec 1 boisson au choix', price:9.90, emoji:'🥤', img:'tacos-seuls-tacos-l.jpg', custom:{boissonMenu:DRINKS} },
  { id:'tacos-seuls-tacos-xl', cat:'tacos-seuls', name:'Tacos XL', desc:'3 viandes au choix et sauce fromagère servi avec 1 boisson au choix.', price:10.90, emoji:'🥤', img:'tacos-seuls-tacos-xl.jpg', custom:{boissonMenu:DRINKS} },
  { id:'menus-kids-menu-enfant', cat:'menus-kids', name:'Menu enfant', desc:'1 cheese ou 4 nugget\'s, servi avec frites, Capri-Sun et 1 surprise.', price:6.90, emoji:'🧸', img:'menus-kids-menu-enfant.jpg' },
  { id:'tex-mex-mozza-sticks', cat:'tex-mex', name:'Mozza sticks', desc:'4 ou 8 pièces.', price:3.00, emoji:'🍗', img:'tex-mex-mozza-sticks.jpg' },
  { id:'tex-mex-tenders', cat:'tex-mex', name:'Tenders', desc:'3 ou 5 pièces.', price:4.00, emoji:'🍗', img:'tex-mex-tenders.jpg' },
  { id:'tex-mex-nuggets', cat:'tex-mex', name:'Nuggets', desc:'4 ou 8 pièces.', price:3.00, emoji:'🍗', img:'tex-mex-nuggets.jpg' },
  { id:'tex-mex-bouchées-de-camembert', cat:'tex-mex', name:'Bouchées de Camembert', desc:'4 ou 8 pièces.', price:3.00, emoji:'🍗', img:'tex-mex-bouchées-de-camembert.jpg' },
  { id:'tex-mex-frite', cat:'tex-mex', name:'Frite', desc:'Frites maison.', price:2.50, emoji:'🍗', img:'tex-mex-frite.jpg' },
  { id:'tex-mex-cheese-naan', cat:'tex-mex', name:'Cheese Naan', desc:'Pain Naan cuit au four Tandoor garni de fromage.', price:3.00, emoji:'🍗', img:'tex-mex-cheese-naan.jpg' },
  { id:'desserts-tiramisu-speculos-nutella', cat:'desserts', name:'Tiramisu Speculos Nutella', desc:'Saveur Spéculos Nutella.', price:3.00, emoji:'🍩' },
  { id:'boissons-coca-cola-33-cl', cat:'boissons', name:'Coca Cola 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-coca-cola-33-cl.jpg' },
  { id:'boissons-coca-cola-cherry-33-cl', cat:'boissons', name:'Coca Cola Cherry 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-coca-cola-cherry-33-cl.jpg' },
  { id:'boissons-coca-cola-zéro-33-cl', cat:'boissons', name:'Coca Cola Zéro 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-coca-cola-zéro-33-cl.jpg' },
  { id:'boissons-fanta-orange-33-cl', cat:'boissons', name:'Fanta Orange 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-fanta-orange-33-cl.jpg' },
  { id:'boissons-7up-33-cl', cat:'boissons', name:'7up 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-7up-33-cl.jpg' },
  { id:'boissons-schweppes-agrum-33-cl', cat:'boissons', name:'Schweppes Agrum 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-schweppes-agrum-33-cl.jpg' },
  { id:'boissons-orangina-33-cl', cat:'boissons', name:'Orangina 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-orangina-33-cl.jpg' },
  { id:'boissons-lipton-ice-tea-pêche-33-cl', cat:'boissons', name:'Lipton Ice tea Pêche 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-lipton-ice-tea-pêche-33-cl.jpg' },
  { id:'boissons-oasis-tropical-33-cl', cat:'boissons', name:'Oasis Tropical 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-oasis-tropical-33-cl.jpg' },
  { id:'boissons-oasis-pomme-cassis-framboise-33-cl', cat:'boissons', name:'Oasis Pomme Cassis Framboise 33 cl', desc:'33 cl.', price:1.50, emoji:'🧊', img:'boissons-oasis-pomme-cassis-framboise-33-cl.jpg' },
  { id:'boissons-perrier-33-cl', cat:'boissons', name:'Perrier 33 cl', desc:'33 cl', price:1.50, emoji:'🧊', img:'boissons-perrier-33-cl.jpg' },
  { id:'boissons-cristaline-50-cl', cat:'boissons', name:'Cristaline 50 cl', desc:'50 cl', price:1.00, emoji:'💧' },
];

const CAT_NAMES = {
  'formules':'🍔 Formules',
  'menus-duo-burgers':'🍔 Menus Duo Burgers',
  'smash-burgers-seuls':'🔥 Smash Burgers',
  'burgers-seuls':'🍔 Burgers',
  'naan-burgers-seuls':'🫓 Naan Burgers',
  'menu-naandwich':'🌯 Naan\'Dwich',
  'menus-sandwichs':'🥖 Sandwichs',
  'tacos-seuls':'🌮 Tacos',
  'menus-kids':'🧸 Menu Enfant',
  'tex-mex':'🍗 Tex Mex',
  'desserts':'🍩 Desserts',
  'boissons':'🥤 Boissons'
};
const CAT_ORDER = ['formules','menus-duo-burgers','smash-burgers-seuls','burgers-seuls','naan-burgers-seuls','menu-naandwich','menus-sandwichs','tacos-seuls','menus-kids','tex-mex','desserts','boissons'];

// ═══ OVERRIDES d'options par produit (survivent à une régénération du MENU) ═══
const SAUCES_BF = ['Algérienne','Barbecue','Ketchup','Mayonnaise','Samouraï','Biggy','Harissa','Fish','Andalouse','Cheezy','Poivre','Blanche','Sans Sauce'];
const GOURMAND_BURGERS = ['Giant Burger','Big Burger','Cheese Burger','Double Cheese Bacon','Double Cheese Burger','Fish Burger'];
const GOURMAND_NAANS = ['Triple Steaks','Super Trio','Tornado','Chicken Tandoori','Cordon'];
const TACOS_VIANDES = [{name:'Merguez',price:0},{name:'Tenders',price:1.00},{name:'Cordon bleu',price:0},{name:'Viande hachée',price:0},{name:'Nuggets',price:0},{name:'Chicken Tandoori',price:0},{name:'Escalope grillée',price:0},{name:'Fish',price:0}];
const TACOS_SUPPS = [{name:'Sauce Fromagère',price:1.50},{name:'Cheddar',price:1.00},{name:'Tomates',price:1.00},{name:'Oignons rouges',price:1.00},{name:'Cornichons',price:1.00},{name:'Olive vert',price:1.00},{name:'Maïs',price:1.00},{name:'Galette de Pomme de terre',price:1.50}];
const NAAN_SUPPS = [{name:'Oeuf',price:1.00},{name:'Cheddar',price:1.00},{name:'Boursin',price:1.00},{name:'Bacon',price:1.00}];
const PAINS_SANDWICH = ['Pain Maison','Tortilla'];
(function applyMenuOverrides(){
  const byId=Object.fromEntries(MENU.map(m=>[m.id,m]));
  const sauce2={list:SAUCES_BF,count:2};
  // 1) Formules sur-mesure
  if(byId['formules-menu-sandwich-gourmand'])byId['formules-menu-sandwich-gourmand'].custom={burgerChoice:GOURMAND_BURGERS,naanChoice:GOURMAND_NAANS,pain:PAINS,condiments:COND,sauces:sauce2,boissonMenu:DRINKS};
  if(byId['formules-menu-tacos-gourmand'])byId['formules-menu-tacos-gourmand'].custom={burgerChoice:GOURMAND_BURGERS,viandeChoice:TACOS_VIANDES,viandeMax:2,extrasConfig:{sauces:false,viandes:false,sauceList:[],supps:TACOS_SUPPS},boissonMenu:DRINKS};
  if(byId['formules-menu-duo-burgers'])byId['formules-menu-duo-burgers'].custom={burgerChoice:GOURMAND_BURGERS,burger2Choice:GOURMAND_BURGERS,sauces:sauce2,boissonMenu:DRINKS};
  // 2) Duo Burgers B1..B8 : sauces + boisson uniquement
  MENU.filter(m=>m.cat==='menus-duo-burgers').forEach(m=>{ m.custom={sauces:sauce2,boissonMenu:DRINKS}; });
  // 3) Burgers / Smash / Naan Burgers : sauces + suppléments payants (boisson via "En menu")
  MENU.filter(m=>['burgers-seuls','smash-burgers-seuls','naan-burgers-seuls'].includes(m.cat)).forEach(m=>{ m.custom=Object.assign({},m.custom,{sauces:sauce2,extrasConfig:{sauces:false,viandes:false,sauceList:[],supps:NAAN_SUPPS}}); });
  // 4) Naan'Dwich : pain + condiments (déjà) + sauces + suppléments payants (boisson via "En menu")
  MENU.filter(m=>m.cat==='menu-naandwich').forEach(m=>{ m.custom=Object.assign({},m.custom,{sauces:sauce2,extrasConfig:{sauces:false,viandes:false,sauceList:[],supps:NAAN_SUPPS}}); });
  // 5) Sandwichs : pain (Pain Maison/Tortilla) + condiments + sauces + suppléments payants (boisson via "En menu")
  MENU.filter(m=>m.cat==='menus-sandwichs').forEach(m=>{ m.custom=Object.assign({},m.custom,{pain:PAINS_SANDWICH,sauces:sauce2,extrasConfig:{sauces:false,viandes:false,sauceList:[],supps:NAAN_SUPPS}}); });
  // 6) Tacos seuls : viande au choix + sauces + suppléments (dont Frites +2€) — boisson déjà incluse
  const TACOS_SUPPS2 = TACOS_SUPPS.concat([{name:'Frites',price:2.00}]);
  MENU.filter(m=>m.cat==='tacos-seuls').forEach(m=>{ const vm=/-xl$/.test(m.id)?3:(/-l$/.test(m.id)?2:1); m.custom=Object.assign({},m.custom,{viandeChoice:TACOS_VIANDES,viandeMax:vm,sauces:sauce2,extrasConfig:{sauces:false,viandes:false,sauceList:[],supps:TACOS_SUPPS2}}); });
  // 7) Menu Enfant : choix Cheeseburger ou Nuggets
  if(byId['menus-kids-menu-enfant'])byId['menus-kids-menu-enfant'].custom={plat:['Cheeseburger','Nuggets']};
  // 8) Tex Mex : portions (nombre de pièces) avec surcoût
  const TEX_PORTIONS={
    'tex-mex-mozza-sticks':[{name:'4 pièces',price:0},{name:'8 pièces',price:2.00}],
    'tex-mex-tenders':[{name:'3 pièces',price:0},{name:'5 pièces',price:3.00}],
    'tex-mex-nuggets':[{name:'4 pièces',price:0},{name:'8 pièces',price:2.00}],
    'tex-mex-bouchées-de-camembert':[{name:'4 pièces',price:0},{name:'8 pièces',price:2.00}],
  };
  Object.keys(TEX_PORTIONS).forEach(id=>{ if(byId[id])byId[id].custom=Object.assign({},byId[id].custom,{portion:TEX_PORTIONS[id]}); });
  // 9) Desserts : nouveaux produits (Tiramisu Bueno + Milkshake)
  const MILK_SAVEURS=['Kinder Bueno',"M&M's",'Oréo','Nutella','Banane','Mangue','Fraise','Fruit exotique','Speculoos','Daim','Vanille'];
  MENU.push({id:'desserts-tiramisu-bueno',cat:'desserts',name:'Tiramisu Bueno',desc:'Saveur Kinder Bueno.',price:3.00,emoji:'🍰',img:''});
  MENU.push({id:'desserts-milkshake',cat:'desserts',name:'Milkshake',desc:'Milkshake maison — nappage & saveur au choix.',price:5.90,emoji:'🥤',img:'',
    custom:{nappage:['Chocolat','Caramel','Sans nappage'],saveurChoice:MILK_SAVEURS,extrasConfig:{sauces:false,viandes:false,sauceList:[],supps:MILK_SAVEURS.map(s=>({name:s,price:1.00}))}}});
})();

// ═══ STATE ═══════════════════════════════════════════════════
let cart = JSON.parse(localStorage.getItem('bikersfood_cart') || '[]');
let activeCat = 'all';
let editing = null, editState = {}, editQty = 1, editingCartIdx = -1;

// Composer state
let composerState = {
  type: 'tacos', viandes: [], gratinage: null,
  sauces: [], crudites: null, extras: [], menu: false, boisson: null
};
let viandeCount = 1, maxViandes = 2;

function saveCart() { localStorage.setItem('bikersfood_cart', JSON.stringify(cart)); }
function fmt(n) { return (Math.round(n*100)/100).toFixed(2).replace('.',',') + '€'; }

// ═══ INIT ════════════════════════════════════════════════════
const $ = id => document.getElementById(id);

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
// Toujours arriver tout en haut au (re)chargement : on neutralise un eventuel
// hash (#menu, #hero...) qui ferait sauter le navigateur vers une section.
if (location.hash) { history.replaceState(null, '', location.pathname + location.search); }
window.scrollTo(0, 0);
window.addEventListener('load', () => window.scrollTo(0, 0));
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  renderMenu();
  initLoader();
  initNav();
  initCart();
  initProductModal();
  initComposer();
  initReveal();
  initCounters();
  initParticles();
  updateCartUI();
});

// ═══ LOADER ══════════════════════════════════════════════════
function initLoader() {
  // Fallback CSS gère déjà la disparition après 5s
  // Le JS accélère juste le processus
  const loader = $('loader');
  if (!loader) return;
  const hide = () => { loader.classList.add('hidden'); };
  window.addEventListener('load', () => setTimeout(hide, 300));
  // Fallback JS si window.load ne se déclenche pas
  setTimeout(hide, 4000);
}

// ═══ NAV ═════════════════════════════════════════════════════
function initNav() {
  window.addEventListener('scroll', () => {
    $('nav').classList.toggle('scrolled', scrollY > 40);
    $('scroll-progress').style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
  }, {passive:true});
  // Back to top button
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => { backBtn.classList.toggle('visible', window.scrollY > 500); }, {passive:true});
  }

  const burger = $('nav-burger'), menu = $('nav-menu');
  const closeMenu = () => { burger.classList.remove('active'); menu.classList.remove('open'); document.body.classList.remove('nav-open'); };
  burger.addEventListener('click', e => { e.stopPropagation(); const open = menu.classList.toggle('open'); burger.classList.toggle('active', open); document.body.classList.toggle('nav-open', open); });
  menu.addEventListener('click', e => { if(e.target === menu) closeMenu(); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  $('nav-track').addEventListener('click', e => { e.preventDefault(); openTrack(); });
}

// ═══ RENDER MENU ═════════════════════════════════════════════
function renderMenu(filter = 'all') {
  activeCat = filter;
  const items = filter === 'all' ? MENU : MENU.filter(m => m.cat === filter);
  if (filter === 'all') {
    $('menu-grid').innerHTML = CAT_ORDER.map(cat => {
      const ci = items.filter(m => m.cat === cat);
      if (!ci.length) return '';
      return '<div class="menu-cat-header"><h3 class="menu-cat-title">'+CAT_NAMES[cat]+'</h3></div>' + ci.map((m,i) => card(m,i)).join('');
    }).join('');
  } else {
    $('menu-grid').innerHTML = items.map((m,i) => card(m,i)).join('');
  }
  $('menu-filters').querySelectorAll('.filter-pill').forEach(b => b.classList.toggle('active', b.dataset.cat === filter));
  $('menu-grid').querySelectorAll('.menu-card').forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.id));
  });
}

function card(m, i) {
  const img = m.img ? '<img src="img/menu/'+m.img+'" alt="'+m.name+'" loading="lazy" />' : '';
  const hasMenu = m.custom && m.custom.menu;
  const priceStr = hasMenu
    ? '<span class="menu-card-price">'+fmt(m.price)+' <small style="font-weight:400;color:var(--text-muted);">/ '+fmt(m.price + m.custom.menu)+' menu</small></span>'
    : '<span class="menu-card-price">'+fmt(m.price)+'</span>';
  return '<div class="menu-card" style="animation: cardIn 0.5s var(--ease-out) both; animation-delay:'+(i*0.04)+'s" data-id="'+m.id+'">'+
    '<div class="menu-card-img">'+(img||'<span class="menu-card-emoji">'+m.emoji+'</span>')+
    (m.tag?'<span class="menu-card-tag '+m.tagClass+'">'+m.tag+'</span>':'')+'</div>'+
    '<div class="menu-card-body"><h3>'+m.name+'</h3><p class="menu-card-desc">'+(m.desc||'&nbsp;')+'</p>'+
    '<div class="menu-card-footer">'+priceStr+
    '<span class="menu-card-add">+</span></div></div></div>';
}

$('menu-filters').addEventListener('click', e => {
  const pill = e.target.closest('.filter-pill');
  if (!pill) return;
  const cat = pill.dataset.cat;
  renderMenu(cat);
  // Scroll to the top of the menu grid (just under sticky nav+filters)
  setTimeout(() => {
    const grid = $('menu-grid');
    if (grid) {
      const el = grid.getBoundingClientRect();
      const stickyOffset = 130; // nav(56) + filters(~50) + margin
      window.scrollTo({ top: window.scrollY + el.top - stickyOffset, behavior: 'smooth' });
    }
  }, 100);
});

// ═══ VISUAL TACO COMPOSER ════════════════════════════════════
const MEAT_COLORS = {
  'Escalope Crème':'#e8d8c0','Escalope Curry':'#daa050','Escalope Tandoori':'#c4754a',
  'Escalope 4 Épices':'#b8956b','Steak':'#8b5a3c','Chicken Épicé':'#c46030',
  'Merguez':'#a0523b','Cordon Bleu':'#d4b896','Nuggets':'#daa06d','Fish':'#f0e0c0'
};
const GRATIN_COLORS = {
  'Mozzarella':'#f5f0d0','Gruyère':'#f0d880','Raclette':'#f5e0b0',
  'Chèvre':'#fafafa','Chèvre Miel':'#f5e0a0','Boursin':'#f5f0e0'
};
const SAUCE_COLORS = {
  'Ketchup':'#d03030','Mayo':'#fafae0','Harissa':'#c04020','Algérienne':'#e86030',
  'Burger':'#e0c878','Blanche':'#fafaf5','Curry':'#daa050','Andalouse':'#f08040',
  'Samouraï':'#f08040','Tartare':'#f5f0d0','Barbecue':'#8b3a20','Thaï':'#e06030',
  'Poivre':'#c0b090','Gruyère':'#f0d880'
};
const TYPE_NAMES = {tacos:'🌮 Tacos',gratine:'🧀 Tacos Gratinés',roule:'🌯 Roulé Gratiné',bol:'🥙 Bol Gratiné'};

function initComposer() {
  if(!document.getElementById('comp-step-type')) return; // composer retiré (Bikers Food)
  fillComposerOptions();
  updateComposerVisual();
  updateComposerPrice();

  // ── TYPE ──
  $('comp-step-type').addEventListener('click', e => {
    const btn = e.target.closest('.composer-toggle');
    if (!btn) return;
    $('comp-step-type').querySelectorAll('.composer-toggle').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    composerState.type = btn.dataset.val;
    maxViandes = (composerState.type === 'tacos' || composerState.type === 'gratine') ? 2 : 1;
    if (viandeCount > maxViandes) viandeCount = maxViandes;
    while (composerState.viandes.length > maxViandes) composerState.viandes.pop();
    document.getElementById('vc-count').textContent = viandeCount;
    const showGratin = composerState.type === 'gratine' || composerState.type === 'roule' || composerState.type === 'bol';
    $('comp-step-gratinage').style.display = showGratin ? '' : 'none';
    // Renumber: meat, crudites, sauces, menu, extras
    $('meat-step-num').textContent = showGratin ? '3' : '2';
    $('crudites-step-num').textContent = showGratin ? '4' : '3';
    $('sauces-step-num').textContent = showGratin ? '5' : '4';
    $('menu-step-num').textContent = showGratin ? '6' : '5';
    $('extras-step-num').textContent = showGratin ? '7' : '6';
    $('composer-badge').textContent = TYPE_NAMES[composerState.type];
    fillComposerOptions();
    updateComposerVisual();
    updateComposerPrice();
  });

  // ── VIANDES COUNT ──
  document.getElementById('vc-minus').addEventListener('click', () => {
    if (viandeCount <= 1) return; viandeCount--;
    while (composerState.viandes.length > viandeCount) composerState.viandes.pop();
    document.getElementById('vc-count').textContent = viandeCount;
    fillComposerOptions(); updateComposerVisual(); updateComposerPrice();
  });
  document.getElementById('vc-plus').addEventListener('click', () => {
    if (viandeCount >= maxViandes) return; viandeCount++;
    document.getElementById('vc-count').textContent = viandeCount;
    fillComposerOptions(); updateComposerVisual(); updateComposerPrice();
  });

  // ── VIANDES ──
  $('comp-meats').addEventListener('click', e => {
    const btn = e.target.closest('.composer-option');
    if (!btn) return;
    const val = btn.dataset.val, idx = composerState.viandes.indexOf(val);
    if (idx >= 0) { composerState.viandes.splice(idx,1); }
    else { if (composerState.viandes.length>=viandeCount) composerState.viandes.shift(); composerState.viandes.push(val); }
    fillComposerOptions(); updateComposerVisual(); updateComposerPrice();
  });

  // ── GRATINAGE ──
  $('comp-gratinages').addEventListener('click', e => {
    const btn = e.target.closest('.composer-option'); if (!btn) return;
    composerState.gratinage = btn.dataset.val;
    fillComposerOptions(); updateComposerVisual();
  });

  // ── CRUDITÉS ──
  $('comp-crudites').addEventListener('click', e => {
    const btn = e.target.closest('.composer-option'); if (!btn) return;
    composerState.crudites = btn.dataset.val;
    fillComposerOptions(); updateComposerVisual();
  });

  // ── SAUCES (2 gratuites, multi-pill) ──
  $('comp-sauces-multi').addEventListener('click', e => {
    const btn = e.target.closest('.composer-option'); if (!btn) return;
    const val = btn.dataset.val, idx = composerState.sauces.indexOf(val);
    if (idx >= 0) { composerState.sauces.splice(idx, 1); }
    else { if (composerState.sauces.length >= 2) composerState.sauces.shift(); composerState.sauces.push(val); }
    fillComposerOptions(); updateComposerVisual();
  });

  // ── MENU ──
  $('comp-menu-toggles').addEventListener('click', e => {
    const btn = e.target.closest('.composer-toggle'); if (!btn) return;
    composerState.menu = btn.dataset.val === 'oui';
    $('comp-menu-toggles').querySelectorAll('.composer-toggle').forEach(b => b.classList.toggle('active', b.dataset.val === (composerState.menu?'oui':'non')));
    $('comp-drink-group').style.display = composerState.menu ? '' : 'none';
    fillComposerOptions(); updateComposerVisual(); updateComposerPrice();
  });
  $('comp-drink-group').addEventListener('click', e => {
    const btn = e.target.closest('.composer-option'); if (!btn) return;
    composerState.boisson = btn.dataset.val; fillComposerOptions(); updateComposerVisual();
  });

  // ── EXTRAS ──
  $('comp-extras').addEventListener('click', e => {
    const btn = e.target.closest('.composer-option'); if (!btn) return;
    const val = btn.dataset.val, idx = composerState.extras.indexOf(val);
    if (idx>=0) composerState.extras.splice(idx,1); else composerState.extras.push(val);
    fillComposerOptions(); updateComposerVisual(); updateComposerPrice();
  });

  // ── ADD TO CART ──
  $('composer-add').addEventListener('click', () => {
    if (!composerState.viandes.length) { showToast('Choisis au moins une viande 🍖','error'); return; }
    if (composerState.menu && !composerState.boisson) { showToast('Choisis ta boisson menu 🥤','error'); return; }
    const price = getComposerPrice();
    const typeLabel = TYPE_NAMES[composerState.type];
    const parts = [];
    if ((composerState.type==='gratine'||composerState.type==='roule'||composerState.type==='bol') && composerState.gratinage) parts.push('Gratiné '+composerState.gratinage);
    parts.push(composerState.viandes.join(' + '));
    if (composerState.crudites) parts.push('Crudités: '+composerState.crudites);
    if (composerState.sauces.length) parts.push('Sauces: '+composerState.sauces.join('+'));
    if (composerState.menu && composerState.boisson) parts.push('Menu '+composerState.boisson);
    const baseLabel = parts.filter(Boolean).join(' • ');
    const extrasLabel = composerState.extras.length ? composerState.extras.join(', ') : '';
    const label = baseLabel + (extrasLabel ? ' • +'+extrasLabel : '');
    const isGrat = composerState.type==='gratine'||composerState.type==='roule'||composerState.type==='bol';
    const exSaC=[],exViC=[],exSuC=[];
    composerState.extras.forEach(nm=>{
      if(SAUCES.includes(nm))exSaC.push(nm);
      else if(VIANDES.includes(nm))exViC.push(nm);
      else exSuC.push(nm);
    });
    const comp=[];
    if(isGrat && composerState.gratinage)comp.push({i:'🧀',k:'Gratiné',base:[composerState.gratinage],extra:[]});
    if(composerState.viandes.length||exViC.length)comp.push({i:'🍖',k:'Viandes',base:composerState.viandes,extra:exViC});
    if(composerState.crudites)comp.push({i:'🥬',k:'Crudités',base:[composerState.crudites],extra:[]});
    if(composerState.sauces.length||exSaC.length)comp.push({i:'🥫',k:'Sauces',base:composerState.sauces,extra:exSaC});
    if(composerState.menu && composerState.boisson)comp.push({i:'🍟',k:'Menu',base:['Frites + '+composerState.boisson],extra:[]});
    if(exSuC.length)comp.push({i:'➕',k:'Suppléments',base:[],extra:exSuC});
    const suffix = composerState.viandes.length>1?' Maxi':' Simple';
    const name = typeLabel + suffix + ' Personnalisé';
    cart.push({ id:'composed_'+Date.now(), qty:1, custom:{...composerState}, price, label, baseLabel, extrasLabel, comp, name, emoji:'🌮' });
    saveCart(); updateCartUI(); pulseBadge();
    showToast(typeLabel + suffix + ' ajouté ! 🎉');
  });
}

function fillComposerOptions() {
  $('comp-meats').innerHTML = VIANDES.map(v =>
    '<button class="composer-option'+(composerState.viandes.includes(v)?' selected':'')+'" data-val="'+v+'">🍗 '+v+'</button>').join('');
  $('comp-gratinages').innerHTML = GRATINAGES.map(g =>
    '<button class="composer-option'+(composerState.gratinage===g?' selected':'')+'" data-val="'+g+'">🧀 '+g+'</button>').join('');
  $('comp-crudites').innerHTML = CRUDITES.map(c =>
    '<button class="composer-option'+(composerState.crudites===c?' selected':'')+'" data-val="'+c+'">🥬 '+c+'</button>').join('');
  $('comp-sauces-multi').innerHTML = SAUCES.map(s =>
    '<button class="composer-option'+(composerState.sauces.includes(s)?' selected':'')+'" data-val="'+s+'">🥫 '+s+'</button>').join('');
  const compSauces = SAUCES.map(s=>'<button class="composer-option'+(composerState.extras.includes(s)?' selected':'')+'" data-val="'+s+'">🥫 '+s+'</button>').join('');
  const compViandes = VIANDES.map(v=>'<button class="composer-option'+(composerState.extras.includes(v)?' selected':'')+'" data-val="'+v+'">🍗 '+v+'</button>').join('');
  const compSupps = SUPPS_TACOS.map(x=>'<button class="composer-option'+(composerState.extras.includes(x.name)?' selected':'')+'" data-val="'+x.name+'">➕ '+x.name+'<span class="pill-price">+'+x.price.toFixed(2).replace('.',',')+'€</span></button>').join('');
  $('comp-extras').innerHTML =
    '<div class="extras-block"><label class="custom-label sm">🥫 Sauces en plus <span class="custom-badge">+0,50€</span></label><div class="composer-options">'+compSauces+'</div></div>'+
    '<div class="extras-block"><label class="custom-label sm">🍗 Viande en plus <span class="custom-badge">+1,50€</span></label><div class="composer-options">'+compViandes+'</div></div>'+
    '<div class="extras-block"><label class="custom-label sm">➕ Suppléments</label><div class="composer-options">'+compSupps+'</div></div>';
  $('comp-drink-group').innerHTML = DRINKS.map(d =>
    '<button class="composer-option'+(composerState.boisson===d?' selected':'')+'" data-val="'+d+'">🥤 '+d+'</button>').join('');
}

function getComposerExtrasPrice(name){
  if(SAUCES.includes(name))return 0.50;
  if(VIANDES.includes(name))return 1.50;
  const s=SUPPS_TACOS.find(x=>x.name===name);
  return s?s.price:0;
}
function getComposerPrice() {
  const prices = { tacos:{1:7,2:10.90}, gratine:{1:8.90,2:12.90}, roule:{1:10.90,2:12.90}, bol:{1:8.90,2:8.90} };
  const base = (prices[composerState.type]&&prices[composerState.type][viandeCount])||7;
  const extrasTotal = composerState.extras.reduce((sum,name)=>sum+getComposerExtrasPrice(name),0);
  return base + extrasTotal + (composerState.menu?2:0);
}

function updateComposerPrice() {
  const p = getComposerPrice();
  $('composer-total').textContent = fmt(p);
  $('composer-btn-price').textContent = fmt(p);
  $('composer-price-badge').textContent = fmt(p);
}

function updateComposerVisual() {
  const stage = $('composer-stage');
  stage.querySelectorAll('.composer-layer,.composer-base-layer,.composer-ingredient').forEach(l=>l.remove());

  const items = [];
  const emoji = composerState.type === 'gratine' ? '🧀' :
               composerState.type === 'roule' ? '🌯' :
               composerState.type === 'bol' ? '🥙' : '🌮';
  const name = composerState.type === 'gratine' ? 'Tacos Gratiné' :
               composerState.type === 'roule' ? 'Roulé Gratiné' :
               composerState.type === 'bol' ? 'Bol Gratiné' : 'Tacos';

  if ((composerState.type === 'gratine' || composerState.type === 'roule' || composerState.type === 'bol') && composerState.gratinage) {
    items.push({em:'🧀', txt:'Gratiné '+composerState.gratinage});
  }
  if (composerState.viandes.length) items.push({em:'🍖', txt:composerState.viandes.join(' + ')});
  if (composerState.crudites) items.push({em:'🥬', txt:composerState.crudites});
  if (composerState.sauces.length) items.push({em:'🥫', txt:'Sauces : '+composerState.sauces.join(' + ')});
  if (composerState.menu && composerState.boisson) items.push({em:'🍟', txt:'Menu : '+composerState.boisson});
  if (composerState.extras.length) items.push({em:'➕', txt:composerState.extras.join(', ')});

  items.forEach((it,i)=>{
    const row = document.createElement('div');
    row.className = 'composer-ingredient';
    row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px;font-size:0.85rem;color:var(--text);'+
      'animation: fadeInRow 0.3s ease both;animation-delay:'+(i*0.06)+'s;';
    row.innerHTML = '<span style="font-size:1.1rem;">'+it.em+'</span><span>'+it.txt+'</span>';
    stage.appendChild(row);
  });

  $('composer-steam').innerHTML='';
}

const composerStyle = document.createElement('style');
composerStyle.textContent = '@keyframes fadeInRow{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}';
document.head.appendChild(composerStyle);

// ═══ PRODUCT MODAL ════════════════════════════════════════════
function initProductModal() {
  $('custom-overlay').addEventListener('click', closeModal);
  $('custom-back').addEventListener('click', closeModal);
  $('custom-qty-minus').addEventListener('click', ()=>{if(editQty>1){editQty--;$('custom-qty-val').textContent=editQty;updatePrice();}});
  $('custom-qty-plus').addEventListener('click', ()=>{editQty++;$('custom-qty-val').textContent=editQty;updatePrice();});
  $('custom-add-btn').addEventListener('click', confirmProduct);
}

function openModal(itemId, existingCartItem) {
  const item = MENU.find(m=>m.id===itemId);
  if(!item)return;
  editing=item; editQty=existingCartItem?existingCartItem.qty:1;
  $('custom-qty-val').textContent=editQty;
  const c=item.custom||{};

  if(existingCartItem&&existingCartItem.custom){editState={...existingCartItem.custom};}
  else{
    editState={extras:[]};
    if(c.viandes){editState.nbViandes=c.viandes.min||1;editState.viandes=[];for(let i=0;i<editState.nbViandes;i++){editState.viandes.push(c.viandes.list[i]);}}
    if(c.gratinage)editState.gratinage=c.gratinage.value||c.gratinage.list[0];
    if(c.sauces){editState.sauceCount=c.sauces.count||2;editState.sauces=[c.sauces.list[0]];if(c.sauces.count>1)editState.sauces.push(c.sauces.list[1]||c.sauces.list[0]);}
    if(c.accompagnement)editState.accompagnement=Array.isArray(c.accompagnement)?c.accompagnement[0]:c.accompagnement;
    if(c.boissonMenu)editState.boissonMenu=c.boissonMenu[0];
    if(c.burgerChoice)editState.burgerChoice=c.burgerChoice[0];
    if(c.burger2Choice)editState.burger2Choice=c.burger2Choice[0];
    if(c.naanChoice)editState.naanChoice=c.naanChoice[0];
    if(c.viandeChoice){const mx=c.viandeMax||1;const free=c.viandeChoice.filter(v=>!v.price);const src=free.length>=mx?free:c.viandeChoice;editState.viandeChoice=src.slice(0,mx).map(v=>v.name);}
    if(c.portion)editState.portion=c.portion[0].name;
    if(c.nappage)editState.nappage=c.nappage[0];
    if(c.saveurChoice)editState.saveurChoice=c.saveurChoice[0];
    if(c.pain)editState.pain=c.pain[0];
    if(c.condiments)editState.condiments=[...(c.condiments.default||c.condiments.list)];
    if(c.plat)editState.plat=c.plat[0];
    if(c.crudites)editState.crudites='Salade+Tomates+Oignons';
    if(c.menu){editState.menu=false;editState.boissonMenu=DRINKS[0];}
  }

  $('custom-title').textContent=item.emoji+' '+item.name;
  $('custom-add-btn').textContent=existingCartItem?'Modifier':'Ajouter au panier';
  // Show product description in modal header area
  const descEl = document.getElementById('custom-item-desc');
  if(descEl && item.desc) { descEl.textContent = item.desc; descEl.style.display = ''; }
  else if(descEl) { descEl.style.display = 'none'; }
  buildModalHTML(c);
  updatePrice();
  $('custom-modal').classList.add('open');$('custom-overlay').classList.add('open');
  lockScroll();

  setTimeout(()=>{
    // Pre-select toggles
    $('custom-body').querySelectorAll('.toggle-btn').forEach(btn=>{
      const k=btn.dataset.key,v=btn.dataset.val;
      let active=false;
      if(k==='crudites')active=editState.crudites===v;
      else if(k==='nbViandes')active=editState.nbViandes===parseInt(v);
      else active=editState[k]===v;
      btn.classList.toggle('active',active);
    });
    // Sauces (multi)
    $('custom-body').querySelectorAll('.sauce-pill[data-key="sauces"]').forEach(p=>{
      p.classList.toggle('active',(editState.sauces||[]).includes(p.dataset.val));
    });
    // Extras
    $('custom-body').querySelectorAll('.sauce-pill[data-key="extras"]').forEach(p=>{
      p.classList.toggle('active',(editState.extras||[]).includes(p.dataset.val));
    });
    // Viandes
    updateViandePills();
    // Accompagnement
    $('custom-body').querySelectorAll('.sauce-pill[data-key="accompagnement"]').forEach(p=>{
      p.classList.toggle('active',editState.accompagnement===p.dataset.val);
    });
    // Gratinage
    $('custom-body').querySelectorAll('.sauce-pill[data-key="gratinage"]').forEach(p=>{
      p.classList.toggle('active',editState.gratinage===p.dataset.val);
    });
    // Menu toggle visibility
    const dg=$('drink-group');if(dg)dg.hidden=!editState.menu;
    // Boisson menu
    $('custom-body').querySelectorAll('.sauce-pill[data-key="boissonMenu"]').forEach(p=>{
      p.classList.toggle('active',editState.boissonMenu===p.dataset.val);
    });
    // Plat
    $('custom-body').querySelectorAll('.sauce-pill[data-key="plat"]').forEach(p=>{
      p.classList.toggle('active',editState.plat===p.dataset.val);
    });
    // Pain
    $('custom-body').querySelectorAll('.sauce-pill[data-key="pain"]').forEach(p=>{
      p.classList.toggle('active',editState.pain===p.dataset.val);
    });
    // Condiments (multi + Sans condiment)
    $('custom-body').querySelectorAll('.sauce-pill[data-key="condiments"]').forEach(p=>{
      if(p.dataset.val==='Sans condiment')p.classList.toggle('active',(editState.condiments||[]).length===0);
      else p.classList.toggle('active',(editState.condiments||[]).includes(p.dataset.val));
    });
    // Burger / Naan / Portion / Nappage / Saveur au choix (single-select)
    ['burgerChoice','burger2Choice','naanChoice','portion','nappage','saveurChoice'].forEach(k=>{
      $('custom-body').querySelectorAll('.sauce-pill[data-key="'+k+'"]').forEach(p=>{
        p.classList.toggle('active',editState[k]===p.dataset.val);
      });
    });
    // Viande au choix (multi)
    $('custom-body').querySelectorAll('.sauce-pill[data-key="viandeChoice"]').forEach(p=>{
      p.classList.toggle('active',(editState.viandeChoice||[]).includes(p.dataset.val));
    });
  },50);
}

function buildModalHTML(c) {
  let h='';
  // Burger au choix (formules)
  if(c.burgerChoice){h+='<div class="custom-group"><label class="custom-label">🍔 Burger au choix</label><div class="sauce-grid">'+c.burgerChoice.map(v=>'<button class="sauce-pill" data-key="burgerChoice" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // 2ème burger au choix (Duo)
  if(c.burger2Choice){h+='<div class="custom-group"><label class="custom-label">🍔 2ème burger au choix</label><div class="sauce-grid">'+c.burger2Choice.map(v=>'<button class="sauce-pill" data-key="burger2Choice" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Naan au choix (formules)
  if(c.naanChoice){h+='<div class="custom-group"><label class="custom-label">🌯 Naan au choix</label><div class="sauce-grid">'+c.naanChoice.map(v=>'<button class="sauce-pill" data-key="naanChoice" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Viande au choix (prix par item)
  if(c.viandeChoice){const mx=c.viandeMax||1;h+='<div class="custom-group"><label class="custom-label">🍖 Viande au choix'+(mx>1?' <span class="custom-hint">('+mx+' au choix)</span>':'')+'</label><div class="sauce-grid">'+c.viandeChoice.map(v=>'<button class="sauce-pill multi" data-key="viandeChoice" data-val="'+v.name+'">'+v.name+(v.price>0?'<span class="pill-price">+'+v.price.toFixed(2).replace('.',',')+'€</span>':'')+'</button>').join('')+'</div></div>';}
  // Portion (tex mex, prix par taille)
  if(c.portion){h+='<div class="custom-group"><label class="custom-label">🍽️ Portion</label><div class="sauce-grid">'+c.portion.map(v=>'<button class="sauce-pill" data-key="portion" data-val="'+v.name+'">'+v.name+(v.price>0?'<span class="pill-price">+'+v.price.toFixed(2).replace('.',',')+'€</span>':'')+'</button>').join('')+'</div></div>';}
  // Nappage (milkshake)
  if(c.nappage){h+='<div class="custom-group"><label class="custom-label">🍫 Nappage</label><div class="sauce-grid">'+c.nappage.map(v=>'<button class="sauce-pill" data-key="nappage" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Saveur (milkshake)
  if(c.saveurChoice){h+='<div class="custom-group"><label class="custom-label">🥤 Saveur</label><div class="sauce-grid">'+c.saveurChoice.map(v=>'<button class="sauce-pill" data-key="saveurChoice" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Gratinage
  if(c.gratinage){h+='<div class="custom-group"><label class="custom-label">🧀 Gratinage</label><div class="sauce-grid">'+c.gratinage.list.map(g=>'<button class="sauce-pill" data-key="gratinage" data-val="'+g+'">'+g+'</button>').join('')+'</div></div>';}
  // Viandes
  if(c.viandes&&c.viandes.max>c.viandes.min){const p=c.viandes.prices||[];h+='<div class="custom-group"><label class="custom-label">🍖 Nombre de viandes</label><div class="toggle-row">'+Array.from({length:c.viandes.max-c.viandes.min+1},(_,i)=>i+c.viandes.min).map(n=>'<button class="toggle-btn" data-key="nbViandes" data-val="'+n+'">'+n+' viande'+(n>1?'s':'')+(p[n-1]?' <small>'+fmt(p[n-1])+'</small>':'')+'</button>').join('')+'</div></div>';}
  if(c.viandes){
    const vmin=c.viandes.min||1,vmax=c.viandes.max||1;
    const title=vmin===vmax?'🍖 '+(vmin===1?'Choisissez votre viande':'Choisissez vos '+vmin+' viandes'):'🍖 Viandes <span id="vhint" style="color:var(--rojo-light);font-weight:700;">('+(editState.nbViandes||vmin)+'/'+vmax+')</span>';
    const subtitle='<p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px;">'+(vmin===vmax?(vmin===1?'Sélectionnez 1 viande':'Sélectionnez '+vmin+' viandes'):'Cliquez pour choisir')+'</p>';
    h+='<div class="custom-group"><label class="custom-label">'+title+'</label>'+subtitle+'<div class="sauce-grid viande-grid">'+c.viandes.list.map(v=>'<button class="sauce-pill multi" data-key="viandes" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';
  }
  // Accompagnement
  if(c.accompagnement){const alist=Array.isArray(c.accompagnement)?c.accompagnement:[c.accompagnement];h+='<div class="custom-group"><label class="custom-label">🍟 Accompagnement</label><div class="sauce-grid">'+alist.map(v=>'<button class="sauce-pill" data-key="accompagnement" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Crudités
  if(c.crudites){h+='<div class="custom-group"><label class="custom-label">🥬 Crudités</label><div class="sauce-grid">'+CRUDITES.map(v=>'<button class="sauce-pill" data-key="crudites" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Pain (naan/sandwichs) — single-select
  if(c.pain){h+='<div class="custom-group"><label class="custom-label">🫓 Pain</label><div class="sauce-grid">'+c.pain.map(v=>'<button class="sauce-pill" data-key="pain" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Condiments (multi, max) + "Sans condiment"
  if(c.condiments){const mx=c.condiments.max||5;h+='<div class="custom-group"><label class="custom-label">🥗 Condiments <span class="custom-hint">('+mx+' max)</span></label><div class="sauce-grid">'+c.condiments.list.map(v=>'<button class="sauce-pill multi" data-key="condiments" data-val="'+v+'">'+v+'</button>').join('')+'<button class="sauce-pill multi" data-key="condiments" data-val="Sans condiment">🚫 Sans condiment</button></div></div>';}
  // Menu toggle (burgers, sandwichs)
  if(c.menu){h+='<div class="custom-group"><label class="custom-label">🍟 En Menu ? <span class="custom-badge">+'+fmt(c.menu)+' = frites + boisson</span></label><div class="toggle-row"><button class="toggle-btn" data-key="menu" data-val="non">Non</button><button class="toggle-btn" data-key="menu" data-val="oui">Oui</button></div><div class="custom-group" id="drink-group" hidden><label class="custom-label">🥤 Boisson</label><div class="sauce-grid">'+DRINKS.map(d=>'<button class="sauce-pill" data-key="boissonMenu" data-val="'+d+'">'+d+'</button>').join('')+'</div></div></div>';}
  // Plat (enfant) — avant les sauces
  if(c.plat){h+='<div class="custom-group"><label class="custom-label">🍽️ Plat</label><div class="toggle-row">'+c.plat.map(v=>'<button class="toggle-btn" data-key="plat" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
  // Sauces (multi-count)
  if(c.sauces){h+='<div class="custom-group"><label class="custom-label">🥫 Sauces <span class="custom-hint">('+(c.sauces.count||2)+' gratuites)</span></label><div class="sauce-grid">'+c.sauces.list.map(s=>'<button class="sauce-pill multi" data-key="sauces" data-val="'+s+'">'+s+'</button>').join('')+'</div></div>';}
  // Boisson menu standalone (only for items without menu toggle, like tacos menus)
  if(c.boissonMenu&&!c.menu){h+='<div class="custom-group"><label class="custom-label">🥤 Boisson</label><div class="sauce-grid">'+c.boissonMenu.map(d=>'<button class="sauce-pill" data-key="boissonMenu" data-val="'+d+'">'+d+'</button>').join('')+'</div></div>';}
  // Extras / Suppléments (toujours en dernier)
  const xc=c.extrasConfig;
  if(xc && (xc.sauces || xc.viandes || (xc.supps&&xc.supps.length))){
    let e='<div class="extras-head"><span class="extras-title">✨ Extras</span><span class="extras-note">Optionnel · en supplément</span></div>';
    if(xc.sauces){e+='<div class="extras-block"><label class="custom-label sm">🥫 Sauces en plus <span class="custom-badge">+0,50€</span></label><div class="sauce-grid">'+xc.sauceList.map(s=>'<button class="sauce-pill multi" data-key="extras" data-val="'+s+'">'+s+'</button>').join('')+'</div></div>';}
    if(xc.viandes){e+='<div class="extras-block"><label class="custom-label sm">🍗 Viande en plus <span class="custom-badge">+1,50€</span></label><div class="sauce-grid">'+VIANDES.map(v=>'<button class="sauce-pill multi" data-key="extras" data-val="'+v+'">'+v+'</button>').join('')+'</div></div>';}
    if(xc.supps&&xc.supps.length){e+='<div class="extras-block"><label class="custom-label sm">➕ Suppléments</label><div class="sauce-grid">'+xc.supps.map(x=>'<button class="sauce-pill multi" data-key="extras" data-val="'+x.name+'">'+x.name+'<span class="pill-price">+'+x.price.toFixed(2).replace('.',',')+'€</span></button>').join('')+'</div></div>';}
    h+='<div class="custom-group extras-group">'+e+'</div>';
  }
  // No options
  const hasOpts=c.viandes||c.sauces||c.gratinage||c.accompagnement||c.crudites||c.plat||c.boissonMenu||c.menu||c.extrasConfig||c.pain||c.condiments||c.burgerChoice||c.burger2Choice||c.naanChoice||c.viandeChoice||c.portion||c.nappage||c.saveurChoice;
  if(!hasOpts){h+='<div class="custom-group" style="text-align:center;border-bottom:0"><p style="color:var(--text-dim);font-size:0.9rem;">'+(editing.desc||'')+'</p></div>';}
  $('custom-body').innerHTML=h;

  // Bind toggle buttons
  $('custom-body').querySelectorAll('.toggle-btn').forEach(btn=>{
    btn.addEventListener('click',(ev)=>{ev.stopPropagation();
      const k=btn.dataset.key,v=btn.dataset.val;
      btn.parentElement.querySelectorAll('.toggle-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      if(k==='plat')editState.plat=v;
      else if(k==='menu'){editState.menu=v==='oui';const dg=$('drink-group');if(dg)dg.hidden=!editState.menu;}
      else if(k==='nbViandes'){editState.nbViandes=parseInt(v);const list=editing.custom?.viandes?.list||VIANDES;while(editState.viandes.length<editState.nbViandes){const a=list.find(x=>!editState.viandes.includes(x));if(a)editState.viandes.push(a);else break;}editState.viandes=editState.viandes.slice(0,editState.nbViandes);updateViandePills();const hv=$('vhint');if(hv)hv.textContent='('+editState.nbViandes+')';}
      updatePrice();
    });
  });

  // Single-select pills
  $('custom-body').querySelectorAll('.sauce-pill:not(.multi)').forEach(p=>{
    p.addEventListener('click',(ev)=>{ev.stopPropagation();
      const k=p.dataset.key,v=p.dataset.val;
      $('custom-body').querySelectorAll('.sauce-pill[data-key="'+k+'"]').forEach(x=>x.classList.remove('active'));
      p.classList.add('active');
      editState[k]=v;updatePrice();
    });
  });

  // Viandes (multi with max)
  $('custom-body').querySelectorAll('.sauce-pill[data-key="viandes"]').forEach(p=>{
    p.addEventListener('click',(ev)=>{ev.stopPropagation();
      const v=p.dataset.val,i=editState.viandes.indexOf(v);
      if(i>=0){editState.viandes.splice(i,1);if(editState.viandes.length===0){const list=editing.custom?.viandes?.list||VIANDES;const n=list.find(x=>x!==v);if(n)editState.viandes.push(n);}}
      else{if(editState.viandes.length>=editState.nbViandes)editState.viandes.shift();editState.viandes.push(v);}
      updateViandePills();updatePrice();
    });
  });

  // Sauces (multi with count limit)
  $('custom-body').querySelectorAll('.sauce-pill[data-key="sauces"]').forEach(p=>{
    p.addEventListener('click',(ev)=>{ev.stopPropagation();
      const v=p.dataset.val,i=(editState.sauces||[]).indexOf(v);
      if(i>=0){if(editState.sauces.length>1)editState.sauces.splice(i,1);}
      else{if(editState.sauces.length>=(editState.sauceCount||2))editState.sauces.shift();editState.sauces.push(v);}
      $('custom-body').querySelectorAll('.sauce-pill[data-key="sauces"]').forEach(x=>x.classList.toggle('active',(editState.sauces||[]).includes(x.dataset.val)));
      updatePrice();
    });
  });

  // Extras (multi, unlimited)
  $('custom-body').querySelectorAll('.sauce-pill[data-key="extras"]').forEach(p=>{
    p.addEventListener('click',(ev)=>{ev.stopPropagation();
      const v=p.dataset.val,i=(editState.extras||[]).indexOf(v);
      if(i>=0)editState.extras.splice(i,1);else editState.extras.push(v);
      p.classList.toggle('active');
      updatePrice();
    });
  });

  // Condiments (multi, max N, avec "Sans condiment")
  $('custom-body').querySelectorAll('.sauce-pill[data-key="condiments"]').forEach(p=>{
    p.addEventListener('click',(ev)=>{ev.stopPropagation();
      const v=p.dataset.val;const mx=(editing.custom&&editing.custom.condiments&&editing.custom.condiments.max)||5;
      if(!editState.condiments)editState.condiments=[];
      if(v==='Sans condiment'){editState.condiments=[];}
      else{const i=editState.condiments.indexOf(v);
        if(i>=0)editState.condiments.splice(i,1);
        else{if(editState.condiments.length>=mx)editState.condiments.shift();editState.condiments.push(v);}}
      $('custom-body').querySelectorAll('.sauce-pill[data-key="condiments"]').forEach(x=>{
        if(x.dataset.val==='Sans condiment')x.classList.toggle('active',editState.condiments.length===0);
        else x.classList.toggle('active',editState.condiments.includes(x.dataset.val));
      });
    });
  });

  // Viande au choix (multi, max = viandeMax, min 1)
  $('custom-body').querySelectorAll('.sauce-pill[data-key="viandeChoice"]').forEach(p=>{
    p.addEventListener('click',(ev)=>{ev.stopPropagation();
      const v=p.dataset.val;const mx=(editing.custom&&editing.custom.viandeMax)||1;
      if(!editState.viandeChoice)editState.viandeChoice=[];
      const i=editState.viandeChoice.indexOf(v);
      if(i>=0){if(editState.viandeChoice.length>1)editState.viandeChoice.splice(i,1);}
      else{if(editState.viandeChoice.length>=mx)editState.viandeChoice.shift();editState.viandeChoice.push(v);}
      $('custom-body').querySelectorAll('.sauce-pill[data-key="viandeChoice"]').forEach(x=>x.classList.toggle('active',editState.viandeChoice.includes(x.dataset.val)));
      updatePrice();
    });
  });
}

function updateViandePills(){
  $('custom-body').querySelectorAll('.sauce-pill[data-key="viandes"]').forEach(p=>{p.classList.toggle('active',(editState.viandes||[]).includes(p.dataset.val));});
}

function getExtraPrice(config, name){
  // Check if it's a sauce from the config's sauceList
  if(config.sauces && config.sauceList.includes(name)) return 0.50;
  // Check if it's a viande
  if(config.viandes && VIANDES.includes(name)) return 1.50;
  // Check in supps
  if(config.supps){const s=config.supps.find(x=>x.name===name);if(s)return s.price;}
  return 0;
}

function updatePrice(){
  if(!editing)return;
  const c=editing.custom||{};let p=editing.price;
  if(c.viandes?.prices){const i=(editState.nbViandes||1)-1;if(c.viandes.prices[i])p=c.viandes.prices[i];}
  if(c.menu&&editState.menu)p+=c.menu;
  if(c.viandeChoice&&editState.viandeChoice){editState.viandeChoice.forEach(nm=>{const v=c.viandeChoice.find(x=>x.name===nm);if(v&&v.price)p+=v.price;});}
  if(c.portion&&editState.portion){const v=c.portion.find(x=>x.name===editState.portion);if(v&&v.price)p+=v.price;}
  const xc=c.extrasConfig;
  const extrasTotal=xc?(editState.extras||[]).reduce((sum,name)=>sum+getExtraPrice(xc,name),0):0;
  p+=extrasTotal;
  $('custom-price').textContent=fmt(p*editQty);
}

function closeModal(){$('custom-modal').classList.remove('open');$('custom-overlay').classList.remove('open');unlockScroll();editing=null;editingCartIdx=-1;}

function confirmProduct(){
  if(!editing)return;
  const c=editing.custom||{};let p=editing.price;
  if(c.viandes?.prices){const i=(editState.nbViandes||1)-1;if(c.viandes.prices[i])p=c.viandes.prices[i];}
  if(c.menu&&editState.menu)p+=c.menu;
  if(c.viandeChoice&&editState.viandeChoice){editState.viandeChoice.forEach(nm=>{const v=c.viandeChoice.find(x=>x.name===nm);if(v&&v.price)p+=v.price;});}
  if(c.portion&&editState.portion){const v=c.portion.find(x=>x.name===editState.portion);if(v&&v.price)p+=v.price;}
  const xc=c.extrasConfig;
  const extrasTotal=xc?(editState.extras||[]).reduce((sum,name)=>sum+getExtraPrice(xc,name),0):0;
  p+=extrasTotal;

  let l='';
  if(c.gratinage&&editState.gratinage)l+='Gratiné '+editState.gratinage;
  if(editState.viandes?.length)l+=(l?' • ':'')+editState.viandes.join('+');
  if(c.accompagnement&&editState.accompagnement)l+=(l?' • ':'')+editState.accompagnement;
  if(c.crudites&&editState.crudites)l+=(l?' • ':'')+'Crudités: '+editState.crudites;
  if(c.burgerChoice&&editState.burgerChoice)l+=(l?' • ':'')+'Burger: '+editState.burgerChoice;
  if(c.burger2Choice&&editState.burger2Choice)l+=(l?' • ':'')+'Burger 2: '+editState.burger2Choice;
  if(c.naanChoice&&editState.naanChoice)l+=(l?' • ':'')+'Naan: '+editState.naanChoice;
  if(c.viandeChoice&&editState.viandeChoice&&editState.viandeChoice.length)l+=(l?' • ':'')+'Viande: '+editState.viandeChoice.join('+');
  if(c.portion&&editState.portion)l+=(l?' • ':'')+editState.portion;
  if(c.nappage&&editState.nappage)l+=(l?' • ':'')+'Nappage: '+editState.nappage;
  if(c.saveurChoice&&editState.saveurChoice)l+=(l?' • ':'')+'Saveur: '+editState.saveurChoice;
  if(c.pain&&editState.pain)l+=(l?' • ':'')+'Pain: '+editState.pain;
  if(c.condiments)l+=(l?' • ':'')+'Condiments: '+((editState.condiments&&editState.condiments.length)?editState.condiments.join('+'):'Sans');
  if(editState.sauces?.length)l+=(l?' • ':'')+'Sauces: '+editState.sauces.join('+');
  if(c.boissonMenu&&editState.boissonMenu)l+=(l?' • ':'')+'Boisson: '+editState.boissonMenu;
  if(c.plat&&editState.plat)l+=(l?' • ':'')+editState.plat;
  const baseLabel=l;
  const extrasLabel=editState.extras?.length?editState.extras.join(', '):'';
  if(extrasLabel)l+=(l?' • ':'')+'+'+extrasLabel;

  // Composants structures pour la fiche cuisine. Les extras sont ranges par
  // categorie (base = inclus, extra = supplement paye, affiche en orange).
  const exSauces=[],exViandes=[],exSupps=[];
  (editState.extras||[]).forEach(nm=>{
    if(xc&&xc.sauceList&&xc.sauceList.includes(nm))exSauces.push(nm);
    else if(VIANDES.includes(nm))exViandes.push(nm);
    else exSupps.push(nm);
  });
  const comp=[];
  if(c.menu&&editState.menu)comp.push({i:'🍟',k:'Menu',base:['Frites + boisson'],extra:[]});
  if(c.gratinage&&editState.gratinage)comp.push({i:'🧀',k:'Gratiné',base:[editState.gratinage],extra:[]});
  if((editState.viandes&&editState.viandes.length)||exViandes.length)comp.push({i:'🍖',k:'Viandes',base:editState.viandes||[],extra:exViandes});
  if(c.accompagnement&&editState.accompagnement)comp.push({i:'🍟',k:'Accomp.',base:[editState.accompagnement],extra:[]});
  if(c.crudites&&editState.crudites)comp.push({i:'🥬',k:'Crudités',base:[editState.crudites],extra:[]});
  if(c.burgerChoice&&editState.burgerChoice)comp.push({i:'🍔',k:'Burger',base:[editState.burgerChoice],extra:[]});
  if(c.burger2Choice&&editState.burger2Choice)comp.push({i:'🍔',k:'2ème burger',base:[editState.burger2Choice],extra:[]});
  if(c.naanChoice&&editState.naanChoice)comp.push({i:'🌯',k:'Naan',base:[editState.naanChoice],extra:[]});
  if(c.viandeChoice&&editState.viandeChoice&&editState.viandeChoice.length)comp.push({i:'🍖',k:'Viande',base:editState.viandeChoice,extra:[]});
  if(c.portion&&editState.portion)comp.push({i:'🍽️',k:'Portion',base:[editState.portion],extra:[]});
  if(c.nappage&&editState.nappage)comp.push({i:'🍫',k:'Nappage',base:[editState.nappage],extra:[]});
  if(c.saveurChoice&&editState.saveurChoice)comp.push({i:'🥤',k:'Saveur',base:[editState.saveurChoice],extra:[]});
  if(c.pain&&editState.pain)comp.push({i:'🫓',k:'Pain',base:[editState.pain],extra:[]});
  if(c.condiments)comp.push({i:'🥗',k:'Condiments',base:((editState.condiments&&editState.condiments.length)?editState.condiments:['Sans condiment']),extra:[]});
  if((editState.sauces&&editState.sauces.length)||exSauces.length)comp.push({i:'🥫',k:'Sauces',base:editState.sauces||[],extra:exSauces});
  if(c.boissonMenu&&editState.boissonMenu)comp.push({i:'🥤',k:'Boisson',base:[editState.boissonMenu],extra:[]});
  if(c.plat&&editState.plat)comp.push({i:'🍽️',k:'Plat',base:[editState.plat],extra:[]});
  if(exSupps.length)comp.push({i:'➕',k:'Suppléments',base:[],extra:exSupps});

  const wasEditing=editingCartIdx>=0;
  // Add "Menu" prefix to name if menu option selected
  const menuPrefix = (c.menu && editState.menu) ? 'Menu ' : '';
  const itemName = menuPrefix + (editing.name || editing.id);

  if(wasEditing){cart[editingCartIdx].custom={...editState};cart[editingCartIdx].price=p;cart[editingCartIdx].label=l;cart[editingCartIdx].baseLabel=baseLabel;cart[editingCartIdx].extrasLabel=extrasLabel;cart[editingCartIdx].comp=comp;cart[editingCartIdx].name=itemName;editingCartIdx=-1;}
  else{const ex=cart.find(ci=>ci.id===editing.id&&ci.label===l&&ci.price===p);if(ex){ex.qty+=editQty;ex.name=itemName;}else cart.push({id:editing.id,qty:editQty,custom:{...editState},price:p,label:l,baseLabel:baseLabel,extrasLabel:extrasLabel,comp:comp,emoji:editing.emoji,name:itemName});}
  saveCart();updateCartUI();renderMenu(activeCat);pulseBadge();closeModal();
  showToast(wasEditing ? (itemName+' modifié ✏️') : (itemName+' ajouté ! 🎉'));
  if(wasEditing)openCart();
}

function editCartItem(idx){
  const ci=cart[idx];
  if(ci.id.startsWith('composed_')){composerState={...ci.custom};updateComposerUIFromState();editingCartIdx=idx;closeCart();$('composer').scrollIntoView({behavior:'smooth'});return;}
  const item=MENU.find(m=>m.id===ci.id);if(!item?.custom)return;editingCartIdx=idx;closeCart();openModal(item.id,ci);
}

function updateComposerUIFromState(){
  $('comp-step-type').querySelectorAll('.composer-toggle').forEach(b=>{b.classList.toggle('active',b.dataset.val===composerState.type);});
  viandeCount=composerState.viandes.length;$('vc-count').textContent=viandeCount;
  maxViandes = (composerState.type === 'tacos' || composerState.type === 'gratine') ? 2 : 1;
  if (!composerState.sauces || !composerState.sauces.length) composerState.sauces = ['Ketchup','Mayo'];
  const showGratin=composerState.type==='gratine'||composerState.type==='roule'||composerState.type==='bol';
  $('comp-step-gratinage').style.display=showGratin?'':'none';
  $('meat-step-num').textContent=showGratin?'3':'2';
  $('crudites-step-num').textContent=showGratin?'4':'3';
  $('sauces-step-num').textContent=showGratin?'5':'4';
  $('menu-step-num').textContent=showGratin?'6':'5';
  $('extras-step-num').textContent=showGratin?'7':'6';
  fillComposerOptions();
  $('comp-drink-group').style.display=composerState.menu?'':'none';
  $('comp-menu-toggles').querySelectorAll('.composer-toggle').forEach(b=>{b.classList.toggle('active',b.dataset.val===(composerState.menu?'oui':'non'));});
  $('composer-badge').textContent=TYPE_NAMES[composerState.type];
  updateComposerVisual();updateComposerPrice();
}

// ═══ CART ═════════════════════════════════════════════════════
function updateCartUI(){
  const n=cart.reduce((s,c)=>s+c.qty,0),t=cart.reduce((s,c)=>s+c.price*c.qty,0);
  $('cart-count').textContent=n;
  if(n>0){$('cart-badge').hidden=false;}else{$('cart-badge').hidden=true;}
  if(!cart.length){$('cart-items').innerHTML='<p class="cart-empty">🛒<br>Votre panier est vide.</p>';$('cart-footer').hidden=true;$('cart-total-price').textContent='0,00€';}
  else{
    $('cart-items').innerHTML=cart.map((c,idx)=>{
      const m=c.id.startsWith('composed_')?{emoji:c.emoji||'🌮',name:c.name||'Tacos Personnalisé'}:MENU.find(i=>i.id===c.id);
      if(!m)return'';
      const canEdit=c.id.startsWith('composed_')||(m.custom&&Object.keys(m.custom).length>0);
      // Recap: ingredients et extras sur deux lignes distinctes (fallback label pour anciens articles)
      let opts='';
      if(c.baseLabel!==undefined||c.extrasLabel!==undefined){
        if(c.baseLabel)opts+='<p class="cart-item-opts">'+c.baseLabel+'</p>';
        if(c.extrasLabel)opts+='<p class="cart-item-extras">➕ Extras : '+c.extrasLabel+'</p>';
      }else if(c.label){opts+='<p class="cart-item-opts">'+c.label+'</p>';}
      return'<div class="cart-item"><span class="cart-item-emoji">'+m.emoji+'</span><div class="cart-item-info"><p class="cart-item-name">'+(c.name||m.name)+'</p>'+opts+'<p class="cart-item-price">'+fmt(c.price)+'/u</p></div><div class="cart-item-right"><div class="cart-item-actions">'+(canEdit?'<button class="cart-item-edit" onclick="editCartItem('+idx+')">✎</button>':'')+'<button class="cart-item-remove" style="margin-left:6px;" onclick="cartRemove('+idx+')" title="Supprimer">✕</button></div><div class="cart-item-qty"><button class="qty-btn" onclick="cartQty('+idx+',-1)">−</button><span class="qty-val">'+c.qty+'</span><button class="qty-btn" onclick="cartQty('+idx+',1)">+</button></div><span class="cart-item-total">'+fmt(c.price*c.qty)+'</span></div></div>';
    }).join('');
    $('cart-footer').hidden=false;$('cart-total-price').textContent=fmt(t);
  }
}

function cartQty(idx,d){if(idx<0||idx>=cart.length)return;cart[idx].qty+=d;if(cart[idx].qty<=0)cart.splice(idx,1);saveCart();updateCartUI();}
function cartRemove(idx){cart.splice(idx,1);saveCart();updateCartUI();}
function pulseBadge(){$('cart-badge').classList.remove('pulse');void $('cart-badge').offsetWidth;$('cart-badge').classList.add('pulse');}

function initCart(){
  $('cart-badge').addEventListener('click',()=>$('cart-panel').classList.contains('open')?closeCart():openCart());
  $('cart-overlay').addEventListener('click',closeCart);
  $('cart-close').addEventListener('click',closeCart);
  $('cart-order-btn').addEventListener('click',()=>{closeCart();openCheckout();});
  $('cart-clear-btn').addEventListener('click',()=>{cart=[];saveCart();updateCartUI();closeCart();});
  initCheckout();
}
// Verrou de scroll robuste (iOS Safari ignore overflow:hidden sur body)
let _scrollLockY=0;
function lockScroll(){
  if(document.body.classList.contains('scroll-locked'))return;
  _scrollLockY=window.scrollY||window.pageYOffset||0;
  document.body.style.top=(-_scrollLockY)+'px';
  document.body.classList.add('scroll-locked');
}
function unlockScroll(){
  if(!document.body.classList.contains('scroll-locked'))return;
  document.body.classList.remove('scroll-locked');
  document.body.style.top='';
  window.scrollTo(0,_scrollLockY);
}
function openCart(){$('cart-panel').classList.add('open');$('cart-overlay').classList.add('open');lockScroll();}
function closeCart(){$('cart-panel').classList.remove('open');$('cart-overlay').classList.remove('open');unlockScroll();}

// ═══ CHECKOUT ═════════════════════════════════════════════════
let orderMode='emporter';
function initCheckout(){
  $('checkout-back').addEventListener('click',closeCheckout);
  $('checkout-overlay').addEventListener('click',closeCheckout);
  $('checkout-pay-btn').addEventListener('click',startPayment);
  $('order-mode-row').addEventListener('click',(ev)=>{
    const btn=ev.target.closest('.toggle-btn');if(!btn)return;
    orderMode=btn.dataset.val;
    $('order-mode-row').querySelectorAll('.toggle-btn').forEach(b=>b.classList.toggle('active',b.dataset.val===orderMode));
  });
  const saved=JSON.parse(localStorage.getItem('bikersfood_customer')||'{}');
  if(saved.phone)$('checkout-phone').value=saved.phone;
  if(saved.name)$('checkout-name').value=saved.name;
}

function openCheckout(){if(!cart.length){showToast('Panier vide !','error');return;}refreshCheckoutPrice();$('checkout-modal').classList.add('open');$('checkout-overlay').classList.add('open');lockScroll();}
function closeCheckout(){$('checkout-modal').classList.remove('open');$('checkout-overlay').classList.remove('open');unlockScroll();}

function refreshCheckoutPrice(){
  const total=cart.reduce((s,c)=>s+c.price*c.qty,0);
  const ti=cart.reduce((s,c)=>s+c.qty,0),eta=Math.max(10,Math.min(35,ti*2+8));
  $('checkout-total').textContent=fmt(total);
  $('checkout-btn-total').textContent=fmt(total);
  $('checkout-eta').textContent='~'+eta+' min';
}

async function startPayment(){
  const phone=$('checkout-phone').value.trim();
  if(!phone||phone.length<8){showToast('Téléphone requis','error');return;}
  if($('checkout-remember').checked){localStorage.setItem('bikersfood_customer',JSON.stringify({phone,name:$('checkout-name').value.trim()}));}
  $('checkout-pay-btn').disabled=true;$('checkout-pay-btn').textContent='⏳ Préparation...';
  try{
    const res=await fetch('/api/create-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cart:cart.map(c=>({name:c.name||(MENU.find(m=>m.id===c.id)?.name||'Article'),label:c.label,comp:c.comp||[],extras:c.extrasLabel||'',price:c.price,qty:c.qty})),phone,name:$('checkout-name').value.trim(),deliveryType:orderMode,deliveryAddress:'',deliveryFee:0})});
    const data=await res.json();
    if(data.url){
      // Save order info for confirmation page fallback
      localStorage.setItem('bikersfood_last_order', JSON.stringify({
        orderNumber: data.orderNumber,
        prepMinutes: data.prepMinutes,
        items: cart.map(c=>({name:c.name||(MENU.find(m=>m.id===c.id)?.name||'Article'),label:c.label,price:c.price,qty:c.qty})),
        deliveryType: orderMode, deliveryAddress: '',
        status: 'paid'
      }));
      // Le panier n'est PAS vidé ici : il reste tant que le paiement n'est
      // pas confirme (si l'utilisateur annule sur Stripe et revient).
      // Il sera vide sur la page de confirmation apres paiement reussi.
      closeCheckout();window.location.href=data.url;
    }
    else throw new Error(data.error||'Erreur');
  }catch(err){showToast('Erreur: '+err.message,'error');$('checkout-pay-btn').disabled=false;$('checkout-pay-btn').innerHTML='💳 Payer <span>'+$('checkout-btn-total').textContent+'</span>';}
}

// ═══ TRACKING ═════════════════════════════════════════════════
function openTrack(){$('track-modal').classList.add('open');$('track-overlay').classList.add('open');lockScroll();const saved=JSON.parse(localStorage.getItem('bikersfood_customer')||'{}');if(saved.phone)$('track-phone').value=saved.phone;}
$('track-overlay').addEventListener('click',()=>{$('track-modal').classList.remove('open');$('track-overlay').classList.remove('open');unlockScroll();});
$('track-back').addEventListener('click',()=>{$('track-modal').classList.remove('open');$('track-overlay').classList.remove('open');unlockScroll();});
$('track-btn').addEventListener('click',async()=>{
  const phone=$('track-phone').value.trim();if(!phone){showToast('Téléphone requis','error');return;}
  const $res=$('track-result');$res.innerHTML='<p style="color:var(--text-dim);text-align:center;">🔍 Recherche...</p>';
  try{
    const r=await fetch('/api/orders?phone='+encodeURIComponent(phone));const orders=await r.json();
    if(!orders.length){$res.innerHTML='<p style="text-align:center;color:var(--text-dim);">Aucune commande trouvée.</p>';return;}
    const st={pending:'⏳ En attente',paid:'✅ Payée',preparing:'👨‍🍳 En préparation',ready:'🎉 Prête !',picked_up:'🏃 Récupérée'};
    const sc={pending:'status-paid',paid:'status-paid',preparing:'status-preparing',ready:'status-ready',picked_up:''};
    $res.innerHTML=orders.map(o=>'<div class="track-order-card"><div class="track-order-header"><span class="track-order-num">#'+o.orderNumber+'</span><span class="track-status '+(sc[o.status]||'')+'">'+(st[o.status]||o.status)+'</span></div><div class="track-items">'+(o.items||[]).map(i=>i.name+' x'+(i.qty||1)).join(', ')+'</div><div class="track-time">🕐 '+(o.deliveryType==='surplace'?'Sur place':'À emporter')+' · '+new Date(o.createdAt).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})+'</div></div>').join('');
  }catch(e){$res.innerHTML='<p style="text-align:center;color:var(--rojo);">Erreur</p>';}
});

// ═══ TOAST ════════════════════════════════════════════════════
function showToast(msg,type='success'){
  const toast=document.createElement('div');toast.className='toast '+type;toast.textContent=msg;document.body.appendChild(toast);
  setTimeout(()=>{toast.style.opacity='0';toast.style.transform='translateX(120%)';toast.style.transition='all 0.4s';},2500);
  setTimeout(()=>toast.remove(),3000);
}

// ═══ PARTICLES ════════════════════════════════════════════════
function initParticles(){
  const canvas=$('particles-canvas'),ctx=canvas.getContext('2d');let particles=[];
  function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}resize();window.addEventListener('resize',resize);
  class Particle{constructor(){this.reset();}
    reset(){this.x=Math.random()*canvas.width;this.y=canvas.height+20;this.size=Math.random()*2+0.5;this.speedY=-(Math.random()*0.4+0.15);this.speedX=(Math.random()-0.5)*0.3;this.opacity=Math.random()*0.5+0.15;this.life=0;this.maxLife=Math.random()*300+200;const cols=[[196,30,58],[232,97,44],[212,168,67],[232,69,92],[240,128,74]];this.color=cols[Math.floor(Math.random()*cols.length)];}
    update(){this.y+=this.speedY;this.x+=this.speedX+Math.sin(this.life*0.02)*0.2;this.life++;this.opacity=Math.max(0,this.opacity-0.001);if(this.life>this.maxLife||this.y<-20||this.opacity<=0)this.reset();}
    draw(c){c.beginPath();c.arc(this.x,this.y,this.size,0,Math.PI*2);c.fillStyle='rgba('+this.color.join(',')+','+this.opacity+')';c.fill();c.beginPath();c.arc(this.x,this.y,this.size*3,0,Math.PI*2);c.fillStyle='rgba('+this.color.join(',')+','+(this.opacity*0.15)+')';c.fill();}
  }
  for(let i=0;i<60;i++){const p=new Particle();p.y=Math.random()*canvas.height;p.life=Math.random()*p.maxLife;particles.push(p);}
  (function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw(ctx);});requestAnimationFrame(animate);})();
}

// ═══ REVEAL ═══════════════════════════════════════════════════
function initReveal(){const obs=new IntersectionObserver((e)=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');obs.unobserve(en.target);}});},{threshold:0.15,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));}

// ═══ COUNTERS ═════════════════════════════════════════════════
function initCounters(){const obs=new IntersectionObserver((e)=>{e.forEach(en=>{if(!en.isIntersecting)return;const el=en.target,target=parseFloat(el.dataset.count),suffix=el.dataset.suffix||'',decimals=parseInt(el.dataset.decimals||'0'),start=performance.now();function upd(now){const prog=Math.min((now-start)/2000,1),eased=1-Math.pow(1-prog,3);el.textContent=(target*eased).toFixed(decimals)+suffix;if(prog<1)requestAnimationFrame(upd);}requestAnimationFrame(upd);obs.unobserve(el);});},{threshold:0.5});document.querySelectorAll('.stat-num').forEach(el=>obs.observe(el));}

// ═══ KEYBOARD ═════════════════════════════════════════════════
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeCart();closeCheckout();$('track-modal').classList.remove('open');$('track-overlay').classList.remove('open');unlockScroll();}});

// ═══ CSS ANIM ═════════════════════════════════════════════════
const cs=document.createElement('style');cs.textContent='@keyframes cardIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';document.head.appendChild(cs);
