<?php 
class Map{
	public $height;
	public $width;
	public function getMap($m,$n){
		$height=$m;
		$width=$n;
		for($i=1;$i<=$height;$i++)    //·ÖÁÐÊä³öÆåÅÌ
		{
			echo '<div class="map_line">';
			for($j=1;$j<=$width;$j++)
			{
				echo '<div class="map_cell" id="'.$i.'a'.$j.'"> </div>';
			}
			echo '</div>';
		}
	}
}
?>