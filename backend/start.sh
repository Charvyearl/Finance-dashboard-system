#!/bin/bash

echo "Starting Finance Dashboard Backend..."
echo

echo "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi

echo
echo "Starting backend server..."
echo "Backend will run on http://localhost:5000"
echo
echo "Press Ctrl+C to stop the server"
echo

npm run dev
