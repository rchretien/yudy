import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (file) => readFile(new URL(file, import.meta.url), "utf8");

test("la page expose le contenu et les parcours essentiels", async () => {
  const html = await read("index.html");

  assert.match(html, /<html lang="fr">/);
  assert.match(html, /Transformer les doutes en direction/);
  assert.match(html, /Coaching en transition &amp; épanouissement professionnel/);
  assert.match(html, /Je fais bouger les lignes quand tout semble figé/);
  assert.match(html, /YUDY s'inspire de l'arabe/);
  assert.match(html, /éclairer, de faire apparaître une lueur/);
  assert.match(html, /id="chemin"/);
  assert.match(html, /id="accompagnements"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /0494 24 66 72/);
  assert.match(html, /ici\.yudy@gmail\.com/);
  assert.match(html, /changer de\s+carrière à Liège/);
  assert.match(html, /Faire le point sur son avenir professionnel/);
  assert.match(html, /Des espaces doux de transformation/);
  assert.match(html, /@ici\.yudy/);
  assert.match(html, /Ce qui devient/);
  assert.match(html, /séances maximum/);
  assert.match(html, /mois selon votre rythme/);
  assert.match(html, /class="service-details"/);
  assert.match(html, /Navigation du pied de page/);
  assert.equal((html.match(/class="statement-group"/g) || []).length, 2);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /src="yudy\.png"/);
  assert.match(html, /src="sihem\.jpeg"/);
  assert.match(html, /alt="Portrait de Sihem Dalah"/);
  assert.match(html, /rel="icon" href="yudy\.png"/);
  assert.doesNotMatch(html, /<div class="glow-core">\s*<span>Y<\/span>/);
  assert.doesNotMatch(html, /portrait<br>à venir/);
  assert.doesNotMatch(html, /Tu sens/);
});

test("les styles et interactions restent accessibles", async () => {
  const [html, css, script] = await Promise.all([
    read("index.html"),
    read("styles.css"),
    read("script.js"),
  ]);

  assert.match(html, /aria-controls="navigation"/);
  assert.match(html, /class="reveal"/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /contact-form (input|textarea):focus-visible/);
  assert.match(css, /\.js \.reveal/);
  assert.match(css, /\.about-portrait[\s\S]*?max-width: 25rem/);
  assert.match(css, /--green: #637b54/);
  assert.match(css, /--green-dark: #536b46/);
  assert.match(css, /--brand: "Monea Alegante"/);
  assert.match(css, /--sans: "MADE Tommy"/);
  assert.match(css, /\.brand img[\s\S]*?object-fit: contain/);
  assert.match(css, /\.proof-band/);
  assert.match(css, /\.service-details/);
  assert.match(css, /@keyframes glow-breathe/);
  assert.match(css, /\.journey-step\.is-visible::before/);
  assert.match(css, /scroll-padding-top: 6rem/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /event\.key === "Escape"/);
  assert.match(script, /toggleAttribute\("inert"/);
  assert.match(script, /addEventListener\("resize"/);
});
