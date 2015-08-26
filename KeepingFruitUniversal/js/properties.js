var sceneProperties =
    {
        name: 'Scene',
        background: [], // Background Layer
        midground: [], // Midground Layer
        foreground: [], // Foreground Layer
        hud: [] // Head-up Display Layer (User Interface)
    };

function startSceneProperties()
{
    var s = Object.create(sceneProperties);
    s.name = 'sc1';
    s.background =
        [
            {
                name: 'sc1_bg',
                imageSrc: 'images/startscreen/background.png',
                
            }
        ];

    s.midground =
        [
            {
                name: 'sc1_footer',
                imageSrc: 'images/startscreen/footer.png',
                scaling:
                    {
                        width: 100, height: 18
                    },
                translation:
                    {
                        x: 0, y: -41
                    },
            },
            {
                name: 'sc1_melon',
                imageSrc: 'images/startscreen/watermelon_rolling.png',
                frameCount: 7,
                animationClips:
                [
                    {
                        name: 'roll', start: 1, stop: 7
                    },
                ],
                scaling:
                    {
                        width: 5, height: resolution.aspectRatio * 5
                    },
                translation:
                    {
                        x: -55, y: -33
                    },
            }
        ];

    s.foreground = 
        [
            {
                name: 'sc1_logo',
                imageSrc: 'images/startscreen/logo.png',
                scaling:
                    {
                        width: 35, height: 18 * resolution.aspectRatio
                    },
                translation:
                    {
                        x: 0, y: 30
                    },
            }
        ];

    s.hud =
        [
            {
                name: 'sc1_startbtn',
                imageSrc: 'images/startscreen/start_button.png',
                frameCount: 2,
                animationClips:
                    [
                        {
                            name: 'idle', start: 1, stop: 1
                        },
                        {
                            name: 'hover', start: 2, stop: 2
                        },
                    ],
                scaling:
                    {
                        width: 25, height: 12
                    },
                clickable: true,
            },
            {
                name: 'sc1_scorebtn',
                imageSrc: 'images/startscreen/score_button.png',
                frameCount: 2,
                animationClips:
                    [
                        {
                            name: 'idle', start: 1, stop: 1
                        },
                        {
                            name: 'hover', start: 2, stop: 2
                        },
                    ],
                scaling:
                    {
                        width: 25, height: 12
                    },
                translation:
                    {
                        x : 0, y: -15
                    },
                clickable: true,
            }
        ];

    return s;
}

//////////////////////////////////////////////////////////////////////////////////////

function playingSceneProperties()
{
    var s = Object.create(sceneProperties);
    s.name = 'sc2';
    s.background =
        [
            {
                name: 'sc2_bg',
                imageSrc: 'images/playingscreen/background.png',
            }
        ];

    s.midground =
        [

        ];

    s.foreground =
        [
            {
                name: 'sc2_basket',
                imageSrc: 'images/playingscreen/basket.png',
                translation: { x: -40, y: -45 },
                scaling: { width: 10, height: 10 * resolution.aspectRatio },
                frameCount: 2,
                animationClips:
                    [
                        { name: 'idle', start: 1, stop: 1 },
                        { name: 'hover', start: 2, stop: 2 },
                    ],
                clickable:true,
            },
        ];

    s.hud =
        [
            {
                name: 'sc2_backbtn',
                imageSrc: 'images/playingscreen/back_button.png',
                translation: { x: -47, y: 45 },
                scaling: { width: 4, height: 4 * resolution.aspectRatio },
                frameCount: 2,
                animationClips:
                    [
                        { name: 'idle', start: 1, stop: 1 },
                        { name: 'hover', start: 2, stop: 2 },
                    ],
                clickable: true,
            },
            {
                name: 'sc2_scorebg',
                imageSrc: 'images/playingscreen/thumbnail_background.png',
                translation: { x: 41, y: 43 },
                scaling: { width: 17, height: 7 * resolution.aspectRatio },
                children:
                    [
                        {
                            name: 'sc2_scorelabel',
                            text: '- Score -',
                            font:'forte',
                            fontSize: 34,
                            textColor: 'white',
                            textAlign: 'center',
                            translation: { x: 0, y: 24 },
                        },
                        {
                            name: 'sc2_score',
                            text: '0', // max 12 characters
                            font: 'forte',
                            fontSize: 25,
                            textColor: 'white',
                            textAlign: 'center',
                            translation: { x: 0, y: -25 },
                        },
                    ],
            },
            {
                name: 'sc2_lifebg',
                imageSrc: 'images/playingscreen/thumbnail_background.png',
                translation: { x: 41, y: 30 },
                scaling: { width: 17, height: 5 * resolution.aspectRatio },
                children:
                    [
                        {
                            name: 'sc2_lifelabel',
                            text: '- Life -',
                            font: 'forte',
                            fontSize: 25,
                            textColor: 'white',
                            textAlign: 'center',
                            translation: { x: 0, y: 24 },
                        },
                        {
                            name: 'sc2_hearts',
                            translation: { x: 0, y: -25 },
                            scaling: { width: 90, height: 25 },
                        }
                    ],
            },
        ];

    return s;
}

