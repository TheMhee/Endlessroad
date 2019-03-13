
        function start(){
            car = window.getComputedStyle(document.querySelector('#player'));
            carx = 80;
            cary = 10;
            enemytop = [-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15];
            enemyleft = [1,7.25,13.5,20,1,7.25,13.5,20,1,7.25,13.5,20,1,7.25,13.5,20];
            enemystatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            colors = ['red','blue','purple','green']
            key = {};
            lane = [0,0,0,0];
            sc = 0;
        }

        function runroad(){
        var roadx = 0;
        setInterval(function(){
            roadx+=1;
            run.style.backgroundPosition = '0px '+roadx+'vh';
            if (roadx>=110) {roadx=0;}
            console.log(roadx)
            }, 1);
        }
        before = -1
        x = -1
        function game(){
            setInterval(function(){
                while(before == x)
                    x = Math.floor(Math.random() * 12)
                before = x;
                var c = Math.floor(Math.random() * 4)
                enemystatus[x] = 1;
            },400)

            var i;
            setInterval(function(){
                for(i=0;i<16;i++){
                    if(enemystatus[i] == 1){
                        enemytop[i] += 1.3;
                    }
                    if(enemytop[i] >= 100){
                        enemytop[i] = -15;
                        enemystatus[i] = 0;
                    }
                }
            },10)

        }

        //รับข้อมูลเมื่อปล่อยลูกศร
        window.onkeyup = function(event) { 
            var a = event.code;
            if(a == 'ArrowUp'|| a == 'KeyW'){
                key['Up'] = false;
            }
            else if(a == 'ArrowDown'|| a == 'KeyS'){
                 key['Down'] = false;
            }
            else if(a == 'ArrowRight'|| a == 'KeyD'){
                key['Right'] = false;
            }
            else if(a == 'ArrowLeft'|| a == 'KeyA'){
                key['Left'] = false;
            }
        }
        //รับข้อมูลเมื่อกดลูกศร
        window.onkeydown = function(event) { 
            var a = event.code;
            if(a == 'ArrowUp'|| a == 'KeyW'){
                key['Up'] = true;
            }
            else if(a == 'ArrowDown'|| a == 'KeyS'){
                 key['Down'] = true;
            }
            else if(a == 'ArrowRight'|| a == 'KeyD'){
                key['Right'] = true;
            }
            else if(a == 'ArrowLeft'|| a == 'KeyA'){
                key['Left'] = true;
            }

        }
        //เช็ค Inputการเครื่องไหวตลอดเวลา พร้อมอัพเดท

        function move(){

            if(carx<87&&carx>0)carx+=0.1;

            if(key['Up']&&carx>1){
                carx-=0.5;
                if((key['Right'])&&cary<20.5){
                cary+=0.22;
                }
                else if(key['Left']&&cary>0.5){
                cary-=0.22;
                }
            }
            else if(key['Down']&&carx<87){
                carx+=0.8;
                if((key['Right'])&&cary<20.5){
                cary+=0.22;
                }
                else if(key['Left']&&cary>0.5){
                cary-=0.22;
                }
            }
            else if((key['Right'])&&cary<20.5){
                cary+=0.22;
            }
            else if(key['Left']&&cary>0.5){
                cary-=0.22;
            }
        }

        function update(){
            player.style.top = carx+'vh';
            player.style.left = cary+'vw';
            for(i=0;i<16;i++)
                document.querySelector('enemy:nth-child('+(i+1)+')').style.top = enemytop[i]+"vh";
            ustat = 1
        }

        setInterval(function(){
            move();
            update();
            if(ustat == 1){
                if (cary < 6.2){
                    lane[0] = 1;
                }
                if (cary > 6.2&&cary<12.6){
                    lane[0] = 0;
                    lane[1] = 1;
                }
                if (cary+4 < 6.2){
                    lane[1] = 0;
                }
                if (cary+4 > 6.2&&cary+4<12.6){
                    lane[1] = 1;
                }

                if (cary > 6.2&&cary < 12.6){
                    lane[1] = 1;
                }
                if (cary > 12.6&&cary<19){
                    lane[1] = 0;
                    lane[2] = 1;
                }

                if (cary+4 < 12.6){
                    lane[2] = 0;
                }
                if (cary+4 > 12.6){
                    lane[2] = 1;
                }

                if (cary > 12.6&&cary < 19){
                    lane[2] = 1;
                }
                if (cary > 19){
                    lane[2] = 0;
                    lane[3] = 1;
                }
                if (cary < 19){
                    lane[3] = 0;;
                }
                if (cary+4 < 19){
                    lane[3] = 0;
                }
                if (cary+4 > 19){
                    lane[3] = 1;
                }
                ustat = 0;
            }
                for(i=0;i<16;i++){
                    if(i == 0 || i == 4 || i == 8 || i == 12)
                        if(lane[0]==1&&enemytop[i]+12 > carx&&enemytop[i] < carx+12&&enemyleft[i]+0.2<cary+4&&enemyleft[i]+4 > cary+0.2){
                            start();
                            alert("LOL");
                            update();
                        }
                    if(i == 1 || i == 5 || i == 9 || i == 13)
                        if(lane[1]==1&&enemytop[i]+12 > carx&&enemytop[i] < carx+12&&enemyleft[i]+0.2<cary+4&&enemyleft[i]+4 > cary+0.2){
                            start();
                            alert("LOL");
                            update();
                        }
                    if(i == 2 || i == 6 || i == 10 || i == 14)
                        if(lane[2]==1&&enemytop[i]+12 > carx&&enemytop[i] < carx+12&&enemyleft[i]+0.2<cary+4&&enemyleft[i]+4 > cary+0.2){
                            start();
                            alert("LOL");
                            update();
                        }
                    if(i == 3 || i == 7 || i == 11 || i == 15)
                        if(lane[3]==1&&enemytop[i]+12 > carx&&enemytop[i] < carx+12&&enemyleft[i]+0.2<cary+4&&enemyleft[i]+4 > cary+0.2){
                            start();
                            alert("LOL");
                            update();
                        }

                }
            },10)
        function time(){
            setInterval(function(){
                sc += 0.01;
                score.innerText = "score : "+sc.toFixed(2);
            },10)
        }
        /*setInterval(function(){
                console.log(enemystatus);
            },1000)*/
        time()
        start()
        runroad();
        game();
