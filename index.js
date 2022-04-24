
// process.exit=()=>{console.log("attempted to exit")}
    
    var fs=require("fs")
    var cp=require("child_process")
    var list  = cp.spawn('cmd');
    var selectedDrive=''
    global.fetchBDAsset=(asset)=>{
        var pta=`${selectedDrive}/.bdassets/${asset}`
        if(fs.existsSync(pta))
        return pta
        return false
    }
    function tryautorun(drive){
        try{
        if(fs.readdirSync(drive+'/').includes('autorun.njsbc')){
            console.log('found autorun.njsbc on '+drive)
            selectedDrive=drive
            require("./nbf")(`${drive}/autorun.njsbc`)
        }}catch(e){console.log(e)}
    }
    //var n=0
    var olddrives=null;
    list.stdout.on('data', d=> {
        //console.log(n+++'checking...'+d.toString())
        const out = d.toString().split("\r\n").map(e=>e.trim()).filter(e=>e!="")
        if (out[0]==="Name"){
            var drives = out.slice(1)
            if(olddrives!=null&&drives.length>olddrives.length){
            console.log('change detected!\nnew list of drives:\n'+drives.join('\n'))
                drives.forEach(d=>{
                    if(!olddrives.includes(d))tryautorun(d)
                })
            }
            olddrives=drives;
        }
        
        // console.log("stdoutput:", out)
    });
    function loop(){
        if(list.exitCode!=null)list  = cp.spawn('cmd');
        list.stdin.write('wmic logicaldisk get name\n');
        
        //
    }
    setInterval(loop,5000)
    // function drsfencryptor (str=''){
        //     var charcodes=[]
        //     // console.log(str)
        //     for (let index = 0; index < str.length; index++) {
            //         charcodes[index]=str.charCodeAt(index)        
            //     }
            //     var encrypted_string=''
            //     for (let index = 0; index < charcodes.length; index++) {
                
                //          var byte=
                //          (326+charcodes[index]).toString(16).toUpperCase()+'|'+
                //          (511+charcodes[index]).toString(16).toUpperCase()+'|'+
                //          (630+charcodes[index]).toString(16).toUpperCase()+'|'+
                //          (901+charcodes[index]).toString(16).toUpperCase()+'|'+
                //          ' '
                //         if (index%7==0&&index>6){byte+='\n'}
                //          encrypted_string+=byte
                
                
                //     }
                //     return encrypted_string
                //     }
                //     function drsfdecryptor(str=''){
    //     try{
        //     while(str.indexOf('\n')>-1){
            //         str=str.replace("\n",'')
            //         // console.log(str)
            
            //     }
            //     var strs=str.split(' ')
            //     strs.pop()
            //     var decryptedstring=''
            //     for (let index = 0; index < strs.length; index++) {
                //         decryptedstring+=String.fromCharCode(Number('0x'+strs[index].toLowerCase().split('|')[0])-326)
                //     }
                //     return decryptedstring
                //     } catch (error) {
                    //        throw new Error("drsf file is invalid")
                    //     }
                    
                    //     }
                    // if (process.argv[2]&&fs.existsSync(process.argv[2])){
                        //     var file=String(fs.readFileSync(process.argv[2]))
                        //     var outFile = process.argv[3]||process.argv[2]+'/../autorun.drsf'
                        // if (process.argv[2].endsWith('.drsf')&&!process.argv[3].endsWith('.drsf')){
                            //     fs.writeFileSync(outFile,drsfdecryptor(file))
                            // }else{
                                //     fs.writeFileSync(outFile,drsfencryptor(file))
                                // }
                                // }
                                // else{
                                    
                                    
                                    
                                    
                                    
                                    // console.log(drsfdecryptor(drsfencryptor('hello world')))
                                    // usbdetector.startMonitoring()
                                    // console.log("Starting to listen on COM1 COM2 COM3 and COM4")
                                    
                                    // var ranOnDrives={}
                                    // var availableDrives=['D:\\','E:\\',"F:\\","G:\\"]
                                    // usbdetector.on('remove',(device)=>{
                                        //     delete ranOnDrives[device.serialNumber]
                                        //     console.log("USB Device disconnected! serialNumber: "+device.serialNumber)
                                        // })
                                        // usbdetector.on("add",(device)=>{
                                            //         console.log("USB Device detected! serialNumber: "+device.serialNumber)
                                            
                                            //         setTimeout(()=>{
                                                //             var fwnf=true
                                                //             for (let indexxxxxxx = 0; indexxxxxxx < availableDrives.length; indexxxxxxx++) {
    //                 if(fs.existsSync(availableDrives[indexxxxxxx]+"autorun.drsf")&&!Object.values(ranOnDrives).includes(availableDrives[indexxxxxxx])){
    //                 fwnf=false

    //                 ranOnDrives[device.serialNumber]=availableDrives[indexxxxxxx]
    //                 console.log("autorun.drsf file was found on the connected usb drive ("+availableDrives[indexxxxxxx]+") :) !\nExecuting...")
    //                 var pexit = process.exit
    //                 process.exit=()=>{throw new Error("autorun.drsf attempted to process.exit")}
    //                 try{
                        
    //                     var main=eval(drsfdecryptor( String(fs.readFileSync(availableDrives[indexxxxxxx]+"autorun.drsf"))))
    //                     console.log(main(require,availableDrives[indexxxxxxx]))
    //                     delete main
                        
                        
    //                 } catch (error) {
    //                      console.log("file contains compilation errors or is incorrect")
    //                 }
    //                 process.exit=pexit
    //                 break

    //                 }
    //             }
    //             if (fwnf){console.log("autorun.drsf was not found on the connected usb drive :(")}
    //             // if(fs.existsSync("E:\\autorun.drsf")&&!Object.values(ranOnDrives).incudes('E:\\')){
                    
    //                 // exec('E:\\autorun.bat',{cwd:"E:\\",windowsHide:true})
    //             // } else{}
    //         },2000)
            
        
//     })

// }