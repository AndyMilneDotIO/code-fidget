<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Fidget</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/png" href="logo.png" />
    <script type="text/javascript" src="scripts.js"></script>
</head>
<body>
    
    <nav class="nav">
        <img class="nav__icon" src="logo.png">
        <ul class="nav__menu">
            <li class="nav__menu__item" id="new">New</li>
            <li class="nav__menu__item"><a href="#" id="save" download="">Save</a></li>
            <li class="nav__menu__item" id="run">Run</li>
        </ul>
    </nav>

    <form class="code" id="code">
        <div class="code__input input">
            <label class="code__input__label" for="html">HTML</label>
            <div class="code__input__lines" id="html-lines"></div>
            <textarea class="code__input__textarea" id="html" name="html" wrap="off" rows="999" autofocus></textarea>
        </div>
        <div class="code__input input">
            <label class="code__input__label" for="css">CSS</label>
            <div class="code__input__lines" id="css-lines"></div>
            <textarea class="code__input__textarea" id="css" name="css" wrap="off" rows="999"></textarea>
        </div>
        <div class="code__input input">
            <label class="code__input__label" for="js">JavaScript</label>
            <div class="code__input__lines" id="js-lines"></div>
            <textarea class="code__input__textarea" id="js" name="css" wrap="off" rows="999"></textarea>
        </div>
        <div class="code__input output">
            <label class="code__input__label" for="output">Output</label>
            <div class="code__input__output">
                <iframe id="output"></iframe>
            </div>
        </div>
    </form>

</body>
</html>