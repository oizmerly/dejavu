<?php
/**
 * Proxy data to Splunk HEC
 */

// The next constants should be replaced by your Splunk HEC properties
define('HEC', 'https://localhost:8088/services/collector/event'); 
define('TOKEN', 'DFDDB90F-2F43-4B98-BCAC-E80ADA712699');

$data = file_get_contents('php://input');

// post data to Splunk HEC
$ch = curl_init(HEC);
curl_setopt_array($ch, array(
    CURLOPT_POST => 1,
    CURLOPT_HTTPHEADER  => array('Authorization: Splunk ' . TOKEN),
    CURLOPT_RETURNTRANSFER  => true,
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_VERBOSE => 1,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_SSL_VERIFYHOST => 0
));
$response = curl_exec($ch);
curl_close($ch);
echo $response;
?>
