Chrome start page for new tab

There is no way to do this besides creating your own extension (see question comments for details). As it turns out, creating your own extension to do so is incredibly easy.

Create a new folder
Place the HTML file you want to load in your new tab inside it. Mine is called new-tab.html
Create another file in the folder called manifest.json that looks like this:

{
  "name": "My custom new tab page",
  "description": "Overrides the new tab page",
  "version": "0.1",
  "incognito": "split",
  "chrome_url_overrides": {
    "newtab": "index.html"
  },
  "manifest_version": 2
}

Go to "chrome://extensions" and click the "Developer mode" checkbox on the top right.

Click the "Load unpacked extension…" button

Navigate to your folder and click select