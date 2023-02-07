<?php
header('Content-Type: application/json');
$city = $_GET['city'];
$data = file_get_contents("http://43.250.238.179:9090/showData");//获取“人民网”数据
if($city==NULL)//地区为空，则取全部列表
{
	$json = json_decode($data,true);
	$list = array();//创建数组，否则后面会报错
	for($i=0;$i<sizeof($json['data']['list']);$i++)
	{
		if(sizeof($json['data']['list'][$i]['city'])==0){
		$list = $list + array($i=>array(
			"城市"=>$json['data']['list'][$i]['name'],
			"积累确诊"=>$json['data']['list'][$i]['value'],
			"现存确诊"=>$json['data']['list'][$i]['econNum'],
			"现存无症状"=>$json['data']['list'][$i]['asymptomNum'],
			"治愈"=>$json['data']['list'][$i]['cureNum'],
			"死亡"=>$json['data']['list'][$i]['deathNum']
		));}else
		{
			$list_1 = array();
			for($b=0;$b<sizeof($json['data']['list'][$i]['city']);$b++){
				$list_1 = $list_1 + array($b=>array(
			"城市"=>$json['data']['list'][$i]['city'][$b]['name'],
			"积累确诊"=>$json['data']['list'][$i]['city'][$b]['conNum'],
			"现存确诊"=>$json['data']['list'][$i]['city'][$b]['econNum'],
			"现存无症状"=>$json['data']['list'][$i]['city'][$b]['asymptomNum'],
			"治愈"=>$json['data']['list'][$i]['city'][$b]['cureNum'],
			"死亡"=>$json['data']['list'][$i]['city'][$b]['deathNum']
				));			
			}
			$list = $list + array($i=>array(
			"城市"=>$json['data']['list'][$i]['name'],
			"积累确诊"=>$json['data']['list'][$i]['value'],
			"现存确诊"=>$json['data']['list'][$i]['econNum'],
			"现存无症状"=>$json['data']['list'][$i]['asymptomNum'],
			"治愈"=>$json['data']['list'][$i]['cureNum'],
			"死亡"=>$json['data']['list'][$i]['deathNum'],
			"附属城市"=>$list_1
		));
		}
	}
	$list = array("code"=>200,"UpTime"=>$json['data']['times'],"list"=>$list);
	echo json_encode($list,JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}else
{
	$json = json_decode($data,true);
	for ($i=0;$i<sizeof($json['data']['list']);$i++)
	{
		if(sizeof($json['data']['list'][$i]['city'])==0){
			if($json['data']['list'][$i]['name']==$city)
			{
			$data =	array(
			"城市"=>$json['data']['list'][$i]['name'],
			"积累确诊"=>$json['data']['list'][$i]['value'],
			"现存确诊"=>$json['data']['list'][$i]['econNum'],
			"现存无症状"=>$json['data']['list'][$i]['asymptomNum'],
			"治愈"=>$json['data']['list'][$i]['cureNum'],
			"死亡"=>$json['data']['list'][$i]['deathNum']
		      );
			break;
			}
		}else{
			if($json['data']['list'][$i]['name']==$city){
			$data =	array(
			"城市"=>$json['data']['list'][$i]['name'],
			"积累确诊"=>$json['data']['list'][$i]['value'],
			"现存确诊"=>$json['data']['list'][$i]['econNum'],
			"现存无症状"=>$json['data']['list'][$i]['asymptomNum'],
			"治愈"=>$json['data']['list'][$i]['cureNum'],
			"死亡"=>$json['data']['list'][$i]['deathNum']
		      );
				break;
			}else
			{
			for($b=0;$b<sizeof($json['data']['list'][$i]['city']);$b++){
			if($json['data']['list'][$i]['city'][$b]['name']==$city)
			{
			$data = array(
			"城市"=>$json['data']['list'][$i]['city'][$b]['name'],
			"积累确诊"=>$json['data']['list'][$i]['city'][$b]['conNum'],
			"现存确诊"=>$json['data']['list'][$i]['city'][$b]['econNum'],
			"现存无症状"=>$json['data']['list'][$i]['city'][$b]['asymptomNum'],
			"治愈"=>$json['data']['list'][$i]['city'][$b]['cureNum'],
			"死亡"=>$json['data']['list'][$i]['city'][$b]['deathNum']				
				);
				break;
					}
				if($json['data']['list'][$i]['city'][$b]['name']!=$city and $b==sizeof($json['data']['list'][$i]['city'])-1 and $i==sizeof($json['data']['list'])-1)
				{$data=array("msg"=>"为查询到该地区...");
				
				}
				}
			}			
			}
		}
	$data = array("code"=>200,"UpTime"=>$json['data']['times'],"data"=>$data);
	echo json_encode($data,JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	}