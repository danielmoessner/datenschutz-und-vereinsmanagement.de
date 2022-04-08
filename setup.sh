# create folder structure
mkdir tmp/
mkdir tmp/static
mkdir tmp/media
mkdir tmp/logs
touch tmp/logs/django.log
touch tmp/secrets.json
# install everything
apt update
apt install python3-pip python3-venv python3-dev apache2 libapache2-mod-wsgi-py3 libpq-dev snapd gettext
snap install core
snap refresh core
snap install --classic certbot
# create venv and install deps
python3 -m venv tmp/venv
touch tmp/logs/django.log
# setup apache configs
certbot certonly --apache -d datenschutz-und-vereinsmanagement.de -d www.datenschutz-und-vereinsmanagement.de --register-unsafely-without-email
a2enmod ssl
a2enmod rewrite
ln -s /home/datenschutz-und-vereinsmanagement.de/apache.conf /etc/apache2/sites-available/datenschutz-und-vereinsmanagement.de.conf
a2ensite datenschutz-und-vereinsmanagement.de.conf
systemctl restart apache2