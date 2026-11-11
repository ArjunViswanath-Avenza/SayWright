# Saywright in Chrome: start the local backend if it is not running, then open it as a Chrome app window.
# The backend runs in its own minimised window ("Saywright backend"); close that window to stop it.
$url = "http://127.0.0.1:8770"
function Up { try { Invoke-WebRequest -UseBasicParsing "$url/api/status" -TimeoutSec 2 | Out-Null; $true } catch { $false } }

if (-not (Up)) {
    $server = Join-Path $PSScriptRoot "server.py"
    Start-Process cmd -ArgumentList "/k", "title Saywright backend && python `"$server`"" -WindowStyle Minimized
    for ($i = 0; $i -lt 120 -and -not (Up); $i++) { Start-Sleep -Milliseconds 500 }
    if (-not (Up)) {
        Write-Host "The Saywright backend did not start. Open the 'Saywright backend' window to see the error."
        Read-Host "Press Enter to close"
        exit 1
    }
}

$chrome = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
            "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
            "$env:LocalAppData\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if ($chrome) { Start-Process $chrome -ArgumentList "--app=$url/" } else { Start-Process "$url/" }
