<?php

    // Get Request parameters
    $file = (isset($_REQUEST['file']) ? $_REQUEST['file'] : "");
    $html = (isset($_REQUEST['html']) ? ($_REQUEST['html'] == "NULL" ? "" : $_REQUEST['html']) : "");
    $css = (isset($_REQUEST['css']) ? ($_REQUEST['css'] == "NULL" ? "" : $_REQUEST['css']) : "");
    $js = (isset($_REQUEST['js']) ? ($_REQUEST['js'] == "NULL" ? "" : $_REQUEST['js']) : "");
    
    // Build HTML page
    $output = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Made with Code Fidget</title><style>' . $css . '</style><script>' . $js . '</script></head><body>' . $html . '</body></html>';

    // Create a Fidgets folder if it doesn't already exist
    if(!is_dir("fidgets"))
    {
        mkdir("fidgets", 0777) or die("fail");
    }

    // Write the HTML page
    $write = fopen("fidgets/" . $file . ".html", "w") or die("fail");
    fwrite($write, $output);
    fclose($write);

    // Safely exit
    exit();

?>