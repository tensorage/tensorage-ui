# About this Repository

This repository contains the code for front-end application of tensorage.
This application is designed to facilitate interaction between users and the network by providing features for storing and retrieving files.

* Dashboard coming soon...

# Running the Application with PM2

To run this application using PM2, follow these steps:

1. Update system and upgrade packages
```bash
sudo apt update
sudo apt upgrade -y
```

2. Install nodejs and npm and pm2.
```bash
sudo apt install nodejs npm
npm install -g pm2
```

3. Install Python 3 and pip.
```bash
sudo apt install python3 python3-pip
python -m pip install -r requirements.txt
```

4. Clone this repository to your machine and install required modules.
```bash
git clone https://github.com/tensorage/tensorage-ui
cd tensorage-ui
npm install
```

5. Set Environment variables
```bash
cp .env.example .env
```
Edit .env file and set the following variables:
```bash
REACT_APP_BACKEND_URL=http://<your-ip>:8000
```

6. Run backend code using PM2
```bash
pm2 start bridge.py --interpreter python3 --name ui-bridge -- --wallet.name <validator-coldkey> --wallet.hotkey <validator-hotkey> --netuid 7 --subtensor.network finney
```

7. Run Web UI using PM2
```bash
pm2 start npm --name ui -- start
```