<?php
//header("Cache-Control: no-store, no-cache, must-revalidate");
//header("Cache-Control: post-check=0, pre-check=0", false); //取消快取缓存
$num=$_GET['num'];
$type=$_GET['type'];
if($type=="xml"){
header("Content-Type:text/xml");
echo '<?xml version="1.0" ?><test>';
for($i=0;$i<$num;$i++)
echo '<any>
    <title>xml test555678867868999</title>
    <data>enimo222</data>
  </any>';
  echo '</test>';
}
if($type=="json"){
header("Content-Type:text/json");
$json=array(array('a'=>'enimo1','b'=>'luoqin1'),array('a'=>'enimo2','b'=>'luoqin2'));
echo json_encode($json);
}
else{
//header("Content-Type:text/html");
//echo '<p>HTML内容</p>';
}
?>
