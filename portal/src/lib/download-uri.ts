export default function downloadURI(uri: string, name: string, bearerToken: string) {
  let anchor = document.createElement("a");
  document.body.appendChild(anchor);
  let file = uri;

  let headers = new Headers();
  headers.append('Authorization', `Bearer ${bearerToken}`);

  fetch(file, { headers })
    .then(response => response.blob())
    .then(blobby => {
      let objectUrl = window.URL.createObjectURL(blobby);

      anchor.href = objectUrl;
      anchor.download = name;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
    })
}