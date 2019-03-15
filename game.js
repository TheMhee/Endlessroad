
        function start(){
            run.style.filter = 'grayscale(0)'
            car = window.getComputedStyle(document.querySelector('#player'));
            slow = document.querySelector('slow');
            carx = 80;
            cary = 10;
            speedcarx = 0.35
            speedcary = 0.15
            speedroad = 1
            speedenemy = 0.5
            speedspawn = 800
            enemytop = [-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15];
            enemyleft = [1,7.25,13.5,20,1,7.25,13.5,20,1,7.25,13.5,20,1,7.25,13.5,20];
            enemystatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            colors = ['red','blue','purple','green']
            key = {};
            lane = [0,0,0,0];
            sc = 0;
            brainbreak = 0;
            lock = 0
            brain = 14;
            fill = 0;
            check = 0;
            bbreak = 0;
            carbottom = 0;
        }

        function runroad(){
        var roadx = 0;
        setInterval(function(){
            roadx+=speedroad;
            run.style.backgroundPosition = '0px '+roadx+'vh';
            if (roadx>=110) {roadx=0;}
            }, 1);
        }
        cbefore = -1
        c = -1
        before = -1
        x = -1
        function game(){
            sp = setInterval(spawn, speedspawn);
            var i;
            setInterval(function(){
                carbottom++;
                for(i=0;i<16;i++){
                    if(enemystatus[i] == 1){
                        enemytop[i] += speedenemy;
                    }
                    if(enemytop[i] >= 100){
                        enemytop[i] = -15;
                        enemystatus[i] = 0;
                    }
                }
            },10)
        }

        function enecar(){
            var j;
            for(j=0;j<16;j++){
                c = Math.floor(Math.random() * 5);
                document.querySelector('enemy:nth-child('+(j+1)+')').style.backgroundImage = "url('img/car"+(c+1)+".png')"
            }
        }
        enecar();
        setInterval(enecar(),20);

        function spawn() {
            while(before == x){
                x = Math.floor(Math.random() * 12);
            }
            before = x;
            enemystatus[x] = 1;
        }

        function stopspawn() {
            clearInterval(sp);
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
            else if(a == 'Space'){
                key['Space'] = false;
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
            else if(a == 'Space'){
                key['Space'] = true;
            }

        }
        //เช็ค Inputการเครื่องไหวตลอดเวลา พร้อมอัพเดท

        function move(){

            if(carx<87&&carx>0)carx+=0.1;

            if(key['Up']&&carx>1){
                carx-=speedcarx;
                if((key['Right'])&&cary<20.5){
                cary+=speedcary;
                }
                else if(key['Left']&&cary>0.5){
                cary-=speedcary;
                }
            }
            else if(key['Down']&&carx<87){
                carx+=speedcarx;
                if((key['Right'])&&cary<20.5){
                cary+=speedcary;
                }
                else if(key['Left']&&cary>0.5){
                cary-=speedcary;
                }
            }
            else if((key['Right'])&&cary<20.5){
                cary+=speedcary;
            }
            else if(key['Left']&&cary>0.5){
                cary-=speedcary;
            }
        }

        setInterval(function(){
                if(key['Space']==true && bbreak == 0){
                    lock = 0;
                    fill = 2;
                    brain -= 0.058;
                }

                if(key['Space']==true && brainbreak == 0 && brain>0 && bbreak == 0){
                    run.style.filter = 'grayscale(0.8)'
                    run.style.transition = 'filter 0.5s'
                    speedcarx *= 0.8;
                    speedcary *= 0.8;
                    speedroad *= 0.5;
                    speedenemy *= 0.5;
                    slowspawn = speedspawn*2;
                    if(brainbreak == 0)
                        stopspawn();
                    brainbreak = 1;
                    sp = setInterval(spawn, slowspawn);
                }

                else if((key['Space']==false && brainbreak == 1)||(brain<=0 && brainbreak == 1)){
                    lock = 1;
                    bbreak = 1;
                    if(fill >= 50){fill = 1}
                    run.style.filter = 'grayscale(0)'
                    run.style.transition = 'filter 0.5s'

                    speedcarx /= 0.8;
                    speedcary /= 0.8;
                    speedroad /= 0.5;
                    speedenemy /= 0.5;
                    if(brainbreak == 1)
                        stopspawn();
                    brainbreak = 0;
                    sp = setInterval(spawn, speedspawn);
                    lock = 1;
                    setTimeout(function(){fill = 1},3000)
                    slow.style.filter = 'grayscale(1)';
                    slow.style.transition = 'filter 0.2s'
                }
                if(fill == 1 && brain < 14){
                    brain += 0.058*5;
                    bbreak = 1;

                }
                if(brain >= 14){
                    bbreak = 0;
                    slow.style.filter = 'grayscale(0)';
                    slow.style.transition = 'filter 0.2s'
                }

                console.log(brain);
                slow.style.width = brain+"vw";
            },10)

        function update(){
            player.style.top = carx+'vh';
            player.style.left = cary+'vw';
            for(i=0;i<16;i++)
                document.querySelector('enemy:nth-child('+(i+1)+')').style.top = enemytop[i]+"vh";
            ustat = 1;
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
                        if(lane[0]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            start();
                            alert("LOL");
                            update();
                        }
                    if(i == 1 || i == 5 || i == 9 || i == 13)
                        if(lane[1]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            start();
                            alert("LOL");
                            update();
                        }
                    if(i == 2 || i == 6 || i == 10 || i == 14)
                        if(lane[2]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            start();
                            alert("LOL");
                            update();
                        }
                    if(i == 3 || i == 7 || i == 11 || i == 15)
                        if(lane[3]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            start();
                            alert("LOL");
                            update();
                        }

                }
            },10)

        function time(){
            setInterval(function(){
                sc += 0.01;
                sec = sc.toFixed(2).split('.')[0];
                milsec = sc.toFixed(2).split('.')[1];
                score.innerText = sec+':'+milsec;
            },10)
        }
        time()
        start()
        runroad();
        game();
