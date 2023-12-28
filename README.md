
To run this application locally, you can follow these steps:

API Documentation

https://documenter.getpostman.com/view/28160711/2s9YkuZyeQ

### Step 1: Install Dependencies
Run the following command to install the project dependencies:

```bash
npm install
```
### Step 3: Build the TypeScript Code
If you haven't already, you need to compile TypeScript code into JavaScript. Run the following command:

```bash
npm run build
```

### Step 4: Start the Application
Now, you can start the application using one of the following commands:

- For production:
  ```bash
  npm start
  ```

- For development (with automatic restart on file changes):
  ```bash
  npm run start:dev
  ```

### Step 5: Access the Application
Once the application is running, you should be able to access it locally in your web browser at `http://localhost:5000` (or the port you specified in the `.env` file).

### Additional Steps: Linting and Formatting
You can also run linting and code formatting using the following commands:

- To lint the code:
  ```bash
  npm run lint
  ```

- To automatically fix linting issues:
  ```bash
  npm run lint:fix
  ```

- To format the code:
  ```bash
  npm run prettier
  ```

- To automatically fix formatting issues:
  ```bash
  npm run prettier:fix
  ```

