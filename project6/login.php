<?php

session_start(); // This must be the first line of your PHP code to start a session

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$db_name = 'contract_breif';
$db_username = 'root';
$db_password = '';
$db_host = 'localhost';

$pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_username, $db_password);

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");

$stmt->execute(['email' => $email]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id']; // Set the user_id in the session
    $_SESSION['role_id'] = $user['role_id']; // Set the role_id in the session

    $token = 'your_generated_token_here';

    $response = [
        'message' => 'Login successful',
        'token' => $token,
        'user_id' => $user['id'],  // Assuming 'id' is the column name in your database
        'role_id' => $user['role_id']  // Assuming 'role_id' is the column name in your database
    ];
} else {
    $response = [
        'message' => 'Login failed', 
        'user' => $user // Including the user information in the response
    ];
}

header('Content-Type: application/json');
echo json_encode($response);

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// $db_name = 'contract_breif';
// $db_username = 'root';
// $db_password = '';
// $db_host = 'localhost';

// $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_username, $db_password);

// $data = json_decode(file_get_contents('php://input'), true);

// $email = $data['email'];
// $password = $data['password'];

// $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");

// $stmt->execute(['email' => $email]);

// $user = $stmt->fetch(PDO::FETCH_ASSOC);

// if ($user && password_verify($password, $user['password'])) {
//     $token = 'your_generated_token_here';

//     $response = [
//         'message' => 'Login successful',
//         'token' => $token,
//         'user_id' => $user['id'],  // Assuming 'id' is the column name in your database
//         'role_id' => $user['role_id']  // Assuming 'role_id' is the column name in your database
//     ];
// } else {
//     $response = [
//         'message' => 'Login failed', 
//         'user' => $user // Including the user information in the response
//     ];
// }

// header('Content-Type: application/json');
// echo json_encode($response);
?>
