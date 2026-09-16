import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (file) => readFile(new URL(file, import.meta.url), "utf8");

test("la page expose le contenu et les parcours essentiels", async () => {
  const html = await read("index.html");
  const about = await read("a-propos.html");
  const services = await read("accompagnements.html");

  assert.match(html, /<html lang="fr">/);
  assert.match(html, /Transformer les doutes en direction/);
  assert.match(html, /Coaching en transition professionnelle pour femmes/);
  assert.match(html, /Pour les femmes · À Liège &amp; en ligne/);
  assert.match(html, /Nous nommons ce qui vous retient aujourd'hui/);
  assert.match(html, /Réserver une séance - 80 € TTC/);
  assert.match(html, /mobile-booking-cta/);
  assert.match(html, /https:\/\/www\.instagram\.com\/ici\.yudy\//);
  assert.match(html, /id="icon-instagram"/);
  assert.match(html, /id="icon-linkedin"/);
  assert.match(html, /class="contact-icon"/);
  assert.match(html, /class="nav-social"/);
  assert.match(html, /Ce qu'elles en disent/);
  assert.match(html, /class="testimonial-carousel/);
  assert.match(html, /Maroua · 1:1/);
  assert.match(html, /J’ai été écoutée avec bienveillance et orientée avec clarté/);
  assert.match(html, /Atelier YUDY/);
  assert.match(about, /YUDY s'inspire de l'arabe/);
  assert.match(about, /éclairer, de faire apparaître une lueur/);
  assert.match(about, /id="chemin"/);
  assert.match(services, /id="accompagnements"/);
  assert.match(services, /Retours d'expérience/);
  assert.match(services, /Trois formats selon votre besoin/);
  assert.match(services, /Sur demande/);
  assert.match(services, /Réserver une première séance individuelle/);
  assert.match(services, /Me contacter pour un collectif ou un atelier/);
  assert.doesNotMatch(services, /Accompagnements 1:1/);
  assert.match(services, /Florence · 1:1/);
  assert.match(services, /Mina · 1:1/);
  assert.doesNotMatch(services, /Maroua · 1:1/);
  assert.match(services, /Imane · 1:1/);
  assert.match(services, /Loubna · 1:1/);
  assert.match(services, /L’expérience a été bien au-delà/);
  assert.match(services, /approche véritablement holistique/);
  assert.equal((services.match(/class="service-proof-card reveal"/g) || []).length, 4);
  assert.match(html, /id="contact"/);
  assert.match(html, /0494 24 66 72/);
  assert.match(html, /ici\.yudy@gmail\.com/);
  assert.match(html, /Réserver sa place/);
  assert.match(html, /Et si nous échangions sur <em>ce qui cherche à naître&nbsp;\?<\/em>/);
  assert.match(services, /Faire le point sur son avenir professionnel/);
  assert.match(about, /Des espaces doux de transformation/);
  assert.match(html, /@ici\.yudy/);
  assert.match(about, /Ce qui devient/);
  assert.match(services, /séances maximum/);
  assert.match(about, /mois selon votre rythme/);
  assert.match(services, /class="service-details"/);
  assert.match(html, /Navigation du pied de page/);
  assert.equal((html.match(/class="statement-group"/g) || []).length, 2);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /rel="canonical" href="https:\/\/rchretien\.github\.io\/yudy\/"/);
  assert.match(html, /property="og:url" content="https:\/\/rchretien\.github\.io\/yudy\/"/);
  assert.match(html, /property="og:image" content="https:\/\/rchretien\.github\.io\/yudy\/assets\/yudy_soleil\.jpg"/);
  assert.match(html, /name="twitter:image" content="https:\/\/rchretien\.github\.io\/yudy\/assets\/yudy_soleil\.jpg"/);
  assert.match(html, /"url": "https:\/\/rchretien\.github\.io\/yudy\/"/);
  assert.match(html, /Séance de coaching individuel/);
  assert.match(about, /src="assets\/yudy_soleil\.jpg"/);
  assert.match(about, /src="assets\/sihem\.jpeg"/);
  assert.match(about, /alt="Portrait de Sihem Dalah"/);
  assert.match(html, /rel="icon" href="assets\/yudy-logo-OKsoleilnoir\.png"/);
  assert.match(html, /Mentions légales &amp; confidentialité/);
  assert.doesNotMatch(html, /<div class="glow-core">\s*<span>Y<\/span>/);
  assert.doesNotMatch(html, /portrait<br>à venir/);
  assert.doesNotMatch(html, /Tu sens/);
});

test("les fichiers SEO techniques référencent l'URL publique", async () => {
  const [robots, sitemap] = await Promise.all([
    read("robots.txt"),
    read("sitemap.xml"),
  ]);

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/rchretien\.github\.io\/yudy\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/rchretien\.github\.io\/yudy\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/rchretien\.github\.io\/yudy\/legal\.html<\/loc>/);
});

test("la page légale expose les mentions et la confidentialité", async () => {
  const html = await read("legal.html");

  assert.match(html, /Mentions légales/);
  assert.match(html, /Politique de confidentialité/);
  assert.match(html, /Sihem Dalah/);
  assert.match(html, /GitHub Pages/);
  assert.match(html, /n'utilise pas d'outil d'analyse d'audience/);
  assert.match(html, /ici\.yudy@gmail\.com/);
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
  assert.match(css, /\.mobile-booking-cta/);
  assert.match(css, /\.contact-icon/);
  assert.match(css, /\.testimonial-carousel/);
  assert.match(css, /@keyframes testimonial-marquee/);
  assert.match(css, /\.testimonial-card:hover/);
  assert.match(css, /\.service-proof-card:hover/);
  assert.match(css, /\.service-proof::before/);
  assert.match(css, /\.nav-social/);
  assert.match(css, /\.journey-map::before/);
  assert.match(css, /\.journey-step\.is-visible::after/);
  assert.match(css, /@keyframes contact-lueur/);
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
