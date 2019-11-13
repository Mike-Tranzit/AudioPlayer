#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout -b build
  git add www
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${GITHUB_TOKEN}@github.com/Mike-Tranzit/AudioPlayer.git > /dev/null 2>&1
  git push --quiet --set-upstream origin build
}

setup_git
commit_website_files
upload_files
