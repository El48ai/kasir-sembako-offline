// USERS
let users=JSON.parse(localStorage.getItem("users"))||[
{username:"admin",password:"admin123",role:"admin"}
];
let currentUser=null;

// DATA
let products=JSON.parse(localStorage.getItem("products"))||[];
let cart=[];

// LOGIN
function login(){
const u=username.value,p=password.value;
const user=users.find(x=>x.username===u&&x.password===p);
if(!user)return alert("Login gagal");
currentUser=user;
loginPage.classList.add("hidden");
app.classList.remove("hidden");
if(user.role==="admin")adminPanel.classList.remove("hidden");
render();
}
function logout(){location.reload();}

// MULTI KASIR
function addUser(){
users.push({username:newUser.value,password:newPass.value,role:"kasir"});
localStorage.setItem("users",JSON.stringify(users));
alert("Kasir ditambah");
}

// PRODUK
function addProduct(){
products.push({
id:Date.now(),
barcode:pBarcode.value,
name:pName.value,
price:+pPrice.value,
stock:+pStock.value
});
save();render();
}

// BARCODE
function scanBarcode(code){
const p=products.find(x=>x.barcode===code);
if(!p)return alert("Produk tidak ada");
if(p.stock<=0)return alert("Stok habis");
p.stock--;cart.push(p);
scanInput.value="";
save();render();
}

// CHECKOUT + STRUK
function checkout(){
if(!cart.length)return;
const total=cart.reduce((a,b)=>a+b.price,0);
printReceipt(total);
cart=[];
save();render();
}

function printReceipt(total){
let win=window.open("","Struk");
win.document.write(`
<h3>TOKO</h3>
${new Date().toLocaleString()}<hr>
${cart.map(p=>`${p.name} Rp${p.price}`).join("<br>")}
<hr>Total Rp${total}`);
win.print();
}

// EXCEL
function exportExcel(){
const ws=XLSX.utils.json_to_sheet(products);
const wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,"Produk");
XLSX.writeFile(wb,"data_kasir.xlsx");
}

// BACKUP MANUAL
function backupData(){
const data={users,products};
const blob=new Blob([JSON.stringify(data)],{type:"application/json"});
const a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="backup_kasir.json";
a.click();
}
function restoreData(file){
const r=new FileReader();
r.onload=e=>{
const d=JSON.parse(e.target.result);
users=d.users;products=d.products;
save();render();
};
r.readAsText(file);
}

// SAVE
function save(){
localStorage.setItem("users",JSON.stringify(users));
localStorage.setItem("products",JSON.stringify(products));
}
function render(){
productList.innerHTML=products.map(p=>
`<li>${p.name} (${p.stock})</li>`).join("");
cartList.innerHTML=cart.map(p=>
`<li>${p.name} Rp${p.price}</li>`).join("");
total.innerText=cart.reduce((a,b)=>a+b.price,0);
}
