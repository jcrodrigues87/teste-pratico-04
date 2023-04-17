sudo apt install -y sqlite
sudo apt install -y python3
sudo apt install -y python3-pip

pip3 install requests
pip3 install flask
pip3 install Flask-SQLAlchemy
pip3 install Flask-Migrate

flask db init
flask db migrate
flask db upgrade