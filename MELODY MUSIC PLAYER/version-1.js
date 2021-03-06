/* File                          :version-1.js
 * Project                      : To create melody music player- integrating many keys at a time
 * Licence                      : MIT
 * Author                      : YASHKUMAR CHHATANI
 * last Date Modified         : APRIL-18-2020
 * Description                :creating the  large keybaord and including the functionalities of different types of waves . this is backend of the project.Also the keyboard is implemented here.
 */
A = new AudioContext;//initialise the audio context
d = [];// defining the variables that are referenced in html
h='';
//for the keyboard 
for(i = 1; i < 26; i++){
  d[i] = [];
  for(j = 0; j < 250; j++){
    h+='<div class=note line='+i+' id=c'+i+'_'+j+' onclick=toggle('+i+','+j+',this,0) onmouseover=toggle('+i+','+j+',this,1) '
    +
      (
        j == 0 && [1,3,6,8,11,13,15,18,20,23].indexOf(i-1) > -1 ? "style=background:#000": (j==0 || i == 13) ? "" : "style=background:#eee"
      )
    +
    '></div>';
  }
}
c.innerHTML = h;
// mouse over and mouse up and down are included for the advanced level music player.
mousedown = 0;
onmousedown=e=>{mousedown = 1;}
onmouseup=e=>{mousedown = 0;}
// toggle functionality included for the large keyboard layout
toggle=(i,j,t,f)=>{
  if(j==0)return;
  if(f && mousedown){
    d[i][j] = 1;
  }
  else if(!f){
    d[i][j] ^= 1;
  }
  t.style.background = d[i][j] ? "#000" : (i == 13) ? "#ccc" : "#eee";
  if(d[i][j]){
    for(k = 1; k < 26; k++){
      if(k != i){
        d[k][j] = 0;
        top["c"+k+"_"+j].style.background = (k == 13) ? "#ccc" : "#eee";
      }
    }
  }
}

p.onclick=()=>{

  A.close();
  // four different types of waves for producing four different types of sounds
  wave="sine";
  if(square.checked) wave = "square";
  if(sawtooth.checked) wave = "sawtooth";
  if(triangle.checked) wave = "triangle";

  df = [];
  for(i = 1; i < 26; i++){
    for(j = 0; j < 1000; j++){
      if(d[i][j]){
        df[j-1]=i;
      }
    }
  }
  
  exp.value = 
    // background process for the fucntion is shown and executed.
`with(new AudioContext)
with(G=createGain())
for(i in D=[${df}])
with(createOscillator())
if(D[i])
connect(G),
G.connect(destination),
start(i*${(""+t.value/1e3).replace("0.",".")}),
frequency.setValueAtTime(${+z.value}*1.06**(13-D[i]),i*${(""+t.value/1e3).replace("0.",".")}),${(wave=="sine")?"":"type='"+wave+"',"}
gain.setValueAtTime(1,i*${(""+t.value/1e3).replace("0.",".")}),
gain.setTargetAtTime(.0001,i*${(""+t.value/1e3).replace("0.",".")}+${(""+((t.value/1e3)-.02).toFixed(2)).replace("0.",".")},.005),
stop(i*${(""+t.value/1e3).replace("0.",".")}+${(""+((t.value/1e3)-.01).toFixed(2)).replace("0.",".")})`;
// evaluating the values
  eval(exp.value);

}
