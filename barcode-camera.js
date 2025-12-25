function startCamera(){
camera.classList.remove("hidden");
Quagga.init({
inputStream:{
type:"LiveStream",
target:cameraView,
constraints:{facingMode:"environment"}
},
decoder:{readers:["ean_reader","code_128_reader"]}
},err=>{
if(err)return alert(err);
Quagga.start();
});
Quagga.onDetected(d=>{
scanBarcode(d.codeResult.code);
stopCamera();
});
}
function stopCamera(){
Quagga.stop();
camera.classList.add("hidden");
}
