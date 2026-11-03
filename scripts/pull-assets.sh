#!/usr/bin/env bash
set -e
rm -rf .tmp-portfolio
git clone --depth 1 https://github.com/rhmt-ofc/My-portofolio.git .tmp-portfolio
mkdir -p public
cp -r .tmp-portfolio/public/images public/images
cp -r .tmp-portfolio/public/components public/components
rm -rf .tmp-portfolio
echo "Aset berhasil ditarik ke public/"