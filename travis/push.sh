#!/bin/sh
echo "push.sh was touched"
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git remote add origin https://$AUTOBUILD_TOKEN@github.com/Mike-Tranzit/AudioPlayer.git > /dev/null 2>&1
git add -A
# We don’t want to run a build for a this commit in order to avoid circular builds:
# add [ci skip] to the git commit message
git commit -m "Snapshot autobuild N.$TRAVIS_BUILD_NUMBER [ci skip]"
git push origin
