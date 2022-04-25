Please make sure that you have enabled viewing hidden files in explorer settings

Current autorun.njsbc contains a rickroll

.bdassets is a folder that can store any assets that you want
- use fetchBDAsset(assetName) function where assetName is a filename of any asset located in this folder to get a path to required asset

.bdgadgets is a folder that contains multiple useful utilities and some examples
- to activate the backdoor on the victim's computer run install_backdoor.bat and type Y
- you can edit .bdgadgets/install_backdoor.bat if you want to
- drag any .njsbc file onto select.bat to make it execute upon insertion. 
    It will also prompt you to provide the name of the current autorun.njsbc script. 
    It would be saved into this folder under the given name

.bdgadgets/sources folder is designed to contain your source code for the scripts
- to add a script to .bdgadgets you have to compile your .njsbcs into .njsbc (this page may be useful https://github.com/GEAMER007/node_binfiles)
- drag any .njsbc file onto add.bat and it will give it a hidden attribute and move it to .bdgadgets
