const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const main = fs.readFileSync(path.join(root, "electron", "main.cjs"), "utf8");
const preload = fs.readFileSync(path.join(root, "electron", "preload.cjs"), "utf8");
const ui = fs.readFileSync(path.join(root, "src", "main.jsx"), "utf8");

test("preserva o contrato funcional legado do Lyrics Pro", () => {
  for (const token of [
    "state:load", "state:save", "display:list", "output:open",
    "dialog:files", "file:read-text", "file:to-url",
  ]) assert.match(main, new RegExp(token.replace(":", "\\:")));

  for (const token of [
    "loadState", "saveState", "listDisplays", "openOutput",
    "chooseFiles", "readTextFile", "toFileUrl",
  ]) assert.match(preload, new RegExp(token));
});
test("preserva integração LouvorJA e recursos operacionais antigos", () => {
  for (const token of [
    "louvor-ja:setup", "louvor-ja:inspect", "louvor-ja:search",
    "louvor-ja:play", "louvor-ja:open",
  ]) assert.match(main, new RegExp(token.replace(":", "\\:")));

  for (const token of [
    "getLouvorJaSetup", "inspectLouvorJa", "searchLouvorJa",
    "playLouvorJa", "openLouvorJa",
  ]) assert.match(preload, new RegExp(token));

  for (const token of [
    "audienceDisplayId", "stageDisplayId", "activePlaylistId",
    "activeLayoutId", "activeSceneId", "blackout", "timer",
    "ObsClient", "Bible", "LouvorJA",
  ]) assert.match(ui, new RegExp(token, "i"));
});
