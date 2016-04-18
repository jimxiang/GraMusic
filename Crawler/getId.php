<?php
function curl_get($url)
{
    $refer = "http://music.163.com/";
    $header[] = "Cookie: " . "appver=1.5.0.75771;";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($ch, CURLOPT_REFERER, $refer);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}
  
function get_music_info($music_id)
{
    $url = "http://music.163.com/api/song/detail/?id=" . $music_id . "&ids=%5B" . $music_id . "%5D";
    return curl_get($url);
}
  
function get_playlist_info($playlist_id)
{
    $url = "http://music.163.com/api/playlist/detail?id=" . $playlist_id;
    return curl_get($url);
}
  
// echo "<meta http-equiv='Content-Type'' content='text/html; charset=utf-8'>";

$obj = array();
for($i = 0, $mu=108418, $pl = 362279004; $mu < 118418, $pl < 362289004; $i++, $mu++, $pl++) {
    // musicDetail
    $detail = json_decode(get_music_info($mu));
    $det = $detail->songs;
    $id = $det[0]->commentThreadId;
    $obj[$i]->id = $id;
    $audition = $det[0]->audition;
    $musicName = $audition->name;
    $obj[$i]->musicName = $musicName;
    $url = $det[0]->mp3Url;
    $obj[$i]->url = $url;
    $artist = $det[0]->artists;
    $artistName = $artist[0]->name;
    $obj[$i]->artistName = $artistName;
    $album = $det[0]->album;
    $blurPicUrl = $album->blurPicUrl;
    $obj[$i]->blurPicUrl = $blurPicUrl;
    $albumName = $album->name;
    $obj[$i]->albumName = $albumName;

    // playList
    $playList = json_decode(get_playlist_info($pl));
    $play = $playList->result;
    $creator = $play->creator;
    $nickName = $creator->nickname;
    $province = $creator->province;
    $city = $creator->city;
    $playListName = $play->name;
    $createTime = $play->createTime;
    $commentCount = $play->commentCount;
    $shareCount = $play->shareCount;
    $subscribedCount = $play->subscribedCount;
    $obj[$i]->nickName = $nickName;
    $obj[$i]->province = $province;
    $obj[$i]->city = $city;
    $obj[$i]->playListName = $playListName;
    $obj[$i]->createTime = $createTime;
    $obj[$i]->commentCount = $commentCount;
    $obj[$i]->shareCount = $shareCount;
    $obj[$i]->subscribedCount = $subscribedCount;
}

echo json_encode($obj, JSON_UNESCAPED_UNICODE);
?>