function highScoreSceneProperties()
{
    var s = Object.create(sceneProperties);
    s.name = 'sc3';
    s.background =
        [
            {
                name: 'sc3_bg',
                imageSrc: 'images/startscreen/background.png',
            }
        ];

    s.midground =
        [

        ];

    s.foreground =
        [

        ];

    s.hud =
        [
            {
                name: 'sc3_backbtn',
                imageSrc: 'images/playingscreen/back_button.png',
                translation: { x: -47, y: 45 },
                scaling: { width: 4, height: 4 * resolution.aspectRatio },
                frameCount: 2,
                animationClips:
                    [
                        { name: 'idle', start: 1, stop: 1 },
                        { name: 'hover', start: 2, stop: 2 },
                    ],
                clickable: true,
            },
            {
                name: 'sc3_scorebg',
                imageSrc: 'images/highscorescreen/thumbnail.png',
                scaling: { width: 44, height: 44 * resolution.aspectRatio },
                children:
                    [
                        {
                            name: 'sc3_scorelabel',
                            text: '- High Score -',
                            font: 'forte',
                            fontSize: 36,
                            textColor: 'white',
                            textAlign: 'center',
                            translation: { x: 0, y: 43 },
                        },
                        {
                            name: 'sc3_scorelist',
                            translation: { x: 0, y: -7 },
                            scaling: { width: 90, height: 86 },
                        },
                    ],
            },
        ];

    return s;
}

var fruitSrc =
    {
        fruit_01: {
            name: 'banana',
            imageSrc: 'images/playingscreen/fruits/fruit_01.png',
            scaling: { width: 5, height: 5 * resolution.aspectRatio },
            draggable:true,
        },
        fruit_02: {
            name: 'watermelon',
            imageSrc: 'images/playingscreen/fruits/fruit_02.png',
            scaling: { width: 5, height: 5 * resolution.aspectRatio },
            draggable: true,
        },
        fruit_03: {
            name: 'pineapple',
            imageSrc: 'images/playingscreen/fruits/fruit_03.png',
            scaling: { width: 5, height: 5 * resolution.aspectRatio },
            draggable: true,
        },
    };

var heartProperties =
    {
        name: 'heart',
        imageSrc: 'images/playingscreen/heart.png'
        
    };

var msgboxProperties = 
    {
        name: 'msgbox_bg',
        imageSrc: 'images/playingscreen/msgbox.png',
        scaling: { width: 30, height: 18 * resolution.aspectRatio },
        children:
            [
                {
                    name: 'msgbox_label',
                    text: '- Result -',
                    font: 'forte',
                    fontSize: 35,
                    textColor: 'white',
                    textAlign: 'center',
                    translation: { x: 0, y: 35 },
                },
                {
                    name: 'msgbox_name',
                    text: 'Name : Player',
                    font: 'forte',
                    fontSize: 27,
                    textColor: 'white',
                    textAlign: 'center',
                    translation: { x: 0, y: 12 },
                },
                {
                    name: 'msgbox_score',
                    text: 'Score : 0',
                    font: 'forte',
                    fontSize: 27,
                    textColor: 'white',
                    textAlign: 'center',
                    translation: { x: 0, y: -5 },
                },

                {
                    name: 'msgbox_menubtn',
                    imageSrc: 'images/playingscreen/goto_menu.png',
                    translation: { x: -25, y: -32 },
                    scaling: { width: 32, height: 16 * resolution.aspectRatio },
                    frameCount: 2,
                    animationClips:
                        [
                            { name: 'idle', start: 1, stop: 1 },
                            { name: 'hover', start: 2, stop: 2 },
                        ],
                },
                {
                    name: 'msgbox_retrybtn',
                    imageSrc: 'images/playingscreen/retry.png',
                    translation: { x: 25, y: -32 },
                    scaling: { width: 32, height: 16 * resolution.aspectRatio },
                    frameCount: 2,
                    animationClips:
                        [
                            { name: 'idle', start: 1, stop: 1 },
                            { name: 'hover', start: 2, stop: 2 },
                        ],
                },
            ]
    }

var promptProperties =
    {
        name: 'prompt_bg',
        imageSrc: 'images/playingscreen/msgbox.png',
        scaling: { width: 30, height: 18 * resolution.aspectRatio },
        children:
            [
                {
                    name: 'prompt_label',
                    text: 'Enter Your Name !!!',
                    font: 'forte',
                    fontSize: 35,
                    textColor: 'white',
                    textAlign: 'center',
                    translation: { x: 0, y: 35 },
                },
                {
                    name: 'prompt_name',
                    text: 'Click to change name',
                    font: 'forte',
                    fontSize: 27,
                    textColor: 'white',
                    textAlign: 'center',
                    translation: { x: 0, y: 12 },
                },
                {
                    name: 'prompt_name_underline',
                    text: '---------------------------------',
                    font: 'forte',
                    fontSize: 27,
                    textColor: 'white',
                    textAlign: 'center',
                    translation: { x: 0, y: 5 },
                },
                {
                    name: 'prompt_okbtn',
                    imageSrc: 'images/playingscreen/ok.png',
                    translation: { x: 0, y: -32 },
                    scaling: { width: 32, height: 16 * resolution.aspectRatio },
                    frameCount: 2,
                    animationClips:
                        [
                            { name: 'idle', start: 1, stop: 1 },
                            { name: 'hover', start: 2, stop: 2 },
                        ],
                    clickable: true,
                },
            ]
    }

var scoreTextSrc =
    {
        name: 'sc3_scoreText',
        text: '0', // max 12 characters
        font: 'forte',
        fontSize: 28,
        textColor: 'white',
        textAlign: 'left',
        translation: { x: -50, y: 45 },
    };