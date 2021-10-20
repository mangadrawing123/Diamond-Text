$handle = opendir("src/");

while (($file = readdir($handle))!== false) {
    echo '<script type="text/javascript" src="' . $file . '"></script>';
}

closedir($handle);