cd /home/datenschutz-und-vereinsmanagement.de/ || exit
echo CODE
git reset --hard HEAD
git pull
echo REQS
tmp/venv/bin/pip install -r requirements.txt
echo DJANGO
tmp/venv/bin/python manage.py collectstatic --no-input
tmp/venv/bin/python manage.py migrate
echo TRANSLATIONS
tmp/venv/bin/django-admin compilemessages
echo PERMISSIONS
./permissions.sh
echo SERVER
systemctl restart apache2
echo DEPLOYED