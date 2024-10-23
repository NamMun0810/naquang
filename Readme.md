Property Analytics Project - How to Run
This guide will walk you through the steps needed to run the project locally.

Prerequisites
Python 3.x
Node.js and npm
FastAPI
Axios (for React)
http-server (for serving static files)

The files should be setup like this:
D:\Nam-project\
    ├── node_modules\
    ├── public\
    │   └── Insights.html   
        └── index.html   
    ├── src\
    │   └── index.js        
    ├── scripts.js          
    ├── Style.css           
    ├── App\
    ├── main.py
    ├── package.json
    ├── package-lock.json


Step 1: Set Up Python (FastAPI)
Open your terminal (PowerShell, Command Prompt, or any terminal).
Navigate to the project folder:
### `cd path/to/Nam-project`

Make sure your FastAPI is installed. If not, install it using pip:
### `pip install fastapi`
### `pip install uvicorn`

Run the FastAPI server:
### `uvicorn main:app --reload`

Once the FastAPI server is running, it should be available at:
### `http://127.0.0.1:8000`

Step 2: Set Up Frontend (React)
Ensure Node.js and npm are installed. If not, install from the official website.
Install project dependencies:
### `npm install`

Install axios if not already installed:
### `npm install axios`

Install http-server for serving static files:
### `npm install -g http-server`

Step 3: Serve the Frontend
Run the http-server in your project directory
### `http-server`

Open your browser and navigate to:
### `http://localhost:8080/Insights.html`

Step 4: Running the Full Stack
FastAPI will be serving the backend logic and APIs.
The frontend will be served using http-server to handle the static HTML, CSS, and JS files.
Now your project should be up and running!