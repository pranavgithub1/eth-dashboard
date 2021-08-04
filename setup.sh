#!/bin/sh
sudo apt update

# create swapfile
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile swap swap defaults 0 0' > /etc/fstab

# install nodejs
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# install mysql
sudo apt install mysql-server
sudo mysql < setup.sql

# install npm packages
cd eth-backend
npm install
cd ..
cd eth-dashboard
npm install
npm run build

# setup systemd processes
cd /etc/systemd/system
sudo touch myapi.service
sudo cat "[Unit]
Description=API endpoints to access database

[Service]
WorkingDirectory=/home/pranav/eth-dashboard/eth-backend/server
ExecStart=/usr/bin/node server.js
Type=simple
Restart=always
RestartSec=10

[Install]
WantedBy=basic.target
" > myapi.service
sudo systemctl enable myapi.service

sudo touch eth-dashboard-frontend.service
sudo cat "[Unit]
Description=Ethereum Dashboard Frontend

[Service]
WorkingDirectory=/home/pranav/eth-dashboard/eth-dashboard/server
ExecStart=/usr/bin/node server.js
Type=simple
Restart=always
RestartSec=10

[Install]
WantedBy=basic.target
" > eth-dashboard-frontend.service
sudo systemctl enable eth-dashboard-frontend.service



