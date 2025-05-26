$Hso = New-Object Net.HttpListener
$Hso.Prefixes.Add("http://localhost:9000/")
$Hso.Start()

Write-Host "Server started at http://localhost:9000/"
Write-Host "CTRL+C to stop"

while ($Hso.IsListening) {
    $HC = $Hso.GetContext()
    
    $HRes = $HC.Response
    
    $Path = Join-Path (Join-Path $PSScriptRoot "public") ($HC.Request.RawUrl -replace "^/")
    if ($HC.Request.RawUrl -eq "/") { $Path = Join-Path $PSScriptRoot "public\index.html" }
    
    if (Test-Path $Path -PathType Leaf) {
        Write-Host "200 $Path"
        $Content = [System.IO.File]::ReadAllBytes($Path)
        $HRes.ContentLength64 = $Content.Length
        $HRes.OutputStream.Write($Content, 0, $Content.Length)
    } else {
        Write-Host "404 $Path"
        $NotFound = [Text.Encoding]::UTF8.GetBytes("<h1>404 - Page Not Found</h1>")
        $HRes.StatusCode = 404
        $HRes.ContentLength64 = $NotFound.Length
        $HRes.OutputStream.Write($NotFound, 0, $NotFound.Length)
    }
    
    $HRes.Close()
} 