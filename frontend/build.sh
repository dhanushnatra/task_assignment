npm install
npm run build

mkdir ../backend/static/
echo "Created backend/static/ directory"

rm -rf ../backend/static/*
echo "Cleared backend/static/ directory"

cp -r ./dist/* ../backend/static/

echo "Frontend build complete and copied to backend/static/"