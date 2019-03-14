<template>
  <div id=app>
 <!-- <button ref="myButton" @click="doTest()">Click Me!</button>-->
  <!--<p ref="para" id="pid">testo</p>
  <button ref="myButton" @click="callAVA('zzzstart')">Click Me!</button>-->
    <beautiful-chat ref="pd"
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      :payload="payload"
      :imgSource="imgSource"/>
  </div>
</template>
<script>
const $ = require('jquery');
// We declare it globally
window.$ = $;

//GET COMANDI: modificato il 12/03/2019 perchè i comandi multi, canguro, stop non vanno gestiti con QR
function getComandi(arComandi)
{

  var comandi=arComandi;
  var temp=[];
  var tmp='';
  if (comandi.length>0){
      //prosegui con il parsing
      //caso 1: ho solo un comando, ad esempio lo stop->prosegui con il parsing, ma posso avere anche immagine
      switch (comandi.length){
        case 1:
          //comandi=arComandi; originale, prendeva lo stop
          temp=comandi[0].toString();
          //è un path di immagine? Se si contiene il carattere "="
          var pos = temp.indexOf("=");
          if (pos >- 1) {

           //ho una immagine, quindi splitto per "="
           temp=temp.split("=");
           console.log('valore di temp[1]= ' +temp[1]);
           arComandi[0]=temp[1];
           temp=arComandi;
           break;
          }else{
            //temp=comandi[0].toString();
            
            break;
          }
        case 2:
        //modifica del 28/02/2019
       
        for(var i=0;i<comandi.length;i++){

          if (comandi[i].startsWith('QR')) {
              tmp=comandi[i].toString();
              tmp=tmp.split("=");
              console.log('tmp= ' + tmp);
              tmp=tmp.toString();
              tmp=tmp.split(",");
              console.log('tmp ora =' + tmp);
              //recupero solo il titolo
              tmp=tmp[1].toString();
              tmp=tmp.split("|");
              console.log('tmp finale =' + tmp);
              temp.push(tmp[0]);
            //  temp.push(tmp[1]);
              
          }else {
//commentato in data 12/03/2019
            //comando multi: ["STOP","IMG=https://upload.wikimedia.org/wikipedia/commons/a/ab/House_mouse.jpg"]
           /* temp=arComandi[1].toString();
            
            //splitto temp in un array con due elementi divisi da uguale
            temp=temp.split("=");
            console.log('valore di temp[1]= ' +temp[1]);
            arComandi[1]=temp[1];
            //comandi=arComandi;
            temp=arComandi;
            break;*/
          }
        }
        comandi=temp;
          break;

        default:
          //
          console.log('sono in default');

      }
     return comandi; //ritorno array come mi serve STOP oppure STOP, PATH img
    
  } else {
    console.log('non ci sono comandi')

    //non ci sono comandi quindi non fare nulla
    return undefined;
  }

}
//FINE FUNZIONE GET COMANDI


