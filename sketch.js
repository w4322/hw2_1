var face_colors = "FFFFFF-fefae0-f4f0bb-f7b267-f79d65-f4845f-f27059-f25c54".split("-").map(a=>"#"+a)
var sound1
function preload(){
  sound1 = loadSound("joyful-snowman_60sec-176773.mp3") //把音樂檔載入
}


var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[] //移動速度
var txts  //宣告一個變數，存取文字框內容
var face_move_var = false //臉移動條件，如果是才移動

var lang = navigator.language 
var myRec = new p5.SpeechRec(lang)

function setup() {
  createCanvas(windowWidth, windowHeight);
  //文字框
  inputElement =createInput("411730707王文彤🤡☠️💖") //文字框
  inputElement.position(10,10) //文字方塊位置
  inputElement.size(140,40) //文字框大小
  inputElement.style("fout-size","40px")
  inputElement.style("color","#10002b")
  inputElement.style("background","#9c89b8")
  inputElement.style("border","none")

  // 按鈕
  btnMoveElement = createButton("移動")
  btnMoveElement.position(170,10) //移動按鈕位置
  btnMoveElement.size(80,40)
  btnMoveElement.style("fout-size","40px")
  btnMoveElement.style("color","#1b263b")
  btnMoveElement.style("background","#778da9")
  btnMoveElement.style("border","5")
  btnMoveElement.mousePressed(face_move)

  btnMoveElement = createButton("暫停")
  btnMoveElement.position(270,10) //移動按鈕位置
  btnMoveElement.size(80,40)
  btnMoveElement.style("fout-size","40px")
  btnMoveElement.style("color","#1b263b")
  btnMoveElement.style("background","#778da9")
  btnMoveElement.style("border","5")
  btnMoveElement.mousePressed(face_stop)

  btnVoiceElement = createButton("語音")
  btnVoiceElement.position(600,10) 
  btnVoiceElement.size(80,40)
  btnVoiceElement.style("fout-size","40px")
  btnVoiceElement.style("color","#1b263b")
  btnVoiceElement.style("background","#fb6f92")
  btnVoiceElement.style("border","5")
  btnVoiceElement.mousePressed(voice_go)
  
  btnMusicElement = createButton("音樂")
  btnMusicElement.position(700,10) 
  btnMusicElement.size(80,40)
  btnMusicElement.style("fout-size","40px")
  btnMusicElement.style("color","#1b263b")
  btnMusicElement.style("background","#fb6f92")
  btnMusicElement.style("border","5")
  btnMusicElement.mousePressed(music_go)

  //radio的設定，多的選項(單選)
  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")
  radioElement.position(370,10)
  radioElement.size(180,40)
  radioElement.style("fout-size","40px")
  radioElement.style("color","#1b263b")
  radioElement.style("background","#778da9")

  // checkBox,(複選)

  

  // for(var i=0;i<15;i=i+1){
  //   drawface(face_colors[int(random(face_colors.length))])

  // }
}

function draw() {
  background("#f8edeb");
  var mode=radioElement.value()

  for(var i=0;i<pos_x.length;i=i+1)
  {
    
    push()
    txts = inputElement.value(); //把文字內容放到txts裡
    translate(pos_x[i],pos_y[i])

  
    if(mode=="旋轉"){
      rotate(sin(frameCount/40*v_y[i]))
    }
   
    drawface(colors[i],0,sizes[i])
  pop()

    if(face_move_var || mode=="移動"){ 
    pos_y[i]= pos_y[i]+v_y[i] //移動
    }

    
    //
    if(pos_y[i]>height || pos_y[i]<0)//判斷有沒有碰到上下
    {
      pos_x.splice(i,1) //碰到邊的物件刪除
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)
    }
   
  }
  push()
  fill("#a2d2ff")
  noStroke() //無框
  ellipse(mouseX,mouseY,100) //隨著滑鼠移動的圓
  fill("#cdb4db")
  ellipse(mouseX-50,mouseY-50,50) //左邊耳
  fill("#fcf6bd")
  ellipse(mouseX+50,mouseY-50,50) //右邊耳
  if(mouseIsPressed){ //如果滑鼠被按下
    fill("#ffafcc")
    ellipse(mouseX-25,mouseY-25,20) //左邊眼
    ellipse(mouseX+25,mouseY-25,20)
    fill("#d90429")
    ellipse(mouseX,mouseY+25,40) //嘴
  }
  pop()

}

function drawface(face_clr=255,eye_clr=0,size=1){ //預設值
  push()

      //translate(random(width),random(height))
      scale(size) 

      //文字框的顯示格式 
      fill("#10002b")
      textSize(50)
      text(txts,0,500)

      fill(face_clr)
      push() 
      // 左手
      rotate(PI/6) 
      ellipse(150,160,60,180) 
      pop()
      //  右手
      push()
      rotate(PI/3) 
      ellipse(310,-110,180,60)
      pop()

      // 左腳
      ellipse(120,320,60,200)
      // 右腳
      ellipse(180,320,60,200)
      // 身體
      ellipse(150,240,200,240)
      //頭
      ellipse(150,100,100,70)
      // 眼睛
      fill(eye_clr)
      ellipse(125,100,15)
      ellipse(175,100,15)
      // 嘴巴
      line(125,100,175,100)

    pop()
}

function mousePressed(){
  // 不大於五十不產生新物件
  if(mouseY>50){
  //產生新物件
  pos_x.push(mouseX)
  pos_y.push(mouseY)
  sizes.push(random(0.3,1.2))
  colors.push(face_colors[int(random(face_colors.length))])
  v_y.push(random(-1,1)) //速度
}
}
function face_move(){
  face_move_var = true
}

function face_stop(){
  face_move_var = false
}

function voice_go(){
  myRec.onResult = showResult //取得語音後辨識
  myRec.start()
}

function showResult(){
  if(myRec.resultValue == true)
  {
    print(myRec.resultValueing)
    if(myRec.resultValueing.indexOf("走")!==-1){
      face_move_var = true
    }
  }
}

function music_go(){
 sound1.play()
}

function mouseIsPressed(){
if(colors["#ffffff"]){}
    // fill(255)
    // arc(pos_x[i]+125,pos_y[i]+100,sizes[i],sizes[i],0,PI)
   
   else{
    colors[i]
   }
  }