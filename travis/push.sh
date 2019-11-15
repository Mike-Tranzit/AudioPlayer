#!/bin/sh
echo "push.sh was touched"
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  msg " CONFIG WAS SET!"
}

commit_country_json_files() {
  if ! git checkout master; then
        err "failed to checkout master"
        return 1
  fi
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%b %Y"`
  # Stage the modified files in dist/output
  if ! git add -A; then
        err "failed to add modified files to git index"
        return 1
  fi

  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  if ! git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"; then
        err "failed to commit updates"
        return 1
  fi

  msg " COMMIT IS READY!"
}

upload_files() {
  # Remove existing "origin"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://Mike-Tranzit:${GH_TOKEN}@github.com/Mike-Tranzit/AudioPlayer.git > /dev/null 2>&1
  git push origin master --quiet
  msg " PUSH WAS SUCCESS!"
}

err() {
    msg "$*" 1>&2
}

msg() {
    echo "TRAVIS-COMMIT: $*"
}

setup_git
commit_country_json_files
upload_files
