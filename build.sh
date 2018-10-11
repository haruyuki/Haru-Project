#!/usr/bin/env bash

P="haru-project"  # Name of file
LV="11.1" # Love version
MAC="https://bitbucket.org/rude/love/downloads/love-${LV}-macos.zip" # MacOS download link
WIN32="https://bitbucket.org/rude/love/downloads/love-${LV}-win32.zip" # 32bit Windows download link
WIN64="https://bitbucket.org/rude/love/downloads/love-${LV}-win64.zip" # 64bit Windows download link

### deploy web version to github pages
if [ "$1" == "deploy" ]; then
 cd "target/${P}-web"
 git init
 git config user.name "autodeploy"
 git config user.email "autodeploy"
 touch .
 git add .
 git commit -m "Deploy to GitHub Pages"
 git push --force --quiet "https://${github_token}@github.com/${2}.git" master:gh-pages

 exit;
fi

if [ "$1" == "create" ]; then
  mkdir target && cp -r src target/
  cd target/src
  zip -9r "../${P}.love" .
  cd -
fi

if [ "$1" == "mac" ]; then
  if [ ! -f "target/love-mac.zip" ]; then wget "${MAC}" -qO "target/love-mac.zip"; fi
  unzip -qo "target/love-mac.zip" -d "target"
  cp "target/${P}.love" "target/love.app/Contents/Resources"
  plistutil -replace CFBundleName -string "${P}" "target/love.app/Contents/Info.plist"
  plistutil -replace CFBundleIdentifier -string "com.blustar.${P}" "target/love.app/Contents/Info.plist"
  plistutil -remove UTExportedTypeDeclarations "target/love.app/Contents/Info.plist"
  mv "target/love.app" "target/${P}.app"
  zip -ry "target/${P}-mac.zip" "target/${P}.app/"
fi

if [ "$1" == "win32" ]; then
  if [ ! -f "target/love-win32.zip" ]; then wget "${WIN32}" -qO "target/love-win32.zip"; fi
  unzip -qo "target/love-win32.zip" -d "target"
  cd "target/love-${LV}.0-win32"
  cat "love.exe" "../${P}.love" > "${P}.exe"
  rm changes.txt readme.txt love.exe lovec.exe
  zip -ry "../${P}-win32.zip" "./"
fi

if [ "$1" == "win64" ]; then
  if [ ! -f "target/love-win64.zip" ]; then wget "${WIN64}" -qO "target/love-win64.zip"; fi
  unzip -qo "target/love-win64.zip" -d "target"
  cd "target/love-${LV}.0-win64"
  cat "love.exe" "../${P}.love" > "${P}.exe"
  rm changes.txt readme.txt love.exe lovec.exe
  zip -ry "../${P}-win64.zip" "./"
fi

if [ "$1" == "web" ]; then
  cd "target"
  git clone https://github.com/TannerRogalsky/love.js.git
  cd "love.js"
  git submodule update --init --recursive
  cd "release-compatibility"
  python ../emscripten/tools/file_packager.py game.data --preload ../../src@/ --js-output=game.js
  python ../emscripten/tools/file_packager.py game.data --preload ../../src@/ --js-output=game.js
  cd "../../"
  cp -r love.js/release-compatibility "${P}-web"
  zip -r "${P}-web.zip" "${P}-web/"
fi
