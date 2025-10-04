#!/bin/bash

echo "Starting Finance Dashboard Frontend..."
echo

echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi

echo
echo "Starting frontend development server..."
echo "Frontend will run on http://localhost:3000"
echo "Make sure the backend is running on http://localhost:5000"
echo
echo "Press Ctrl+C to stop the server"
echo

npm start
