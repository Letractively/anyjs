<?php
//header("Cache-Control: no-store, no-cache, must-revalidate");
//header("Cache-Control: post-check=0, pre-check=0", false); //取消快取缓存
$num=$_GET['num'];
$type = isset($_GET['type']) ? $_GET['type'] : '';

if($type=="xml"){

header("Content-Type:text/xml");
echo '<?xml version="1.0" ?><test>';

for($i=0;$i<$num;$i++)
echo '<any><title>xml test555678867868999</title><data>enimo222</data></any>';

echo '</test>';
}
else if($type=="json"){
header("Content-Type:application/x-javascript; charset=utf-8");
$json=array(array('a'=>'enimo1','b'=>'luoqin1'),array('a'=>'enimo2','b'=>'luoqin2'));
echo json_encode($json);
}
else if($type=="jsonp"){
header("Content-Type:application/x-javascript; charset=utf-8");
$callback = isset($_GET['callback']) ? $_GET['callback'] : 'JSONP';
$json=array(array('a'=>'enimo1jsonp','b'=>'luoqin1jsonp'),array('a'=>'enimo2','b'=>'luoqin2jsonp'));
echo 'var '.$callback.'=';
echo json_encode($json);
}
else{echo '<i>ABC</i>';}