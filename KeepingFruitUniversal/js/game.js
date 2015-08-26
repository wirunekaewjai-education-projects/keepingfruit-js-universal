
game.onstart = function ()
{
    options.debugmode = false;

    node.load(startSceneProperties());
    node.load(highScoreSceneProperties());
    node.load(heartProperties);

    var self = this;

    var spawnDelay = 50;
    var spawnDelayCount = 50;

    // sounds //
    var success = new soundfx('sounds/collide.mp3', 5);
    var failed = new soundfx('sounds/buzzer.mp3', 10);

    var fruits = [];
    var isEnded = true;
    var inPlayingScene = false;

    var score = 123456789;

    var scoreMultiplier = 1;
    var comboCount = 0;
    var allComboCount = 0;
    var clickedObject = null;
    var basketDirX = 1;

    var scoreText = node.load(scoreTextSrc);
    var pName = '';

    var isShowKeyboard = false;

    function initialize()
    {
        failed.volume = 0.07;

        for (var i = 1; i < 4; i++)
        {
            var fruit = node.load(eval('fruitSrc.fruit_0' + i));
            fruits.push(fruit);
        }
        sc1_melon.playAndLoop('roll');
        sc1_melon.onUpdate = function ()
        {
            this.move(.5, 0);
            if (this.translation().x > 55)
            {
                this.translation(-55, -33);
            }
        }

        sc1_startbtn.onclick = function ()
        {
            showPlayScene();
        }
        sc1_scorebtn.onclick = function ()
        {
            showHighScoreScene();
        }
        sc3_backbtn.onclick = function ()
        {
            showMainMenuScene();
        }

        self.showScene(sc1);
    }
    initialize();

    function showMainMenuScene()
    {
        if (isEnded)
        {
            inPlayingScene = false;
            self.showScene(sc1);
        }
    }
    function showPlayScene()
    {
        if (isEnded)
        {
            inPlayingScene = true;
            isEnded = false;
            spawnDelay = 50;
            spawnDelayCount = 50;
            score = 0;
            comboCount = 0;

            node.load(playingSceneProperties());
            
            var heartWidth = sc2_hearts.scaling().width / 10.5;

            heart.scaling(heartWidth, 100);
            heart.translation(-50 + (heartWidth / 2), 0);

            for (var i = 0; i < 10; i++)
            {
                var c = heart.clone();
                c.move((heartWidth + 1.75) * i, 0);
                sc2_hearts.addChild(c);
            }

            sc2_bg.clickable = true;
            sc2_bg.onclick = function ()
            {
                clickedObject = null;
            }

            sc2.onkeypress = function (key)
            {
                if (isEnded && inPlayingScene)
                {
                    if (key == 'backspace')
                    {
                        if (pName.length > 0)
                        {
                            pName = pName.substring(0, pName.length - 1);
                        }
                    }
                    else if (pName.length <= 16)
                    {
                        pName += key;
                    }
                }
                //trace(key);
            }

            sc2_backbtn.onclick = function ()
            {
                isEnded = true;
                showMainMenuScene();
            }

            sc2.onUpdate = function ()
            {
                if (isEnded)
                {
                    
                }
                else
                {

                    sc2_score.text = score.toString();
                    //trace(sc2_basket.rawTranslation());
                    var basketPos = sc2_basket.translation();
                    if (basketPos.x < -40 || basketPos.x > 40)
                    {
                        basketDirX *= -1;
                    }
                    sc2_basket.move(basketDirX * 0.5, 0);

                    if (comboCount > 0)
                    {
                        if (comboCount % 5 == 0)
                        {
                            scoreMultiplier += 0.3 * (allComboCount / 5);
                            score = parseFloat(score) + ((allComboCount / 5) * 100);
                            comboCount = 0;
                        }
                        if (comboCount % 10 == 0 && sc2_hearts.childCount() < 6)
                        {
                            var heartWidth = sc2_hearts.scaling().width / 10.5;

                            heart.scaling(heartWidth, 100);
                            heart.translation(-50 + (heartWidth / 2), 0);

                            var c = heart.clone();
                            c.move((heartWidth + 1.75) * sc2_hearts.childCount() - 1, 0);
                            sc2_hearts.addChild(c); 0;
                            comboCount = 0;
                        }
                    }
                    

                    if (clickedObject != null)
                    {
                        
                        if (!clickedObject.isDragging)
                        {
                            if (node.intersect(sc2_basket, clickedObject))
                            {
                                score += 100 * scoreMultiplier;
                                sc2.midground.removeChild(clickedObject);


                                allComboCount++;
                                comboCount++;

                                success.play();
                            }

                            clickedObject = null;
                        }
                        else
                        {
                            if (node.intersect(sc2_basket, clickedObject))
                            {
                                sc2_basket.playOnce('hover');
                            }
                            else
                                sc2_basket.playOnce('idle');
                        }

                    }
                    // Spawning
                    spawnDelayCount -= 0.5;
                    if (spawnDelayCount <= 0)
                    {
                        var c = fruits[Math.floor(Math.random() * 3)].clone();
                        c.translation(-35 + (Math.random() * 50), 60);
                        sc2.midground.addChild(c);

                        c.clickable = false;
                        c.onUpdate = function ()
                        {
                            if (c.isDragging)
                            {
                                clickedObject = c;
                            }
                        }

                        spawnDelayCount = spawnDelay;
                        if (spawnDelay > 25)
                        {
                            spawnDelay -= 0.4;
                        }
                    }
                    // removing collided fruit(s)
                    for (var i = 0; i < sc2.midground.childCount() ; i++)
                    {
                        var child = sc2.midground.getChild(i);

                        if (!child.isDragging)
                        {
                            child.move(0, -0.25);

                            if (child.translation().y < -32)
                            {
                                sc2.midground.removeChildAt(i);

                                if (sc2_hearts.childCount() > 0)
                                {
                                    sc2_hearts.removeChildAt(sc2_hearts.childCount() - 1);
                                }

                                failed.play();
                                spawnDelay += 2;
                                comboCount = 0;
                                allComboCount = 0;
                                scoreMultiplier = 1;
                            }
                        }

                    }


                    if (sc2_hearts != null && sc2_hearts.childCount() <= 0)
                    {
                        sc2.hud.removeChild(sc2_scorebg);
                        sc2.hud.removeChild(sc2_lifebg);

                        var prompt = node.load(promptProperties);
                        sc2.hud.addChild(prompt);

                        pName = '';
                        prompt.onUpdate = function ()
                        {
                            if (isEnded)
                            {
                                prompt_name.text = '' + pName;
                            }
                        }
                        prompt_okbtn.onclick = function ()
                        {
                            function showResult()
                            {
                                addHighScore(pName, score, 1);

                                sc2.hud.removeChild(prompt_bg);
                                node.load(msgboxProperties);
                                sc2.hud.addChild(msgbox_bg);
                                msgbox_score.text = 'Score : ' + score.toString();

                                msgbox_menubtn.onclick = function ()
                                {
                                    showMainMenuScene();
                                }
                                msgbox_retrybtn.onclick = function ()
                                {
                                    showPlayScene();
                                }

                                msgbox_name.text = 'Name : '+pName;
                            }
                            
                            if (pName.length > 0)
                            {
                                showResult();
                            }

                            //Windows.UI.Immersive.InputPane.getForCurrentView().addEventListener("hiding", onInputPaneHiding);
                        }


                        isEnded = true;
                    }
                }
            }
            self.showScene(sc2);
        }
    }

    function showHighScoreScene()
    {
        inPlayingScene = false;
        sc3_scorelist.clearChildren();

        for (var i = 1; i <= 10; i++)
        {
            var moveY = -10 * (i-1);

            var scrLeft = sc3_scoreText.clone();
            var srcRight = sc3_scoreText.clone();

            scrLeft.move(0, moveY);

            srcRight.textAlign = 'center';
            srcRight.translation(25, 45);
            srcRight.move(0, moveY);

            sc3_scorelist.addChild(scrLeft);
            sc3_scorelist.addChild(srcRight);

            if (i <= localStorage.length)
            {
                var item = localStorage.getItem(i);
                var arr = item.toString().split(':*:*:');

                scrLeft.text = (i) + '. ' + arr[0];
                srcRight.text = arr[1];
            }
            else
            {
                scrLeft.text = (i) + '. -';
                srcRight.text = '-';
            }
        }


        self.showScene(sc3);
    }
}

