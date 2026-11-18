var D=JSON.parse(document.getElementById('data').textContent),$=function(i){return document.getElementById(i)};
function e(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function sp(s){return Array.from(s).map(function(c,i){return'<span class="ch" style="--i:'+i+'">'+(c==' '?'&nbsp;':e(c))+'</span>'}).join('')}
function render(){
 var tl=D.sched.map(function(r){return'<div><em>'+e(r[0])+'</em><strong>'+e(r[1])+'</strong>'+e(r[2])+'</div>'}).join('');
 $('app').innerHTML=
 '<section class="sec"><div class="cap">'+e(D.intro)+'</div><div class="names script"><div class="nm">'+sp(D.n1)+'</div><div class="fn">'+e(D.f1)+'</div><span class="amp">&amp;</span><div class="nm">'+sp(D.n2)+'</div><div class="fn">'+e(D.f2)+'</div></div><p>'+e(D.line)+'</p><p class="cap" style="margin-top:22px">'+e(D.dateText)+'</p><p>'+e(D.venue)+'</p><div class="cap dn">↓</div></section>'+
 '<section class="sec"><div class="cap">Countdown</div><h2 class="script">Are you ready?</h2><div class="cd"><div><b id="d">0</b><span>Days</span></div><div><b id="h">0</b><span>Hours</span></div><div><b id="m">0</b><span>Mins</span></div><div><b id="s">0</b><span>Secs</span></div></div></section>'+
 '<section class="sec"><div class="cap">Location</div><h2>'+e(D.venue)+'</h2><p>'+e(D.address)+'</p><a class="btn" href="https://maps.google.com/?q='+encodeURIComponent(D.mapQ)+'" target="_blank" rel="noopener">View on map</a></section>'+
 '<section class="sec"><div class="cap">From the first hello to the last dance</div><h2>Schedule</h2><div class="tl">'+tl+'</div></section>'+
 '<section class="sec"><div class="frame"><div class="cap">Dress code</div><h2 class="script">'+e(D.dress)+'</h2><p>'+e(D.dressNote)+'</p></div></section>'+
 '<section class="sec"><div class="cap">'+e(D.rsvpBy)+'</div><h2 class="script">RSVP</h2><p>We can’t wait to celebrate with you.</p><img class="seal" src="'+$('seal').src+'" alt=""><br><a class="btn" href="https://wa.me/'+e(String(D.wa).replace(/\D/g,''))+'?text=Hello!%20I%20will%20attend." target="_blank" rel="noopener">Reply on WhatsApp</a><p style="margin-top:28px">With love,</p><div class="names script" style="font-size:clamp(30px,10vw,44px)">'+e(D.closing)+'</div></section>';
 document.querySelectorAll('.sec > *:not(.names),.tl > div,.cd > div,.fn').forEach(function(x,i){x.classList.add('rv');x.style.setProperty('--i',x.parentNode.classList.contains('sec')?Array.prototype.indexOf.call(x.parentNode.children,x):i%4)});
}
var T,last={};
function tick(){var t=Math.max(0,T-Date.now()),v={d:Math.floor(t/864e5),h:Math.floor(t%864e5/36e5),m:Math.floor(t%36e5/6e4),s:Math.floor(t%6e4/1e3)};
 for(var k in v){var n=$(k);if(n&&last[k]!==v[k]){n.textContent=v[k];n.classList.remove('pop');void n.offsetWidth;n.classList.add('pop');last[k]=v[k]}}}
function start(){var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting)x.target.classList.add('in')})},{threshold:.2});
 document.querySelectorAll('.sec').forEach(function(s){io.observe(s)});T=new Date(D.iso).getTime();tick();setInterval(tick,1000)}
