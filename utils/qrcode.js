const QrCode =require('qrcode')
exports.generateQrCode =async (url)=>{
   try{
    const qr =await  QrCode.toBuffer(`${url}?utm_qr=true`,{
        type: 'png',
      })
      const buffer = Buffer.from(qr)
      const  string64 = buffer.toString('base64');
      return `data:image/png;base64,${string64}`   
   }catch(e){
       throw new Error(e)
   }
}