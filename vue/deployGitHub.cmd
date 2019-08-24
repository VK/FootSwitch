cd dist
git init
git checkout -b  gh-pages
git remote add origin https://github.com/VK/FootSwitch.git
git add .
git commit -a -m "initial commit"
git pull origin gh-pages --allow-unrelated-histories -Xours

git push --set-upstream origin gh-pages