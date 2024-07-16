# Mobile Map Application

This repository contains a mobile application leveraging MapBox for map customization (adding images, pins, etc.) and fetching the user's current location. The project includes a Node.js backend with MongoDB for data storage and a React Native client.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Backend Setup](#backend-setup)
6. [Frontend Setup](#frontend-setup)
7. [Running the Application](#running-the-application)


## 1. Features

- Customizable map with MapBox
- Adding images and pins to the map
- Fetching and displaying the user's current location
- Node.js backend with MongoDB for data storage and retrieval of image and locations
- React Native client for mobile interface
- Amazon S3 with pre-signed urls for storing images

## 2. Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- React Native
- MapBox SDK
- Axios
- AWS

## 3. Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- MongoDB (v4.x or later)
- React Native CLI
- MapBox API key

## 4. Installation

```git
git clone https://github.com/AbdallaSarhan/geosnap.git
cd geosnap
```

## 5. Backend Setup

#### Navigate to the backend directory 
```bash
cd backend
```
#### Install Dependncies
```node
npm install
// or
yarn install
```

#### Create .env
```node
MONGODB_URL= 
PORT=8080
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_REGION=us-east-1
BUCKET_NAME=
```

## 6. Frontend Setup

#### Navigate to the frontend directory 
```bash
cd client
```
#### Install Dependncies
```node
npm install
// or
yarn install
```

#### Create .env
```node
EXPO_PUBLIC_MAPBOX_KEY=
BACKEND_API_URL
```

## 7. Running the Application

### 1. Start the Backend Server

1. Ensure you are in the server directory.

#### Start the backend server
```node
npm start
// or
yarn start
```

### 2. Start the Frontend Application

1. Ensure you are in the client directory.

2. Run the application on an emulator or physical device:

```node
npx react-native run-android
# or
npx react-native run-ios
```





