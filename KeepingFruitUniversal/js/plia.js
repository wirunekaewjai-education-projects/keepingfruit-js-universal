
/* 
    'plia.js' is a library for Canvas 2D Game from Plia Studio.
    
    Created by Wirune Kaewjai.
*/

// Math & Collection class (Matrix3x3, Rectangle, Vector2D, Size2D, HashMap)
mat3 = function ()
{
    // It's Empty class, because matrix3x3 storing in Array. (Used by node class)
}
mat3.identity = function ()
{
    return new Array(1, 0, 0, 0, 1, 0, 0, 0, 1);
}
mat3.multiply = function (lhs, rhs)
{
    var arr = [];
    arr[0] = (lhs[0] * rhs[0]) + (lhs[3] * rhs[1]) + (lhs[6] * rhs[2]);
    arr[1] = (lhs[1] * rhs[0]) + (lhs[4] * rhs[1]) + (lhs[7] * rhs[2]);
    arr[2] = (lhs[2] * rhs[0]) + (lhs[5] * rhs[1]) + (lhs[8] * rhs[2]);

    arr[3] = (lhs[0] * rhs[3]) + (lhs[3] * rhs[4]) + (lhs[6] * rhs[5]);
    arr[4] = (lhs[1] * rhs[3]) + (lhs[4] * rhs[4]) + (lhs[7] * rhs[5]);
    arr[5] = (lhs[2] * rhs[3]) + (lhs[5] * rhs[4]) + (lhs[8] * rhs[5]);

    arr[6] = (lhs[0] * rhs[6]) + (lhs[3] * rhs[7]) + (lhs[6] * rhs[8]);
    arr[7] = (lhs[1] * rhs[6]) + (lhs[4] * rhs[7]) + (lhs[7] * rhs[8]);
    arr[8] = (lhs[2] * rhs[6]) + (lhs[5] * rhs[7]) + (lhs[8] * rhs[8]);

    return arr;
}
mat3.copy = function (src, dst)
{
    for (var i = 0; i < src.length; i++)
    {
        dst[i] = src[i];
    }
}
rect = function (x, y, width, height)
{
    this.x = (x != undefined) ? x : 0;
    this.y = (y != undefined) ? y : 0;
    this.width = (width != undefined) ? width : 0;
    this.height = (height != undefined) ? height : 0;
    this.set = function (x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    this.clone = function ()
    {
        return new rect(_x, _y, _width, _height);
    }
}
rect.intersect = function (a, b)
{
    var aleft = a.x;
    var aright = a.x + a.width;
    var atop = a.y;
    var abottom = a.y + a.height;

    var bleft = b.x;
    var bright = b.x + b.width;
    var btop = b.y;
    var bbottom = b.y + b.height;

    var b1 = bleft > aright;
    var b2 = aleft > bright;
    var b3 = bbottom < atop;
    var b4 = abottom < btop;

    var bb = !(b1 || b2 || b3 || b4);
    return bb;
}
vec2d = function (x, y)
{
    this.x = (x != undefined) ? x : 0;
    this.y = (y != undefined) ? y : 0;

    this.set = function (x, y)
    {
        if (x != undefined)
            this.x = x;

        if (y != undefined)
            this.y = y;
    }

    this.toString = function ()
    {
        return 'X : ' + this.x + ', Y : ' + this.y;
    }
}
size2d = function (width, height)
{
    this.width = (width != undefined) ? width : 0;
    this.height = (height != undefined) ? height : 0;

    this.set = function (width, height)
    {
        if (width != undefined)
            this.width = width;

        if (height != undefined)
            this.height = height;
    }

    this.toString = function ()
    {
        return 'Width : ' + this.width + ', Height : ' + this.height;
    }
}
hashmap = function ()
{
    var list = new Array();

    this.put = function (key, value)
    {
        for (var i = 0; i < list.length; i++)
        {
            if (list[i].key == key)
            {
                list[i].key = key;
                list[i].value = value;
                return true;
            }
        }

        list.push(
            {
                key: key,
                value: value
            });
        return true;
    }

    this.get = function (key)
    {
        for (var i = 0; i < list.length; i++)
        {
            if (list[i].key == key)
                return list[i].value;
        }
    }

    this.remove = function (key)
    {
        for (var i = 0; i < list.length; i++)
        {
            if (list[i].key == key)
            {
                list.splice(i, 1);
                break;
            }
        }
    }

    this.length = function count()
    {
        return list.length;
    }

    this.getItemByIndex = function (index)
    {
        return list[i];
    }
}
// Animation clip used by 'sprite' to store keyframes.
animationClip = function (start, stop)
{
    this.start = start; // First keyframe to play animation clip.
    this.stop = stop; // Last keyframe to play animation clip.
}

//////////////////// Starting Node Hierarchy Class ////////////////////
// Class node : base class of game object.
node = function (name)
{
    var _children = []; // Store Children Node (Used to create Tree Hierarchy)

    this.name = (name != undefined) ? name : 'node'; // Node name. (Should be Unique, because you can finding node from function 'find()' with name).

    this.localMatrix = mat3.identity(); // Local Space Transformation Matrix
    this.globalMatrix = mat3.identity(); // World Space Transformation Matrix
    this.boundingBox = new rect(0, 0, 100, 100); // Bound Space of Node. (Rectangle Shape)

    this.onkeypress = null;
    this.onclick = null; // Programmer can initial this variable with any function. such as this.onclick = function(){ // DO Something; }

    this.clickable = false; // It's state of button (this object can be 'button' when programmer set 'true').
    this.draggable = false; // It's can moving everywhere with your mouse when 'true'.

    this.isMouseOver = false; // Programmer shouldn't edit, because system will edit this variable. Programmer should read-only.
    this.isDragging = false; // Programmer shouldn't edit, because system will edit this variable. Programmer should read-only.

    this.addChild = function (child)
    {
        _children.push(child);
    }
    this.removeChild = function (child)
    {
        _children.splice(_children.indexOf(child), 1);
    }
    this.removeChildAt = function (index)
    {
        _children.splice(index, 1);
    }

    this.getChild = function (index)
    {
        return _children[index];
    }
    this.childCount = function ()
    {
        return _children.length;
    }
    this.clearChildren = function ()
    {
        _children = [];
    }

    // this function used for finding children by child name and return the first node when founded.
    this.find = function (childName)
    {
        for (var i = 0; i < _children.length; i++)
        {
            if (_children[i].name === childName)
            {
                return _children[i];
            }
            else if (_children[i].childCount() > 0)
            {
                var found = _children[i].find(childName);
                if (found != undefined)
                    return found;
            }
        }

        return undefined;
    }

    // It empty function, Programmer can override this function to customize logic.
    this.onUpdate = function ()
    { }
    this.onDraw = function ()
    { }

    // It system function, Programmer can override this function. but shouldn't override it.
    node.prototype.update = function (parentMatrix)
    {
        if (parentMatrix != undefined)
        {
            this.globalMatrix = mat3.multiply(parentMatrix, this.localMatrix);
        }
        else
        {
            mat3.copy(this.localMatrix, this.globalMatrix);
        }

        this.onUpdate();

        for (var i = 0; i < this.childCount(); i++)
        {
            this.getChild(i).update(this.globalMatrix);
        }
    }
    node.prototype.draw = function (context)
    {
        this.onDraw();
        for (var i = 0; i < this.childCount() ; i++)
        {
            this.getChild(i).draw(context);
        }
    }
    node.prototype.drawDebuging = function (context)
    {
        context.save();

        var rawPosition = this.rawTranslation();
        var rawScale = this.rawScaling();

        var bw = (this.boundingBox.width / 100) * rawScale.width;
        var bh = (this.boundingBox.height / 100) * rawScale.height;

        var showX = rawPosition.x - (bw * 0.5) + (bw * (this.boundingBox.x / 100));
        var showY = rawPosition.y - (bh * 0.5) + (bh * (this.boundingBox.y / 100));

        context.lineWidth = 2;
        context.strokeStyle = '#0000ff';
        context.strokeRect(showX, showY, bw, bh);

        context.restore();
    }

    // this is part of 'clone' function. it will copy value from this object to clone object. sub class can override it.
    node.prototype.copyTo = function (object)
    {
        var pos = this.translation();
        var size = this.scaling();
        var bound = this.boundingBox;

        object.name = this.name + ' (Clone)';

        object.onclick = this.onclick;
        object.clickable = this.clickable;
        object.draggable = this.draggable;
        object.isDragging = false;

        object.translation(pos.x, pos.y);
        object.scaling(size.width, size.height);
        object.boundingBox.set(bound.x, bound.y, bound.width, bound.height);

        for (var i = 0; i < _children.length; i++)
        {
            object.addChild(_children[i].clone());
        }
    }

    // this function will create object from class type and
    node.prototype.clone = function ()
    {
        var cloneObject = new node();
        this.copyTo(cloneObject);
        return cloneObject;
    }

    // Getter and Setter function about translation (location x, y) in local space and PliaJS coordinate.
    this.translation = function (x, y)
    {
        if (x == undefined || y == undefined)
        {
            return new vec2d(this.localMatrix[6], this.localMatrix[7]);
        }
        else
        {
            this.localMatrix[6] = x;
            this.localMatrix[7] = y;
        }
    }

    // Getter function about translation in default canvas space and coordinate.
    this.rawTranslation = function ()
    {
        var onePointWidth = resolution.width / 100;
        var onePointHeight = resolution.height / 100;

        var posX = (this.globalMatrix[6] * onePointWidth) + (resolution.width / 2);
        var posY = -(this.globalMatrix[7] * onePointHeight) + (resolution.height / 2);

        return new vec2d(posX, posY);
    }

    // Getter and Setter function about scale (size width, height) in local space and PliaJS coordinate.
    this.scaling = function (width, height)
    {
        if (width == undefined || height == undefined)
        {
            return new size2d(this.localMatrix[0] * 100, this.localMatrix[4] * 100);
        }
        else
        {
            this.localMatrix[0] = width / 100;
            this.localMatrix[4] = height / 100;
        }
    }

    // Getter function about scale (size) in default canvas space and coordinate.
    this.rawScaling = function ()
    {
        var dstWidth = this.globalMatrix[0] * resolution.width;
        var dstHeight = this.globalMatrix[4] * resolution.height;
        return new size2d(dstWidth, dstHeight);
    }

    // this function used to increase/decrease x,y of translation in local space and PliaJS coordinate.
    this.move = function (x, y)
    {
        this.localMatrix[6] += x;
        this.localMatrix[7] += y;
    }

    // this function used to overlap testing with boundingBox and other location (x, y) in local space and PliaJS coordinate.
    this.contains = function (x, y)
    {
        var bw = this.boundingBox.width * this.globalMatrix[0];
        var bh = this.boundingBox.height * this.globalMatrix[4];

        var hw = bw / 2;
        var hh = bh / 2;

        var left = this.globalMatrix[6] - (hw);
        var right = this.globalMatrix[6] + (hw);
        var top = this.globalMatrix[7] + (hh);
        var bottom = this.globalMatrix[7] - (hh);

        if (x >= left && x <= right && y >= bottom && y <= top)
        {
            return true;
        }

        return false;
    }
}
node.intersect = function (a, b)
{
    var aT = a.rawTranslation();
    var aS = a.rawScaling();

    var aW = (a.boundingBox.width / 100) * aS.width;
    var aH = (a.boundingBox.height / 100) * aS.height;

    var aX = aT.x - (aW * 0.5) + (aW * (a.boundingBox.x / 100));
    var aY = aT.y - (aH * 0.5) + (aH * (a.boundingBox.y / 100));

    //
    
    var bT = b.rawTranslation();
    var bS = b.rawScaling();

    var bW = (b.boundingBox.width / 100) * bS.width;
    var bH = (b.boundingBox.height / 100) * bS.height;

    var bX = bT.x - (bW * 0.5) + (bW * (b.boundingBox.x / 100));
    var bY = bT.y - (bH * 0.5) + (bH * (b.boundingBox.y / 100));

    //
    var aleft = aX;
    var aright = aX + aW;
    var atop = aY;
    var abottom = aY + aH;

    var bleft = bX;
    var bright = bX + bW;
    var btop = bY;
    var bbottom = bY + bH;

    var b1 = bleft > aright;
    var b2 = aleft > bright;
    var b3 = bbottom < atop;
    var b4 = abottom < btop;

    var bb = !(b1 || b2 || b3 || b4);

    return bb;
}
node.load = function(property)
{
    var object = property;
    if (object != undefined)
    {
        var name = (object.hasOwnProperty('name')) ? object.name : 'nodeObject';

        var layers = ['background', 'midground', 'foreground', 'hud'];
        var isScene = false;
        for (var i = 0; i < layers.length; i++)
        {
            if (object.hasOwnProperty(layers[i]))
            {
                isScene = true;
                break;
            }
        }

        if (isScene)
        {
            window[name] = new scene();
            var sceneNode = window[name];
            sceneNode.name = name;

            //var layers = ['background', 'midground', 'foreground', 'hud'];
            for (var i = 0; i < layers.length; i++)
            {
                if (object.hasOwnProperty(layers[i]))
                {
                    var objects = eval('object.' + layers[i]);
                    for (var j = 0; j < objects.length; j++)
                    {
                        eval('sceneNode.' + layers[i]).addChild(node.load(objects[j]));
                    }
                }
            }
            return sceneNode;
        }
        else
        {
            var imgSrc = (object.hasOwnProperty('imageSrc')) ? object.imageSrc : undefined;
            var text = (object.hasOwnProperty('text')) ? object.text : undefined;

            var frameCount = (object.hasOwnProperty('frameCount')) ? object.frameCount : undefined;

            var nodeObject = null;

            if (imgSrc != undefined)
            {
                window[name] = new sprite(imgSrc, frameCount);
                nodeObject = window[name];

                if (object.hasOwnProperty('animationClips'))
                {
                    var animationClips = object.animationClips;
                    for (var a = 0; a < animationClips.length; a++)
                    {
                        var clip = animationClips[a];
                        nodeObject.addAnimationClip(clip.name, clip.start, clip.stop);
                    }
                }
            }
            else if (text != undefined)
            {
                window[name] = new label();
                nodeObject = window[name];

                nodeObject.text = text;
                nodeObject.font = (object.hasOwnProperty('font')) ? object.font : 'verdana';
                nodeObject.fontStyle = (object.hasOwnProperty('fontStyle')) ? object.fontStyle : 'normal';

                nodeObject.fontSize = (object.hasOwnProperty('fontSize')) ? object.fontSize : 20;
                nodeObject.textColor = (object.hasOwnProperty('textColor')) ? object.textColor : 'black';

                nodeObject.textAlign = (object.hasOwnProperty('textAlign')) ? object.textAlign : 'center';
            }
            else
            {
                window[name] = new node();
                nodeObject = window[name];
            }

            if (nodeObject != null)
            {
                nodeObject.name = name;

                nodeObject.clickable = (object.hasOwnProperty('clickable')) ? object.clickable : false;
                nodeObject.draggable = (object.hasOwnProperty('draggable')) ? object.draggable : false;

                if (object.hasOwnProperty('scaling'))
                {
                    nodeObject.scaling(object.scaling.width, object.scaling.height);
                }
                if (object.hasOwnProperty('translation'))
                {
                    nodeObject.translation(object.translation.x, object.translation.y);
                }
                if (object.hasOwnProperty('boundingBox'))
                {
                    var bb = object.boundingBox;
                    nodeObject.boundingBox(bb.x, bb.y, bb.width, bb.height);
                }

                if (object.hasOwnProperty('children'))
                {
                    var children = object.children;
                    for (var i = 0; i < children.length; i++)
                    {
                        var child = node.load(children[i]);
                        if(child != null)
                            nodeObject.addChild(child);
                    }
                }
            }
            return nodeObject;
        }
    }

    return null;
}

// Sprite class use for show image in canvas.
sprite = function (imgSrc, frameCount)
{
    // Call Super class (It's step of sub class in inheritancing process).
    node.call(this);

    var _texture = new Image(); // It's Image from canvas. Used for storing about image when loaded from resource.
    var _source = new rect(); // It's Texel Space. not like 'bounding box or scaling'.
    var _hasAnimation = false; // It's boolean variable to describe about animation (true / false).
    var _flipH = 1; // It's sprite effect called 'Flip Horizontal'. It store as Integer (-1 and 1) and used for multiply with scaling in x coordinate.
    var _flipV = 1; // It's sprite effect called 'Flip Vertical'. It store as Integer (-1 and 1) and used for multiply with scaling y coordinate.
    var _initialized = false; // It's internal variable to store initialize state. using in this object only and not available outside.

    // animation variable
    var _isLoop = false; // It describe system to replay animation clip when it ended.
    var _isPlaying = false; // It's Playback State. (Play or Stop)
    var _currentFrame = 1; // Current Keyframe. System will read and update this.
    var _totalFrame = 1; // Total Keyframe of this sprite (initialized by programmer).

    var _animationName = 'idle'; // Current Animation Clip name.
    var _animationClips = new hashmap(); // Animation Clip List (Store by 'Key -> 'Clip Name' and 'Value -> Start & Stop Keyframe').

    this.playbackSpeed = 1; // Playback Speed, Multiplier when update current keyframe in function 'update'.

    // Internal function, It's using as constructor in other language such as C#, JAVA.
    function initialize()
    {
        _texture.src = imgSrc;

        // animation
        if (frameCount != undefined)
        {
            _hasAnimation = true;
            _totalFrame = frameCount;
        }

        _texture.onload = function ()
        {
            _source.width = this.width / _totalFrame;
            _source.height = this.height;

            _initialized = true;
        }
    }
    initialize(); // Call Initialize() function in first time when programmer creating new sprite.

    this.updateSprite = function ()
    {
        if (_initialized && _hasAnimation)
        {
            if(_isPlaying)
            {
                var clip = _animationClips.get(_animationName);
                var tframe = clip.stop - clip.start + 1;

                _currentFrame += this.playbackSpeed * (tframe / 40);

                if (_currentFrame < clip.start || _currentFrame >= clip.stop)
                {
                    _currentFrame = clip.start;
                    if (!_isLoop)
                    {
                        this.stop();
                    }
                }

                _source.x = (Math.floor(_currentFrame) - 1) * _source.width;
                _source.y = 0;
            }

            if (this.isMouseOver && this.hasAnimationClip('hover'))
            {
                this.playOnce('hover');
            }
            else if (this.hasAnimationClip('idle') && !this.isPlaying('idle'))
            {
                this.playOnce('idle');
            }
        }
    }
    this.drawSprite = function (context)
    {
        if (_initialized)
        {
            var rawPosition = this.rawTranslation();
            var rawScale = this.rawScaling();
            var halfWIdth = rawScale.width / 2;
            var halfHeight = rawScale.height / 2;

            context.save();
            context.translate(rawPosition.x, rawPosition.y);
            context.scale(_flipH, _flipV);

            if (_hasAnimation)
            {
                context.drawImage(_texture, _source.x, _source.y, _source.width, _source.height, -halfWIdth, -halfHeight, rawScale.width, rawScale.height);
            }
            else
            {
                context.drawImage(_texture, -halfWIdth, -halfHeight, rawScale.width, rawScale.height);
            }

            context.restore();
        }
    }
    this.copySpriteTo = function (object)
    {
        // Copy sprite data from this.
        object.playbackSpeed = this.playbackSpeed;
        if (_hasAnimation)
        {
            for (var i = 0; i < _animationClips.length() ; i++)
            {
                var clip = _animationClips.getItemByIndex(i);
                object.addAnimationClip(clip.key, clip.value.start, clip.value.stop);
            }
            if (_isPlaying)
            {
                if (_isLoop)
                {
                    object.playAndLoop(_animationClips.getItemByIndex(i).key);
                }
                else
                {
                    object.playOnce(_animationClips.getItemByIndex(i).key);
                }
            }
        }

        if (this.isFlipHorizontal)
        {
            object.flipHorizontal();
        }
        if (this.isFlipVertical)
        {
            object.flipVertical();
        }
    }
    this.cloneSprite = function ()
    {
        var cloneObject = new sprite(_texture.src, _totalFrame);
        this.copyTo(cloneObject);
        return cloneObject;
    }

    // It's overriding function from super class (node class) to insert 'animation update'
    sprite.prototype.update = function (parentMatrix)
    {
        this.updateSprite();
        node.prototype.update.call(this, parentMatrix);
    }
    sprite.prototype.draw = function (context)
    {
        this.drawSprite(context);

        // Call super function (Must call if super function has an important process).
        node.prototype.draw.call(this, context);
    }

    sprite.prototype.copyTo = function (object)
    {
        // Copy node data from super class.
        node.prototype.copyTo.call(this, object);
        this.copySpriteTo(object);
    }
    sprite.prototype.clone = function ()
    {
        return this.cloneSprite();
    }

    // Internal function to order animation to 'play'.
    function play(animationName, isLoop)
    {
        _animationName = animationName;
        var clip = _animationClips.get(animationName);
        if (clip != null)
        {
            _currentFrame = clip.start;
            _isPlaying = true;
            _isLoop = isLoop;
        }
    }

    this.hasAnimationClip = function(clipName)
    {
        return _animationClips.get(clipName) != null;
    }

    // Add Animation Clip by ClipName, Start & Stop Keyframe.
    this.addAnimationClip = function (clipName, startFrame, stopFrame)
    {
        _animationClips.put(clipName, new animationClip(startFrame, stopFrame));
    }

    // Remove Animation Clip by ClipName.
    this.removeAnimationClip = function (clipName)
    {
        _animationClips.remove(clipName);
    }

    // Play and Stop after animation is end.
    this.playOnce = function (clipName)
    {
        play(clipName, false);
    }

    // Play and replay forever.
    this.playAndLoop = function (clipName)
    {
        play(clipName, true);
    }

    // Stop Animation
    this.stop = function ()
    {
        _isPlaying = false;
        _isLoop = false;
    }

    // Get Animation Playing State with Animation Clip Name
    this.isPlaying = function (clipName)
    {
        return (_animationName == clipName) && (_isPlaying);
    }

    // Order this sprite to flip in horizontal.
    this.flipHorizontal = function ()
    {
        _flipH *= -1;
    }

    // Order this sprite to flip in vertical
    this.flipVertical = function ()
    {
        _flipV *= -1;
    }

    // Getting State of flip in horizontal.
    /*this.isFlipHorizontal = function ()
    {
        return _flipH == -1;
    }

    // Getting State of flip in vertical.
    this.isFlipVertical = function ()
    {
        return _flipV == -1;
    }
    */

    // Getting State of flip in vertical.
    Object.defineProperty(this, "isFlipVertical", {
        get: function ()
        {
            return _flipV == -1;
        }
    });

    // Getting State of flip in horizontal.
    Object.defineProperty(this, "isFlipHorizontal", {
        get: function ()
        {
            return _flipH == -1;
        }
    });
}
sprite.prototype = new node(''); //<-- inherit from node class

// Label class use for show text in canvas.
label = function ()
{
    node.call(this);
    this.text = '';
    this.font = 'verdana';
    this.fontStyle = 'normal';
    this.fontSize = 20;
    this.textColor = 'black';
    this.textAlign = 'center';

    this.measureWidth = 0;
    this.measureHeight = 0;

    // Overriding update function and not call super function.
    label.prototype.update = function (parentMatrix)
    {
        var mat = mat3.multiply(parentMatrix, this.localMatrix);
        mat3.copy(mat, this.globalMatrix);

        this.globalMatrix[0] = this.measureWidth;
        this.globalMatrix[4] = this.measureHeight;

        this.localMatrix[0] = this.measureWidth;
        this.localMatrix[4] = this.measureHeight;

        var offx = 0;
        switch (this.textAlign)
        {
            case 'left': offx = 50; break;
            case 'right': offx = -50; break;
            default: break;
        }
        this.boundingBox.x = offx;

        this.onUpdate();
        for (var i = 0; i < this.childCount() ; i++)
        {
            this.getChild(i).update(this.globalMatrix);
        }
    }

    // Overring draw function and Call super function.
    label.prototype.draw = function (context)
    {
        var rawPosition = this.rawTranslation();
        var rawScale = this.rawScaling();

        context.save();
        context.font = this.fontStyle + ' ' + this.fontSize + 'pt ' + this.font;
        context.textBaseline = 'middle';
        context.fillStyle = this.textColor;
        context.textAlign = this.textAlign;
        context.fillText(this.text, rawPosition.x, rawPosition.y + (this.fontSize / 20));

        // Calculate Measure Width And Height to Setting Bounding Space.
        var measure = context.measureText(this.text);

        this.measureWidth = ((measure.width) / resolution.width);
        this.measureHeight = ((this.fontSize + (this.fontSize / 10)) / resolution.height);

        context.restore();

        // Call super function (Must call if super function has an important process).
        //node.prototype.draw(context);
        node.prototype.draw.call(this, context);
    }

    label.prototype.copyTo = function (object)
    {
        node.prototype.copyTo.call(this, object);

        object.text = this.text;
        object.font = this.font;
        object.fontStyle = this.fontStyle;
        object.fontSize = this.fontSize;
        object.textColor = this.textColor;
        object.textAlign = this.textAlign;
    }
    label.prototype.clone = function ()
    {
        var cloneObject = new label();
        this.copyTo(cloneObject);
        return cloneObject;
    }
}
label.prototype = new node(''); //<-- inherit from node class

// Scene class is a first level node in tree hierarchy.
scene = function ()
{
    node.call(this);
    this.background = new node(),
    this.midground = new node(),
    this.foreground = new node(),
    this.hud = new node()

    this.background.name = 'background';
    this.midground.name = 'midground';
    this.foreground.name = 'foreground';
    this.hud.name = 'hud';

    this.name = 'scene';

    this.addChild(this.background);
    this.addChild(this.midground);
    this.addChild(this.foreground);
    this.addChild(this.hud);

    scene.prototype.copyTo = function (object)
    {
        object.clearChildren();

        node.prototype.copyTo.call(this, object);
    }

    scene.prototype.clone = function ()
    {
        var cloneObject = new scene();
        this.copyTo(cloneObject);
        return cloneObject;
    }
}
scene.prototype = new node(''); //<-- inherit from node class

// SoundFX class is use to Store Audio Objects & Audio Channel.
soundfx = function (src, channelCount)
{
    var audio = new Audio(src);
    var channels = [];
    var currentChannel = 0;

    function initialize()
    {
        audio.load();
        if (channelCount == undefined)
        {
            channelCount = 10;
        }

        for (var i = 0; i < channelCount; i++)
        {
            channels.push(audio.cloneNode(true));
        }
    }
    initialize();

    this.play = function ()
    {
        channels[currentChannel++].play();
        if (currentChannel >= channels.length)
        {
            currentChannel = 0;
        }
    }

    Object.defineProperty(this, 'volume',
        {
            get: function ()
            {
                return audio.volume;
            },
            set: function (v)
            {
                audio.volume = v;
                for (var i = 0; i < channelCount; i++)
                {
                    channels[i].volume = v;
                }
            }
        });
}

//////////////////// Ending Node Hierarchy Class ////////////////////
//////////////////// Starting Framework Logic ////////////////////

// Declare about global variable and updating by system.
var resolution =
    {
        width: 1280, height: 720, aspectRatio: 1.778
    };

var mouse =
    {
        x: 0, y: 0
    };

var options =
    {
        debugmode: true,
        defaultElapsedTime: 1000 / 60,
    }

function trace(msg)
{
    if (options.debugmode === true)
    {
        console.log(msg.toString());
    }
}

// Call when start application.
onload = function ()
{
    // if Run on Windows Application // // // //
    if (Debug.hasOwnProperty("isDebugBuild"))
    {
        return;
    }

    var thisPackage = Windows.ApplicationModel.Package.current,
        installedPath = thisPackage.installedLocation.path;

    if (typeof installedPath === "string")
    {
        if (installedPath.match(/\\debug\\appx$/i))
        {
            Object.defineProperty(Debug, "isDebugBuild", {
                get: function ()
                {
                    return true;
                }
            });
        }
    }

    options.debugmode = Debug.isDebugBuild;
    // // // // // // // // // // // // // // //

    resolution.width = window.outerWidth;
    resolution.height = window.outerHeight;
    resolution.aspectRatio = resolution.width / resolution.height;

    // set Resolution for Image Quality.
    canvas.setAttribute('width', resolution.width.toString() + 'px');
    canvas.setAttribute('height', resolution.height.toString() + 'px');

    // Set Canvas Style (Background Color, Width, Height)
    canvas.setAttribute('style', 'background-color: black; width:100%; height:100%;');

    gameloop = function ()
    {
        var context = canvas.getContext('2d');

        //var myGame = new game1();

        var interval = 0;
        var paused = true;
        var started = false;

        function start()
        {
            game.onstart();
            trace('state : starting..');
            started = true;
            resume();
        }
        start();

        function resume()
        {
            if (started && paused)
            {
                interval = setInterval(onUpdateInterval, options.defaultElapsedTime);
                paused = false;
                trace('state : resuming');
            }
        }
        function pause()
        {
            clearInterval(interval);
            paused = true;
            trace('state : pausing');
        }
        function onUpdateInterval()
        {
            game.update();

            context.clearRect(0, 0, innerWidth, innerHeight);
            game.draw(context);
        }

        this.onkeypress = function (e)
        {
            var code = e.keyCode;
            var key = '';
            if (code == 8)
            {
                key = 'backspace';
            }
            else
            {
                key = String.fromCharCode(code);
            }

            game.onkeypress(key);
        }

        /*
        onclick = function()
        {
            game.onclick();
        }
        onmousemove = function ()
        {
            game.onmousemove();
        }
        onmousedown = function (e)
        {
            game.onmousedown(e);
        }
        onmouseup = function (e)
        {
            game.onmouseup(e);
        }
        */

        this.onresize = function ()
        {
            // Query for the current view state 
            var myViewState = Windows.UI.ViewManagement.ApplicationView.value;

            var viewStates = Windows.UI.ViewManagement.ApplicationViewState;
            var statusText;

            // Assign text according to view state 
            switch (myViewState)
            {
                case viewStates.snapped:
                    statusText = "This app is snapped!";
                    pause(); //<-- Pause.
                    break;
                case viewStates.filled:
                    statusText = "This app is in filled state!";
                    pause(); //<-- Pause.
                    break;
                case viewStates.fullScreenLandscape:
                    statusText = "This app is full screen landscape!";
                    resume(); //<-- Resume.
                    break;
                case viewStates.fullScreenPortrait:
                    statusText = "This app is full screen portrait!";
                    pause(); //<-- Pause.
                    break;
                default:
                    statusText = "Error: Invalid view state returned.";
                    pause(); //<-- Pause.
                    break;
            }

            trace(statusText);
        }

        addEventListener('resize', this.onresize);
        addEventListener('keypress', this.onkeypress);
        addEventListener('mousedown', game.ontouchdown);
        addEventListener('mouseup', game.ontouchup);
        addEventListener('mousemove', game.ontouchmove);

    }
    var looper = new gameloop();
}
game2D = function ()
{
    node.call(this);

    this.name = 'Game';

    var _isChangingScene = false;
    var _speed = 21;

    var _capturedObject = null;
    var _currentScene = null;

    var _leftMouseIsDown = false;
    var _dist = { x: 0, y: 0 };
    var _dragging = false;

    this.onstart = function ()
    {

    }

    this.update = function ()
    {
        this.onUpdate();

        if (_currentScene != null)
        {
            _currentScene.update();
        }
    }
    this.draw = function (context)
    {
        this.onDraw();
        if (_currentScene != null)
        {
            _currentScene.draw(context);
        }
        this.drawDebuging(context);
    }
    this.drawDebuging = function (context)
    {
        if (options.debugmode)
        {
            if (_capturedObject != null)
                _capturedObject.drawDebuging(context);

            context.save();
            context.font = 'normal 25px verdana';
            context.textBaseline = 'middle';
            context.fillStyle = 'white';
            context.textAlign = 'left';
            context.fillText('debug mode : on', 10, 18);

            // Draw Mouse Position & Object Name
            var rawMouseX = ((mouse.x + 50) / 100) * resolution.width;
            var rawMouseY = ((50 - mouse.y) * resolution.height) / 100;

            //trace(resolution.width);

            var mx = Math.round(mouse.x * 1000) / 1000;
            var my = Math.round(mouse.y * 1000) / 1000;


            var txtToShow1 = (_capturedObject != null) ? 'Node : ' + _capturedObject.name : '';
            var txtToShow2 = 'X : ' + mx + ', Y : ' + my;

            context.font = 'normal 14px verdana';
            context.textAlign = 'left';
            context.textBaseline = 'bottom';

            var w1 = context.measureText(txtToShow1).width;
            var w2 = context.measureText(txtToShow2).width;

            var measureWidth = (w1 > w2) ? w1 : w2;
            var measureHeight = 16;


            if (rawMouseX + measureWidth > resolution.width)
            {
                rawMouseX -= measureWidth;
            }

            if (_capturedObject != null)
            {
                if (rawMouseY - measureHeight < 0)
                {
                    rawMouseY += measureHeight;
                } else
                {
                    rawMouseY -= measureHeight;
                }

                context.fillStyle = '#e5e5e5';
                context.fillRect(rawMouseX, rawMouseY - measureHeight, measureWidth, measureHeight + 1);
                context.fillStyle = 'black';
                context.fillText(txtToShow1, rawMouseX, rawMouseY);
            }

            context.fillStyle = '#e5e5e5';
            context.fillRect(rawMouseX, rawMouseY, measureWidth, measureHeight);

            rawMouseY += measureHeight;
            if (rawMouseY - measureHeight < 0)
            {
                rawMouseY += measureHeight;
            }

            context.fillStyle = 'black';
            context.fillText(txtToShow2, rawMouseX, rawMouseY);
            context.restore();

            
        }
    }

    this.currentScene = function ()
    {
        return _currentScene;
    }
    this.showScene = function (sceneToShow)
    {
        if (!_isChangingScene)
        {
            if (_currentScene == null)
            {
                _currentScene = sceneToShow;
            }
            else if (_currentScene != sceneToShow)
            {
                _isChangingScene = true;
                sceneToShow.translation(-100, 0);
                _speed = 21;

                var interval = setInterval(function ()
                {
                    if (_currentScene.translation().x < 98)
                    {
                        _speed -= 6;
                        if (_speed < 6)
                        {
                            _speed = 6;
                        }

                        _currentScene.move(_speed, 0);
                        sceneToShow.move(_speed, 0);
                    }
                    else
                    {
                        _currentScene.translation(0, 0);
                        sceneToShow.translation(0, 0);

                        _currentScene = sceneToShow;
                        _isChangingScene = false;
                        clearInterval(interval);
                    }

                }, options.defaultElapsedTime);
            }
        }
    }

    this.onkeypress = function (key)
    {
        if (_currentScene != null && _currentScene.onkeypress != null)
            _currentScene.onkeypress(key);
    }

    /*
    this.onclick = function ()
    {
        if (_capturedObject != null)
        {
            if (_capturedObject.onclick != null)
            {
                _capturedObject.onclick(_capturedObject);
                _capturedObject.isMouseOver = false;
            }
        }
    }
    this.onmousemove = function ()
    {
        mouse.x = ((window.event.x / resolution.width) * 100) - 50;
        mouse.y = 50 - ((window.event.y / resolution.height) * 100);

        if (_currentScene != null)
        {
            if (_capturedObject != null)
            {
                if (!_capturedObject.isDragging && !_capturedObject.contains(mouse.x, mouse.y))
                {
                    _capturedObject.isMouseOver = false;
                    _capturedObject.isDragging = false;
                    _capturedObject = null;
                }
            }

            if (!_leftMouseIsDown)
            {
                _capturedObject = loop(_currentScene, 0);

                if (_capturedObject != null)
                    trace('onmouseover : ' + _capturedObject.name);
            }
        }

        if (_capturedObject != null)
        {
            _capturedObject.isMouseOver = true;

            if (_leftMouseIsDown && _capturedObject.draggable)
            {
                _capturedObject.translation(mouse.x - _dist.x, mouse.y - _dist.y);

            }
        }
    }
    this.onmousedown = function (e)
    {
        if (e.which == 1)
        {
            _leftMouseIsDown = true;

            if (_capturedObject != null && _capturedObject.draggable == true)
            {
                var pos = _capturedObject.translation();
                _dist.x = mouse.x - pos.x;
                _dist.y = mouse.y - pos.y;
                _capturedObject.isDragging = true;
            }
        }
    }
    this.onmouseup = function (e)
    {
        if (e.which == 1)
        {
            _leftMouseIsDown = false;

            if (_capturedObject != null)
            {
                _capturedObject.isDragging = false;
            }
        }
    }
    */
    this.ontouchdown = function (e)
    { 
        trace('test : touching down');

        _leftMouseIsDown = true;

        if (_capturedObject != null && _capturedObject.draggable == true)
        {
            var pos = _capturedObject.translation();
            _dist.x = mouse.x - pos.x;
            _dist.y = mouse.y - pos.y;
            _capturedObject.isDragging = true;
        }
    }

    this.ontouchup = function (e)
    {
        trace('test : touching up');

        _leftMouseIsDown = false;

        if (_capturedObject != null)
        {
            _capturedObject.isDragging = false;

            if (_capturedObject.onclick != null)
            {
                _capturedObject.onclick(_capturedObject);
                _capturedObject.isMouseOver = false;
            }
        }
    }

    this.ontouchmove = function (e)
    {
        trace('test : touching move');

        mouse.x = ((e.x / resolution.width) * 100) - 50;
        mouse.y = 50 - ((e.y / resolution.height) * 100);

        if (_currentScene != null)
        {
            if (_capturedObject != null)
            {
                if (!_capturedObject.isDragging && !_capturedObject.contains(mouse.x, mouse.y))
                {
                    _capturedObject.isMouseOver = false;
                    _capturedObject.isDragging = false;
                    _capturedObject = null;
                }
            }

            if (!_leftMouseIsDown)
            {
                _capturedObject = loop(_currentScene, 0);

                if (_capturedObject != null)
                    trace('onmouseover : ' + _capturedObject.name);
            }
        }

        if (_capturedObject != null)
        {
            _capturedObject.isMouseOver = true;

            if (_leftMouseIsDown && _capturedObject.draggable)
            {
                _capturedObject.translation(mouse.x - _dist.x, mouse.y - _dist.y);

            }
        }
    }

    // Recursive finding onmouseover node.
    function loop(root)
    {
        if (root.contains(mouse.x, mouse.y))
        {
            if (root.childCount() > 0)
            {
                for (var i = root.childCount() - 1; i >= 0 ; i--)
                {
                    var child = root.getChild(i);
                    if ((root instanceof scene) && child.childCount() == 0)
                    {
                        continue;
                    }
                    var captured = loop(child);
                    if (captured != null)
                    {
                        return captured;
                    }
                }

                if ((root instanceof sprite) || (root instanceof label))
                {
                    return root;
                }
            }
            else
            {
                return root;
            }
        }

        return null;
    }
}
game2D.prototype = new node('');
var game = new game2D();