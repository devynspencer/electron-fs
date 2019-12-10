const { ipcRenderer } = require('electron');

const onFileSubmit = document.querySelector('form').addEventListener('submit', (event) => {
  // Prevent page refresh (default behavior)
  event.preventDefault();

  const fileInputEl = document.getElementById('filepicker') as HTMLInputElement;

  // Retrieve file data from file input
  const files = Array.from(fileInputEl.files).map((file) => ({
    name: file.name,
    pathName: file['path']
  }));

  // Send data to main process
  ipcRenderer.send('files', files);
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
