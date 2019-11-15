#!/bin/sh
  err() {
      msg "$*" 1>&2
  }

  msg() {
      echo "TRAVIS-COMMIT: $*"
  }
  echo "push.sh was touched"

  cd ..

  git clone https://github.com/Mike-Tranzit/AudioPlayer.git --branch master --single-branch microMathematics_autobuild
  cd microMathematics_autobuild

  mv ../www/* ./autobuild

  pwd; ls -l ./autobuild

  git config --global user.email "travis@travis-ci.com"
  git config --global user.name "Travis CI"
  msg " CONFIG WAS SET!"

  git remote add origin https://Mike-Tranzit:${GH_TOKEN}@github.com/Mike-Tranzit/AudioPlayer.git > /dev/null 2>&1
  git add ./autobuild/*

  if ! git checkout master; then
        err "failed to checkout master"
        return 1
  fi

  dateAndMonth=`date "+%b %Y"`

  if ! git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"; then
        err "failed to commit updates"
        return 1
  fi

  msg "COMMIT IS READY!"

  git push origin
  msg "PUSH WAS SUCCESS!"
