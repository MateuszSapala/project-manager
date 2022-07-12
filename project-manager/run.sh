cd ../project-manager-ui
npm i
npm run build
cd ../project-manager
mvn clean package
docker build -t project-manager .
docker compose up -d