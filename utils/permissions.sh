chown -R root:www-data /home/francopioli_project
chmod -R 750 /home/francopioli_project
find /home/francopioli_project -type f -print0|xargs -0 chmod 740
chmod -R 770 /home/francopioli_project/media
find /home/francopioli_project/media -type f -print0|xargs -0 chmod 760
chmod 770 /home/francopioli_project/logs
chmod -R 760 /home/francopioli_project/logs/*
chmod 770 /home/francopioli_project/francopioli
chmod -R 760 /home/francopioli_project/francopioli/db.sqlite3
