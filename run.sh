cd project-manager-ui || exit
rm -rf build || exit
npm i || exit
npm run build || exit
cd ../project-manager || exit
mvn clean package || exit
docker build -t project-manager . || exit
cd .. || exit
docker compose up -d