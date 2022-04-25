var fs=require('fs')
global.require=require
class Memory{
    constructor() {
        this.stack=[]
        this.strpool=[]
        this.vartab={}
        this.bytecode=Buffer.from([])
        this.instptr=0
        this.codepoints={}
        this.curinstruction=''
        this.metadata={}
    }
    
}
GetUInt16BE=function (num){
    var buf=Buffer.from([0,0])
    buf.writeUInt16BE(num)
    return buf
}
GetUInt32BE=function (num){
    var buf=Buffer.from([0,0,0,0])
    buf.writeUInt32BE(num)
    return buf
}


function bufCopy(buf,start,end){
    var buffarray=[]
    for(var i=start;i<end;i++)
      if(buf[i]!==undefined)
         buffarray.push(buf[i])
    return Buffer.from(buffarray)
  }


 
function execute_bytecode(codebuf){
    var ofs=0
    while(ofs<codebuf.length){
        const opar=opcodes.opcodes[codebuf[ofs++]]
        if(opar[2]!='0'){
            const argbuf=Buffer.alloc(opar[2][0]-0)
            codebuf.copy(argbuf,0,ofs,ofs+argbuf.length)
            ofs+=argbuf.length
            const arg=opcodes.btypes[opar[2].slice(1,opar[2].length)][1](argbuf)
            opar[3](arg)
            
        }
        else opar[3]()

    }
}
const nbcsign=0x4e424631
function runNBF(filepath){
    global.mem=new Memory()
    global.opcodes = require('./assets/opcodes')
    global.opcodes=opcodes(mem)
    global.opcmapping={
        ito:{},
        otcb:{},
        ota:{}
    }
    opcodes.opcodes.forEach(v=>{
        opcmapping.ito[v[1]]=v[0]
        opcmapping.otcb[v[0]]=v[3]
        var s=v[2].split('')
        var al=s[0]-0
        s.shift()
        opcmapping.ota[v[0]]=[al,...s.join('').split(',')]
    })
    var nbcbuf=fs.readFileSync(filepath)
    var ofs=0
    if(nbcbuf.readUInt32BE(ofs)!=nbcsign)
        throw new Error("Invalid NBF file: signature not found")
    ofs+=4
    
    while(ofs<nbcbuf.length){
        const sectiontype=nbcbuf.readUint8(ofs++)
        const sectionlen=nbcbuf.readUint16BE(ofs)
        ofs+=2
        const sectionbody=Buffer.alloc(sectionlen)//bufCopy(nbcbuf,ofs,ofs+sectionlen)
        nbcbuf.copy(sectionbody,0,ofs,ofs+sectionlen)
        ofs+=sectionlen
        var lofs=0
        switch(sectiontype){
            //strpool
            case 1:{
               while(lofs<sectionbody.length){
                   const strlen=sectionbody.readUint16BE(lofs)
                   lofs+=2
                   mem.strpool.push(bufCopy(sectionbody,lofs,lofs+strlen).toString('utf-8'))
                   lofs+=strlen
                }
                break
            }
            //bytecode
            case 2:{
                mem.bytecode=sectionbody
                break
            }
            //metadata key-value pairs
            case 3:{
                while(lofs<sectionbody.length){
                    const strlen=sectionbody.readUint16BE(lofs)
                    lofs+=2
                    const key=bufCopy(sectionbody,lofs,lofs+strlen).toString('utf-8')
                    lofs+=strlen
                    const vstrlen=sectionbody.readUint16BE(lofs)
                    lofs+=2
                    const value=bufCopy(sectionbody,lofs,lofs+vstrlen).toString('utf-8')
                    lofs+=vstrlen
                    mem.metadata[key]=value
                 }
                 break

            }
            default:
                console.warn("Unknown section found. section descriptor: "+sectiontype)
                break
        }
    }
    execute_bytecode(mem.bytecode)
}
module.exports=runNBF