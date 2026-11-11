#!/usr/bin/env node
// Panel kullanıcıları. Şifreler burada üretilir, yalnızca bir kez ekrana yazılır; dosyada ve
// Cloudflare'de sadece tuzlanmış SHA-256 özeti durur.
//
//   node kullanici.mjs ekle ibrahim "İbrahim Aydın"   yeni kullanıcı (ya da yeni şifre) + yayınla
//   node kullanici.mjs sil ibrahim                     kullanıcıyı kaldır + yayınla (anında çıkış)
//   node kullanici.mjs liste
import { createHash, randomBytes, randomInt } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const FILE = new URL("./kullanicilar.json", import.meta.url);
const users = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : {};
const [cmd, rawName, fullName] = process.argv.slice(2);
const name = rawName?.trim().toLocaleLowerCase("tr");

// Telefonda kolay yazılsın: karışan harfler (l, 1, o, 0, i) yok, 4'lü gruplar
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";
const password = () =>
  Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("")).join("-");

const publish = () => {
  writeFileSync(FILE, JSON.stringify(users, null, 2) + "\n");
  execFileSync("npx", ["wrangler", "secret", "put", "USERS"], {
    input: JSON.stringify(users),
    stdio: ["pipe", "inherit", "inherit"],
    cwd: new URL(".", import.meta.url),
  });
};

if (cmd === "ekle" && name) {
  const pass = password();
  const salt = randomBytes(16).toString("hex");
  users[name] = { name: fullName ?? users[name]?.name ?? name, salt, hash: createHash("sha256").update(salt + pass).digest("hex") };
  publish();
  console.log(`\n${users[name].name}\n  Kullanıcı adı: ${name}\n  Şifre:         ${pass}\n`);
} else if (cmd === "sil" && name) {
  delete users[name];
  publish();
  console.log(`${name} kaldırıldı.`);
} else if (cmd === "liste") {
  for (const [u, v] of Object.entries(users)) console.log(`${u}\t${v.name}`);
} else {
  console.log('Kullanım: node kullanici.mjs ekle <ad> "<Ad Soyad>" | sil <ad> | liste');
}
