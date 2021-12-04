# eth-dashboard
Ethereum dashboard and graphing web application

## Run locally (Linux)
Install [NodeJs](https://nodejs.org/en/), 

```sh
# clone the repo
git clone https://github.com/pranavgithub1/eth-dashboard.git
cd eth-dashboard

# install mysql and run setup.sql to create the database
sudo apt install mysql-server
sudo mysql < setup.sql

# start the backend
cd eth-backend
npm install
cd server

node server.js
```
Now create a new terminal, and navigate to the folder where you ran `git clone`, then
```
cd eth-dashboard/eth-dashboard
npm install
npm start
```

## Deploy to cloud (Linux VM with <=2GB RAM)
```sh
# clone the repo
git clone https://github.com/pranavgithub1/eth-dashboard.git
cd eth-dashboard

#run setup script
bash setup.sh
```
