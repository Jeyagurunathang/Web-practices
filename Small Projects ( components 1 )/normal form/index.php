<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Normal Form</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" class="box">
        <div class="form_group">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <input type="submit" value="Submit" name="submit" id="btn">
            <p>Not registered ? <a href="#">Create an account</a></p>
        </div>
    </form>

</body>
</html>