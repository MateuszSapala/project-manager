cd ../project-manager-ui || exit
npm i
npm run build
cd ../project-manager || exit
mvn clean package
docker build -t project-manager .
docker compose up -d