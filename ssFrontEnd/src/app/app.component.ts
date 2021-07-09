import { Component, OnInit } from '@angular/core';
import { EmptyError, merge } from 'rxjs';
import { AppService } from './app.service'
import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";
import {io} from 'socket.io-client';
import Peer from 'peerjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  title = 'ssFrontEnd';
  maxOffset:any = 12
  data:any = []
  categories:any = []
  profile:any
  socket:any;
  chatData = []
  inboxChatData:any = [];
  selectedChat:any = null;
  peer:any;


  constructor(private readonly appService: AppService, private http: HttpClient) {}
  async ngOnInit(){
      this.peer = new Peer(); 
      this.data = await this.appService.getProducts()
      this.categories = await this.appService.getCategories()
      let profile:any = await this.http.get("http://localhost:3000/profile", {
        headers: {
          authorization: this.getCookie('auth')
        }
      }).toPromise();
      this.profile = profile.payload


      this.socket = io("http://localhost:8080")

      if(this.profile) this.socket.emit("inbox", {userId:this.profile.userId})
      this.socket.on('getMessages',(data:any)=>{
        console.log("getMessage_Socket",data)
        this.chatData = data;
        this.printChat()
      })

      this.socket.on('message',(data:any)=>{
        console.log("message_Socket",data)
        this.chatData = data;
        this.printChat()
      })


      const inboxNameList:any = document.getElementById('inboxNameList');
      this.socket.on('inbox', (data:any)=>{
        console.log("inbox_Socket",data)
        this.inboxChatData = data;
        inboxNameList.innerHTML = '';
        var id:number = 0;
        data.forEach((oneData:any) => {
            inboxNameList.innerHTML += `<div cid="chat_${id}" class="d-flex flex-row p-3 border mt-2"> 
              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30">
              <div class="ml-2 mt-1" style="overflow:hidden;">${oneData.usernameSender}</div>
            </div>`
            this.makeaddEventListner(id);
            if(this.selectedChat == id){
              this.changeCurrentChat(id)
            }else if(id == 0 && this.selectedChat == null){
              this.changeCurrentChat(0);
              this.selectedChat = 0;
            }
            id++;
        });
      });
  }
  peerConnect(){
    
    var conn = this.peer.connect('another-peers-id');
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
      // here you have conn.id
      conn.send('hi!');
    });

    this.peer.on('connection', function(conn:any) {
      conn.on('data', function(data:any){
        // Will print 'hi!'
        console.log(data);
      });
    });
    /*
      Connect
      var peer = new peer();
      var conn = peer.connect('another-peers-id');
      // on open will be launch when you successfully connect to PeerServer
      conn.on('open', function(){
        // here you have conn.id
        conn.send('hi!');
      });
      Receive
      peer.on('connection', function(conn) {
        conn.on('data', function(data){
          // Will print 'hi!'
          console.log(data);
        });
      });
    */
  }


  makeaddEventListner(chat_id:number){
     setTimeout(()=>{
      document.querySelector('[cid="chat_'+chat_id+'"]')?.addEventListener('click', ()=>{
        this.changeCurrentChat(chat_id);
        this.selectedChat = chat_id;
      });
    },0);
  }
  changeCurrentChat(chat_id:number){
    var inboxChatModalOutput = document.getElementById('inboxChatModalOutput');
    if(inboxChatModalOutput){
        inboxChatModalOutput.innerHTML = '';
        if(this.inboxChatData[chat_id]){
        var xmessages:any  = this.inboxChatData[chat_id]["messages"];
        }
        var currentChat = document.getElementById('currentChat');
        if(currentChat){
          currentChat.innerHTML = this.inboxChatData[chat_id]["usernameSender"];
        }
        for(var i=0;i<xmessages.length;i++){
          if(inboxChatModalOutput){
            if(this.profile.userId == xmessages[i].sender){
              inboxChatModalOutput.innerHTML += `<div class="d-flex justify-content-end flex-row p-3">
                <div class="bg-white  mr-2 p-3"><span class="text-muted">${xmessages[i].message}</span></div> <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="30" height="30">
              </div>`
            }else{
              inboxChatModalOutput.innerHTML += `<div class="d-flex   flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30">
                <div class="chat ml-2 p-3">${xmessages[i].message}</div>
              </div>`
            }
          }
        }
       
          // Scroll down
          inboxChatModalOutput.scrollTop = inboxChatModalOutput.scrollHeight;
    }
  }

  async chat(id:any){
    
    if(this.profile){
      document.getElementById('closeProductModal')?.click();
      this.socket.emit("getMessages", {seller: id, client: this.profile.userId})
      this.socket.emit("inbox", {userId:this.profile.userId})

      for(var i=0;i<this.inboxChatData.length;i++){
        if(this.inboxChatData[i].sender == id){
          this.selectedChat = i;
          this.changeCurrentChat(i);
          break;
        }
      }
      setTimeout(()=>{
        this.selectedChat = i;
        this.changeCurrentChat(i);
      },2000)
      
    
      document.getElementById('inboxbuttonshow')?.click();
      this.printChat()
    }else{
      document.getElementById('closeProductModal')?.click(); // close product modal
      document.getElementById('profileIcon')?.click();  // open login modal
    }
  }


  printChat(){
    const chatModalOutput = document.getElementById('chatModalOutput')
    if(chatModalOutput){
      chatModalOutput.innerHTML = '';
        this.chatData.forEach((element:any)=>{
          if(this.profile.userId == element.sender){
            chatModalOutput.innerHTML += `<div class="d-flex justify-content-end flex-row p-3">
              <div class="bg-white  mr-2 p-3"><span class="text-muted">${element.message}</span></div> <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="30" height="30">
            </div>`
          }else{
            chatModalOutput.innerHTML += `<div class="d-flex   flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30">
              <div class="chat ml-2 p-3">${element.message}</div>
            </div>`
          }
        })
        chatModalOutput.scrollTop = chatModalOutput.scrollHeight;
    }
  }

  sendMessage(msg:any){
    let ownerId = document.getElementById('productUid')?.innerHTML;
    let userId = this.profile.userId;
    this.socket.emit("message", {seller: ownerId, client: userId, message: msg})
    this.socket.emit("inbox", {userId:this.profile.userId})
    const messageBox:any = document.getElementById('messageBox')
    if(messageBox){
      messageBox.value = ''
    }
  }
  inboxsendMessage(msg:any){
    var currentChat = this.inboxChatData[this.selectedChat];
    let userId = this.profile.userId;
    this.socket.emit("message", {seller: currentChat.sender, client: userId, message: msg})
    this.socket.emit("inbox", {userId:this.profile.userId})
    const messageBox:any = document.getElementById('inboxmessageBox')
    if(messageBox){
      messageBox.value = ''
    }

  }

  async loginHandler(username:string, password:string){
    try {
      let data:any = await this.http.post('http://localhost:3000/login', {
        username:username,
        password: password
      }).toPromise();
     
      if(data.statusCode !== 204){
        let errorParagraph:any = document.getElementById('error')
        errorParagraph.innerHTML = data.errorMessage
      }else{
        this.setCookie("auth",data.payload,30);
        document.getElementById('closeModalLogin')?.click();
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error)
    }
  }

  addProductHandler(element:any){
   
    if(this.getCookie("auth") == ""){
      element.setAttribute("data-target", "#exampleModal");
    }else{
      element.setAttribute("data-target", "#addProductModal");
    }
  }

  async addProduct(productName:string,productDescription:string,productPrice:any,productStock:any,productCategory:any,files: any){

    let formData = new FormData();
    for (let i = 0; i < files.files.length; i++) {
      formData.append('photos', files.files[i]);
    }
    formData.append('description', productDescription);
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('stock', productStock);
    formData.append('category', productCategory);
    
    try{
        let data:any = await this.http.put('http://localhost:3000/products', formData,
        {
          headers: {
            authorization: this.getCookie('auth')
          }
        }).toPromise();
        if(data.statusCode != 204){
          let xerror = document.getElementById('addErrorProduct');
          if(xerror)
          xerror.innerHTML = data.errorMessage;
        }else{
          window.location.href = '/';
        }
    }catch(error){
        console.log(error);
    }
    }

 
  async registerHandler(username:string,email:string,password:string){
    try{
      let data:any = await this.http.post('http://localhost:3000/register', {
        email:email,
        username:username,
        password: password
      }).toPromise();

      if(data.statusCode == 204){
          // register comple 
          document.getElementById('closeModalRegister')?.click();// close modal register
          document.getElementById('profileIcon')?.click();       // open modal login
      }else{
          let errorParagraph:any = document.getElementById('errorRegister')
          errorParagraph.innerHTML = data.errorMessage;
      }
    }catch(err){
      console.log(err);
    }
  }

  async profileHandler(){
    let icon:any = document.querySelector('.icons')
    if(this.getCookie("auth") != ""){
     
      icon.setAttribute("data-target", "#profileModal");
      let data:any = await this.http.get("http://localhost:3000/profile", {
        headers: {
          authorization: this.getCookie('auth')
        }
      }).toPromise();
      window.localStorage["userData"] = data;
      let username:any = document.querySelector('[epi="username"]');
      let email:any = document.querySelector('[epi="email"]')
      let password:any = document.querySelector('[epi="password"]')

      username.value = data.payload.username
      email.value = data.payload.email
      password.value = "";
    }else{
     
    }
  }

  async profileUpdate(email:string,username:string,password:string){
    if(this.getCookie("auth") != ""){
      try {
        const data:any = await this.http.post("http://localhost:3000/profile",
         {
          username: username,
          email: email,
          password: password
        
      },
      {
        headers:{
          authorization: this.getCookie('auth')
        }
      }).toPromise();
      } catch (error) {
        console.log(error)
      }


    }


  }
  callHandler(){
    //console.log(this.inboxChatData[this.selectedChat]);
    // this.inboxChatData[chat_id]["sender"]
    // http://localhost:3030/videocall?hostid=test&guestid=artan
    //`http://localhost:3030/videocall?hostid=${this.profile.userId}&guestid=${this.inboxChatData[chat_id]["sender"]}`
  var myWindow = window.open(
    `http://localhost:3030/videocall?hostid=${this.profile.userId}&guestid=${this.inboxChatData[this.selectedChat]["sender"]}`
    ,
    "",
    "width=700,height=1000,left=250");

    this.socket.emit("message", { seller: this.inboxChatData[this.selectedChat]["sender"], client: this.profile.userId,
    message: this.profile.username+' is on call' })
  }
  setCookie(cname:any, cvalue:any, exdays:any) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(cname:any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async getOnlyFromCategory(c:any){
    this.data = await this.appService.getProducts()

    this.data = this.data.filter((item:any,_index:any,_array:any)=>{
      return item.category == c;
    })
  }

  loadMore(){
    var loadMoreElement:any = document.getElementById("loadMoreButton");
    if(this.maxOffset >= this.data.length - 1) loadMoreElement.style.display = "none"
    this.maxOffset += 1
  }

  deleteHandler(deleteButton:any, userProductId:any){
  
    if(!this.profile){
      deleteButton.style.display = "none"
      return
    }
    
    this.profile.userId !== userProductId ? deleteButton.style.display = "none" : deleteButton.style.display = "";
  }

  logoutHandler(){
    this.setCookie("auth","",0);
    window.location.href = '/';
  }

  async deleteProduct(){
    let productId = document.getElementById('productIdfull')?.innerHTML;
    let data = await this.http.delete("http://localhost:3000/products/" + productId,
    {
        headers:{
          "authorization": this.getCookie('auth')
        }
    }).toPromise();
    
    window.location.href = '/';
  }


  inboxHandler(element:any){
    if(this.getCookie("auth") == ""){
      element.setAttribute("data-target", "#exampleModal");
    }else{
      element.setAttribute("data-target", "#inboxModal");
      const chatModalOutput = document.getElementById('chatModalOutput')
      if(chatModalOutput) chatModalOutput.scrollTop = chatModalOutput.scrollHeight;
    }
  }

  async productModal(id:string,name:string,des:string,price:string,stock:string,category:string,photosUrl:Array<string>,productUid:any){
    var productId = document.getElementById('productID')
    var productName = document.getElementById('productName');
    var productPrice = document.getElementById("productPrice");
    var productDes = document.getElementById("productDes");
    var productStock = document.getElementById("productStock");
    var productCategory = document.getElementById("productCategory");
    var userHiddenId =  document.getElementById('productUid');
    var userId = document.getElementById('productIdfull');
    if(productPrice && productDes && productStock && productCategory && productName && productId &&  userHiddenId && userId){
    userHiddenId.innerHTML = productUid;
    userId.innerHTML = id;
    productId.innerHTML = 'Product #' + id.substring(0,4);
    productName.innerHTML = name;
    productPrice.innerHTML = price + '$';
    productDes.innerHTML = des;
    productStock.innerHTML = stock;
    productCategory.innerHTML = category;

    let ul = document.querySelector('.carousel-inner');
    let test = document.querySelector('.carousel-indicators');
    let btn = document.getElementById('deleteProduct')
    let profile:any = await this.http.get("http://localhost:3000/profile", {
        headers: {
          authorization: this.getCookie('auth')
        }
    }).toPromise();
    this.profile = profile.payload
    this.deleteHandler(btn, productUid)

    for(var i=0;i<photosUrl.length && ul && test;i++){
      if(i==0){
        ul.innerHTML = '';
        test.innerHTML = '';
      }
      ul.innerHTML += `<div class="carousel-item ${i == 0 ? 'active' : ''}" >
        <img class="d-block w-100" style="object-fit: contain;width:800px;height:450px;" src="http://localhost:3000${photosUrl[i]}">
      </div>`;
      test.innerHTML += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" ${i == 0 ? 'class="active"' : ''}>
                      <img style="height:60px;width:60px;object-fit: cover;" src="http://localhost:3000${photosUrl[i]}" alt=""> 
                </li>`
    } 
    
  }

  }
  

}

