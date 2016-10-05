<html>
    <head>
        <title>{{page.title}}</title>
    </head>
    <body>
        <h1>{{page.title}}</h1>
        {{> (lookup . page)}}
        <footer>
            <p>{{page.footer}}</p>
        </footer>
    </body>
</html>