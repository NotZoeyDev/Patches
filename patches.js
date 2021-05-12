const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const template = `Package: package_name
Name: patch_name
Version: patch_version
Architecture: iphoneos-arm
Description: patch_description
Maintainer: patch_author
Author: patch_author
Section: Patches
Depends: moe.panties.discordextras
`;

if (!fs.existsSync("packages")) {
  fs.mkdirSync("packages");
}

if (fs.existsSync("temp")) {
  fs.rmdirSync("temp", { recursive: true });
}

fs.mkdirSync("temp");

const patches = fs.readdirSync("patches");
const packages = fs.readdirSync("packages");

for (const patch of patches) {
  if (!patch.includes(".json")) continue;
  const patchInfo = JSON.parse(fs.readFileSync(`patches/${patch}`, { encoding: 'utf-8' }));
  const patchName = patch.replace('.json', '').toLowerCase();
  const tempFolder = `temp/${patchName}`;
  
  fs.mkdirSync(tempFolder);
  fs.mkdirSync(`${tempFolder}/DEBIAN`);
  fs.mkdirSync(`${tempFolder}/Library/Application Support/DiscordExtrasFiles.bundle/patches/`, { recursive: true });

  const packageName = `moe.panties.${patchName}`;
  const version = packages.filter(package => package.includes(patchName)).length;

  const controlFile = template
    .replace('package_name', packageName)
    .replace('patch_name', patch.replace('.json', ''))
    .replace('patch_description', patchInfo.description)
    .replaceAll('patch_author', patchInfo.author)
    .replace('patch_version', `1.0.0-${version + 1}`);

  fs.writeFileSync(`${tempFolder}/DEBIAN/control`, controlFile);
  fs.copyFileSync(`patches/${patch}`, `${tempFolder}/Library/Application Support/DiscordExtrasFiles.bundle/patches/${patch}`);

  const jsFile = patch.replace('.json', '.js');
  if (fs.existsSync(`patches/${jsFile}`)) {
    fs.copyFileSync(`patches/${jsFile}`, `${tempFolder}/Library/Application Support/DiscordExtrasFiles.bundle/patches/${jsFile}`);
  }

  execSync(`dpkg-deb --build ${tempFolder}`);
  fs.renameSync(`temp/${patchName}.deb`, `packages/${patchName}_1.0.0-${version + 1}_iphoneos-arm.deb`)
}

fs.rmdirSync("temp", { recursive: true });