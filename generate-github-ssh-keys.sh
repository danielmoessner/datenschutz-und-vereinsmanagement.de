# run this on the server
# replace email@email.de with your github email

echo "GENERATING PRIVATE PUBLIC KEY PAIR"
ssh-keygen -t rsa -b 4096 -C "email@email.de"
echo "COPY THIS INTO THE GITHUB WORKFLOW"
cat ~/.ssh/id_rsa
echo "ADD THE PUBLIC KEY TO THE AUTHORIZED KEYS"
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
echo "DEPLOY NOW AND TEST IF IT WORKS"
