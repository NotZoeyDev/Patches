# DiscordExtras patches

This repository contains the patches made for DiscordExtras.  
If you wanna make your own patches, just look at the currently available patches and try to create your own based off that.  
Just edit `patches.js` to set your name before bundling them as deb files for your own use.  
NOTE: You'll need `dpkg-deb` installed on your computer if you wanna be able to compile the deb yourself.  

# Patches format  
The patches are just JSON files with a list of patches to apply like so:  
```JSON
{
  "patches": [
    {
      "find": "regex_goes_here",
      "replace": "replace_with"
    }
  ]
}
```
The find value can either be a simple string to find and replace, or it can also be regex.  
NOTE: The patching tool is implemented in Golang and so the regex should be using the Golang format.  