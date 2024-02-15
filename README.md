# Introduction

ThreeJSVisualizer enables you to see a 3D model rendered on a canvas using ThreeJS on a localhost.

## Requirements

### Node & NPM
First of all, [node](https://nodejs.org/en) is essential to execute successfully this project.

```bash
sudo apt update
sudo apt install nodejs
nodejs -v
sudo apt install npm
```

### ThreeJS & Vite
Open a terminal on the root of the project folder and execute these commands:
```bash
# three.js
npm install --save three

# vite
npm install --save-dev vite
```

## Run the project
Open a terminal on the root of the project folder and execute this command:
```bash
# Start the Vite development environment
npx vite
```

Once executed, the terminal will provide you the localhost link with the port used:

**Example Output**
```bash
 VITE v5.1.3  ready in 159 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Now you can go to the web PHP project and use the local visualizer.