# bistagram
$ sudo apt-get update
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs

# global
$ sudo npm install -g babel-cli nodemon cross-env webpack webpack-dev-server

# mysql
$ sudo apt install mysql-client

# git
$ sudo apt-get install git
$ git clone https://github.com/prosonic1/bistagram.git


# etc program
- GraphicsMagick
- ffmpeg

$ sudo add-apt-repository ppa:mc3man/trusty-media
$ sudo apt-get update
$ sudo apt-get dist-upgrade
$ sudo apt-get install ffmpeg

$ sudo apt-get install graphicsmagick


# port bind
$ sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3001

# pm2 start
$ npm install pm2 -g
$ pm2 start npm -- start
