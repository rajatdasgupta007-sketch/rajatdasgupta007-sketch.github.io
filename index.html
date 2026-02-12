<?php
// Handle Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST["message"])) {
        // Sanitize input to prevent XSS
        $message = htmlspecialchars($_POST["message"]);

        // Save to file
        file_put_contents("posts.txt", $message . "\n", FILE_APPEND);
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Anonymous Confession Wall</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Anonymous Confession Wall</h1>

    <form method="POST">
        <textarea name="message" placeholder="Write your confession or advice..." required></textarea>
        <button type="submit">Post</button>
    </form>

    <h2>Recent Posts</h2>

    <div class="posts">
        <?php
        if (file_exists("posts.txt")) {
            $posts = file("posts.txt");
            $posts = array_reverse($posts); // Newest first
            foreach ($posts as $post) {
                echo "<div class='post'>" . $post . "</div>";
            }
        }
        ?>
    </div>
</div>

</body>
</html>