#!/bin/bash

rm public/uploads
yarn build
rsync -a build root@napijaci.rs:/home/milos/tezga/frontend
#ssh root@napijaci.rs ln -s /home/milos/tezga/uploads /home/milos/tezga/frontend/build/
ln -s /home/milos/kodvel/tezga/uploads public/
