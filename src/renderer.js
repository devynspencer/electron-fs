const { ipcRenderer } = require('electron');

const onFileSubmit = document.querySelector('form').addEventListener('submit', (event) => {
  // Prevent page refresh (default behavior)
  event.preventDefault();

  // Retrieve file data from file input
  const files = [...document.getElementById('filepicker').files];

  // Condense file data only path and filename
  const filesFormatted = files.map(({ name, path: pathName }) => ({
    name,
    pathName
  }));

  // Send data to main process
  ipcRenderer.send('files', filesFormatted);
});

// Receive metadata from main process
ipcRenderer.on('metadata', (event, metadata) => {
  const displayElement = document.getElementById('file-data');

  displayElement.innerText = JSON.stringify(metadata, null, 2);
});

// Handle error events from main process
ipcRenderer.on('metadata:error', (event, error) => {
  console.error(error);
});
