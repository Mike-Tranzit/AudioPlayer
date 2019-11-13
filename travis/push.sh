#!/bin/sh

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git remote add origin-master https://${GITHUB_TOKEN}@github.com/Mike-Tranzit/AudioPlayer > /dev/null 2>&1
git add www
# We don’t want to run a build for a this commit in order to avoid circular builds:
# add [ci skip] to the git commit message
git commit --message "Snapshot autobuild N.$TRAVIS_BUILD_NUMBER [ci skip]"
git push origin-master build
