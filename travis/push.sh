#!/bin/sh
echo "push.sh was touched"
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  echo "config was set"
}

commit_country_json_files() {
  git checkout master
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%b %Y"`
  # Stage the modified files in dist/output
  git add -A
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
  echo "commit is ready"
}

upload_files() {
  # Remove existing "origin"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://Mike-Tranzit:${GH_TOKEN}@github.com/Mike-Tranzit/AudioPlayer.git > /dev/null 2>&1
  git push origin master --quiet
  echo "push!!!!"
}

setup_git
commit_country_json_files
upload_files