function addHighScore(playerName, playerScore, index)
{
    if (index <= 10)
    {
        if (localStorage.getItem(index))
        {
            var item = localStorage.getItem(index);
            var arr = item.toString().split(':*:*:');
            var score = arr[1];

            if (parseFloat(playerScore) > parseFloat(score))
            {
                localStorage.setItem(index, playerName + ':*:*:' + playerScore);
                addHighScore(arr[0], arr[1], index + 1);
            }
            else
            {
                addHighScore(playerName, playerScore, index + 1);
            }
        }
        else
        {
            localStorage.setItem(index, playerName + ':*:*:' + playerScore);
        }
    }
}


// Handle the showing event.
function onInputPaneShowing(e)
{
    var occludedRect = e.occludedRect;

    // For this hypothetical application, the developer decided that 400 pixels is
    // the minimum height that will work for the current layout. When the
    // app gets the InputPaneShowing message, the pane is beginning to animate in.

    if (occludedRect.Top < 400)
    {
        // In this scenario, the developer decides to remove some elements (perhaps
        // a fixed navbar) and dim the screen to give focus to the text element.
        var elementsToRemove = document.getElementsByName("extraneousElements");

        // The app developer is not using default framework animation.
        _StartElementRemovalAnimations(elementsToRemove);
        _StartScreenDimAnimation();
    }

    // This developer doesn't want the framework’s focused element visibility
    // code/animation to override the custom logic.
    e.ensuredFocusedElementInView = true;
}

// Handle the hiding event.
function onInputPaneHiding(e)
{
    // In this case, the Input Pane is dismissing. The developer can use 
    // this message to start animations.
    if (_ExtraElementsWereRemoved())
    {
        _StartElementAdditionAnimations();
    }

    // Don't use framework scroll- or visibility-related 
    // animations that might conflict with the app's logic.
    e.ensuredFocusedElementInView = true;
}