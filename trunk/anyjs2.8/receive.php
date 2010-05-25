<?php
$db_host="localhost";
$db_name="09bye";
$username="root";
$password="";
$db_con=mysql_connect($db_host,$username,$password);
$connection_string=mysql_select_db($db_name);
mysql_connect($db_host,$username,$password);
mysql_select_db($db_name);
mysql_query('set names utf8');

if(isset($_POST['msg'])&&isset($_POST['name'])){
	$message = strip_tags($_POST['msg']);
	$name = strip_tags($_POST['name']);
	$art_id = strip_tags($_POST['id']);
	$sql	=	'INSERT INTO `well_comment` ( `id`,`article_id` , `name`,`content` , `ip`,`pubdate` )  VALUES (NULL ,"'.$art_id.'","'.$name.'","'.$message.'","1587171", NOW( ))';
	mysql_query($sql);
	echo $message.'提交成功';
}