function pearls(){var p=$('pearls');for(var i=0;i<16;i++){var s=document.createElement('i'),z=4+Math.random()*7;s.style.cssText='left:'+Math.random()*100+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(14+Math.random()*14)+'s;animation-delay:-'+Math.random()*20+'s';p.appendChild(s)}}
var env=$('env'),opened=0;
function openEnv(skip){if(opened)return;opened=1;if(skip){env.style.display='none';document.body.classList.remove('lock');start();return}
 env.classList.add('open');setTimeout(function(){env.style.display='none';document.body.classList.remove('lock');start()},1500)}
env.addEventListener('click',function(){openEnv(0)});
window.addEventListener('scroll',function(){var h=document.documentElement;$('bar').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%'},{passive:true});
function fit(){document.querySelectorAll('.nm').forEach(function(n){n.style.fontSize='';var f=parseFloat(getComputedStyle(n).fontSize);while(n.scrollWidth>n.clientWidth&&f>18){f-=2;n.style.fontSize=f+'px'}})}
render();fit();addEventListener('resize',fit);pearls();
try{if(sessionStorage.getItem('skip')){sessionStorage.removeItem('skip');openEnv(1)}}catch(x){}
/* editor */
var F=[['intro','Top line'],['n1','First name'],['n2','Second name'],['f1','Father line under first name (e.g. Son of Mr. Ahmed)'],['f2','Father line under second name (e.g. Daughter of Mr. Ali)'],['line','Invitation sentence'],['dateText','Date (as shown)'],['iso','Countdown date & time','datetime-local'],['venue','Venue name'],['address','Address'],['mapQ','Map search words'],['dress','Dress code'],['dressNote','Dress code note'],['rsvpBy','RSVP deadline text'],['wa','WhatsApp number (country code, digits only)'],['closing','Sign-off names']];
function openEd(){var h='<h3>Edit your invitation</h3>';F.forEach(function(f){h+='<label>'+f[1]+'</label><input data-k="'+f[0]+'" type="'+(f[2]||'text')+'" value="'+e(D[f[0]])+'">'});
 h+='<label>Schedule (time · title · note)</label><div id="rows"></div><button class="bt o" id="add">+ ADD ROW</button><br><button class="bt" id="sv">SAVE &amp; PUBLISH</button><button class="bt o" id="cx">CANCEL</button><p id="st" style="font-size:15px"></p>';
 $('ep').innerHTML=h;$('ep').style.display='block';D.sched.forEach(row);
 $('add').onclick=function(){row(['','',''])};$('cx').onclick=function(){$('ep').style.display='none'};$('sv').onclick=save}
function row(r){var d=document.createElement('div');d.className='row';d.innerHTML=[0,1,2].map(function(i){return'<input value="'+e(r[i])+'">'}).join('')+'<button class="bt o" style="margin:0;padding:0">✕</button>';d.lastChild.onclick=function(){d.remove()};$('rows').appendChild(d)}
async function save(){$('st').textContent='Saving…';
 document.querySelectorAll('#ep [data-k]').forEach(function(i){D[i.dataset.k]=i.value});
 D.sched=Array.prototype.map.call(document.querySelectorAll('#rows .row'),function(r){return Array.prototype.map.call(r.querySelectorAll('input'),function(i){return i.value})});
 var c=document.documentElement.cloneNode(true);['app','ep','pearls'].forEach(function(i){c.querySelector('#'+i).innerHTML=''});
 var en=c.querySelector('#env');en.className='';en.removeAttribute('style');c.querySelector('body').className='lock';c.querySelector('#eb').removeAttribute('style');c.querySelector('#ep').removeAttribute('style');
 c.querySelector('#data').textContent=JSON.stringify(D).replace(/</g,'\\u003c');
 try{sessionStorage.setItem('skip','1')}catch(x){}
 try{var a=await claude.use('artifact');if(!a)throw 0;await a.publish('<!DOCTYPE html>\n'+c.outerHTML)}catch(x){$('st').textContent='Could not save. Please open the link while signed in to your Claude account.'}}
$('eb').onclick=openEd;
if(window.claude)claude.use('user').then(function(u){if(u&&u.isOwner())$('eb').style.display='block'}).catch(function(){});