//NUOVA FUNZIONE GET COMANDI SOLO PER GESTIRE QR
function getComandiQR(arComandi)
{

  var comandi=arComandi;
  var temp=[];
  var tmp='';
  if (comandi.length>0){
     
       
      for(var i=0;i<comandi.length;i++){

            if (comandi[i].startsWith('QR')) {
                tmp=comandi[i].toString();
                tmp=tmp.split("=");
                console.log('tmp= ' + tmp);
                tmp=tmp.toString();
                tmp=tmp.split(",");
                console.log('tmp ora =' + tmp);
                //recupero solo il titolo
                tmp=tmp[1].toString();
                tmp=tmp.split("|");
                console.log('tmp finale =' + tmp);
                temp.push(tmp[0]);            
            }
      } //fine for
      comandi=temp;
         

     
     return comandi; 
    
  } else {
    console.log('non ho comandi con qr')

    //non ci sono comandi quindi non fare nulla
    return undefined;
  }

}
//11/03/2019 RITORNO IL PAYLOAD 
function getComandiPayload(arComandi)
{

  var comandi=arComandi;
  var temp=[];
  var tmp='';
  if (comandi.length>0){
     
       
      for(var i=0;i<comandi.length;i++){

            if (comandi[i].startsWith('QR')) {
                tmp=comandi[i].toString();
                tmp=tmp.split("=");
                console.log('tmp= ' + tmp);
                tmp=tmp.toString();
                tmp=tmp.split(",");
                console.log('tmp ora =' + tmp);
                //recupero solo il titolo
                tmp=tmp[1].toString();
                tmp=tmp.split("|");
                console.log('tmp finale =' + tmp);
                temp.push(tmp[1]);            
            }
      } //fine for
      comandi=temp;
         

     
     return comandi; 
    
  } else {
    console.log('non ho comandi con qr')

    //non ci sono comandi quindi non fare nulla
    return undefined;
  }

}
//$('body').css('background-color', 'orange');

  export default {
  name: 'app',
  data() {
    return {
      
      participants: [
        {
          id: 'user1',
          name: 'PLQ',
          imageUrl: 'https://www.panloquacity.com/img/panloquacity_logo_34_34.png'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://www.panloquacity.com/img/panloquacity_logo_34_34.png', //'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
 /*
        { type: 'text', author: `me`, data: { text: 'esempio sempio' }, suggestions: ['some quick reply','another one'] },
      */
           { type: 'text', author: `user1`, data: { text: this.callAVA(this.$route.query.msg) } }// this.callAVA(this.$route.query.msg)   this.$route.query.msg ='zzzstart'
    
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      //provo qui payload 11/03/2019
      payload: ['x','y'],
      imgSource:'', //https://www.ideegreen.it/wp-content/uploads/2018/03/paguro-bernardo-3.jpg
      //*************************** */
      newMessagesCount: 0,
      isChatOpen: true, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    doFoo:  function() {
            /* this.$fs.appendFile('./session/prova.txt','prova', function (err) {
            if (err) {
              throw err;
            } else {
            console.log('DENTRO SCRIVI SESSIONE: SALVATO FILE ');
            }
    });*/
        },
    callAVA: function(msg){
      
          console.log('inizio: msg = '+ msg);
          var mess='';
          if (msg ===''){

            console.log('msg è stringa vuota, metto mess a zzzstart');
            mess='zzzstart';
          }else{
            mess=this.$utf8.encode(msg);
            console.log('messaggio ' + mess);
          }
          
   
          //originale sotto
          //modifica per parametri dinamici
          var bot=this.$route.query.ava;
          //var msgUrl=this.$route.query.msg;
          //console.log('msgUrl '+ msgUrl);
          if (typeof bot==='undefined' || bot===''){

            bot='Panloquacity'; //in origine era FarmaInfoBot
          }
        
        console.log('valore di ava dentro callAva'+ bot +'messaggio '+ mess);
        this.$http.post('http://86.107.98.69:8080/AVA/rest/searchService/search_2?searchText='+mess+'&user=&pwd=&ava='+bot).then((response) => {

        var outstring =response.data.output[0].output; 
        outstring=outstring.replace(/(<\/p>|<p>|<b>|<\/b>|<br>|<\/br>|<strong>|<\/strong>|<div>|<\/div>|<ul>|<li>|<\/ul>|<\/li>|&nbsp;|)/gi, '');
        var cmd=response.data.output[0].commands;
        console.log('outstring=' + outstring + ' cmd=' +cmd);
        let comandi=[];
        let pld=[];
        //comandi=getComandi(cmd);
        comandi=getComandi(cmd); // commentato il 12/03/2019 ->getComandiQR(cmd);
       
        pld=getComandiPayload(cmd);
        console.log('i comandi sono '+ comandi);
        if (typeof comandi!=='undefined' && comandi.length>=1) {
           console.log('ho almeno un comando, quindi prosegui con l\' azione '+comandi[0]);
            var pos = comandi[0].indexOf("//"); //individuo immagine
          if (pos >- 1)  {
             this.imgSource=comandi.toString();
             this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:outstring }, suggestions: [] }];
          //il comando STOP non va messo il QR
          }else if (comandi[0].toString()==='STOP') {
            this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:outstring }, suggestions: [] }];
          }else{
          //AGGIUNGO I QUICK REPLY 
            this.imgSource='';
            this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:outstring }, suggestions: comandi  }];
           
            //AGGIUNGO IL PAYLOAD 11/03/2019
              if (typeof pld!=='undefined' && pld.length>=1 ){
                  this.payload=pld;
              }
           } 
        }else{
          this.imgSource='';
          this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:outstring } }];
        }
        //this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:outstring } }];
        console.log(outstring);
      })
        
        },
        doTest2:  function() {
      /*
        console.log('valore di ava '+this.$route.query.ava + ' valore di messaggio '+this.$route.query.msg);
        console.log(typeof this.$route.query.ava==='undefined');
        },

        doTest:function(mess){
         
         
        const options = {
          hostname: '86.107.98.69', 
          port: 8080, 
          path: '/AVA/rest/searchService/search_2?searchText='+mess +'&user=&pwd=&ava=FarmaInfoBot',
          method: 'POST', 
          rejectUnauthorized: false, 
          headers: {
            'Cookie': this.$session.exists('JSESSIONID=') ?  this.$session.get('JSESSIONID=') :''
          }
        };
       var  postData = this.$querystring.stringify({
              'searchText': 'ciao',
              'user':'',
              'pwd':'',
              'ava':'FarmaInfoBot'
             
            });

          var sessID='';
          //verifico se sessione presente
          if (!this.$session.exists('JSESSIONID=') ){
            console.log('JSESSIONID= non esiste');
            this.$session.set('JSESSIONID=',sessID);
            console.log('inizializzo JSESSIONID= a stringa vuota');
          }else{
            sessID=this.$session.get('JSESSIONID=');
            console.log('esiste sessID con valore = '+sessID);
            //qui assegno cookie 
            options.headers.Cookie='JSESSIONID='+sessID;
            console.log('****************SESSIONID='+options.headers.Cookie);
          }

        const req = this.$myhttp.request(options, (res) => {

        console.log('STATUS DELLA RISPOSTA:'+ res.statusCode);
        console.log('HEADERS DELLA RISPOSTA'+ JSON.stringify(res.headers));
        console.log('::::::::::::::: il valore di options.headers.Cookie ora ='+options.headers.Cookie);
        if (res.headers["set-cookie"]){
    
          var x = res.headers["set-cookie"].toString();
          var arr=x.split(';')
          var y=arr[0].split('=');
          
          console.log('id di sessione di ava =' + y[1]);
          
          //scriviSessione(__dirname+'/sessions/',sessionId, y[1]); 
        } 
        res.setEncoding('utf8');
        var chunk='';
        res.on('data', (chunk) => {
       
          var c=JSON.parse(chunk);+
          console.log('___________id AVA di sessione = ' + c.sessionID);

           this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:c.output[0].output} }];
          if ( (options.headers.Cookie ==='') || (typeof options.headers['Cookie']==='undefined')){
            
            this.$session.set('JSESSIONID=',c.sessionID); //   c.sessionID
            console.log('valore in  storage '+this.$session.get('JSESSIONID='))
            options.headers.Cookie='JSESSIONID='+c.sessionID;
            console.log('header cookie '+ options.headers.Cookie);

           }else{
              console.log('ho già il cookie '+ options.headers.Cookie);
           }
        
       });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      });
      
      req.on('error', (e) => {
        console.error('problem with request:'+ e.message);
      });
      
      req.write(postData);
      
      req.end();
     */
/*
const axiosConfig = {
headers: {
'content-Type': 'application/json',
"Accept": "/",
"Cache-Control": "no-cache",
"Cookie": 'JSESSIONID=7yrpL7ux1ds8XBVGBh5agA6kQ3DzJ56thX6rkaQq',
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Credentials': true
},
credentials: "include"
};

this.$http.post('http://86.107.98.69:8080/AVA/rest/searchService/search_2?searchText=ciao&user=&pwd=&ava=FarmaInfoBot',
axiosConfig)
.then((res) => {
// Some result here
console.log('headers della risposta ' + res.headers);
 var outstring =res.data.output[0].output; 
       
          this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:outstring } }];

          console.log(outstring);
})
.catch((err) => {
  console.log('errore ');
console.log(':(');
});
*/
       
        },
    clickedButton: function() {
			console.log(this.$refs);
     /* this.$refs.myButton.innerText =this.participants[0].id; //funge this.isChatOpen   start()  ;
       var p=document.getElementById('pid').innerText;
       this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:p } }];*/
       console.log('msg list ' + this.messageList);
      //prova
     /*
      $.ajax({type: 'POST', url: "http://86.107.98.69:8080/AVA/rest/searchService/search_2?searchText=zzzstart&user=&pwd=&ava=FarmaInfoBot", success:  function (data) {
      var response=data;var outstring =data.output[0].output;var cmd=data.output[0].commands[0];
      pippo=outstring;
      console.log('valore di output' + pippo);
      } 
      });
       this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:pippo } }];
      this.$refs.pd.messageList = [ ...this.$refs.pd.messageList, { author: 'me', type: 'text', data: { text:'pp di' } } ];
      this.$refs.pd.messageList = [ ...this.$refs.pd.messageList, { author: 'user1', type: 'text', data: { text:pippo } } ];*/

		},
    sendMessage (text) {
      if (text.length > 0) {
        alert('testo utente ' + text);
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'me', type: 'text', data: { text } }) 
        
      }
    },
    onMessageWasSent (message) {
      console.log('tipo di messaggio '+ message.type);
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
      //alert('onMessageWasSent '+message.data.text);
      //this.clickedButton();
      //foo(message.data.text);
      //verifico che non arrivi ad PLQ le emoticon
      //if (message.type!== 'emoji'){
       this.callAVA(message.data.text);
       //this.doTest(message.data.text);
      //}
      
      //callAVA aggiorna lui la lista...
      //this.messageList = [ ...this.messageList, { author: 'user1', type: 'text', data: { text:document.getElementById('pid').innerText } }];
       //this.messageList = [ ...this.messageList, message ]
    
     
      
      
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    }
  }
}

</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>
  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    font-size: 0.9em;
    white-space: pre-wrap;
    color: #2c3e50;
  }

  code::before, code::after {
    content: '`';
  }
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #app {
    text-align: center;
  }

  #app h1 {
    color: #2c3e50;
    font-weight: 300;
    margin: 0;
  }

  .banner {
    height: 200px;
    background-color: #f6f6f6;
    padding: 50px 10px;
  }

  .bottom {
    padding: 80px 10px;
    font-size: 24px;
    font-weight: 300;
  }

  .fade {
    font-size: 14px;
  }

  .logo {
    animation: spin 4s 1s infinite linear
  }

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
</style>
