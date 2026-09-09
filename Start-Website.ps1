$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$runtime = Get-Command node -ErrorAction SilentlyContinue
if ($runtime) {
    & $runtime.Source scripts/serve.cjs
} elseif (Test-Path -LiteralPath '.tools/node.exe') {
    & ./.tools/node.exe scripts/serve.cjs
} else {
    Write-Host 'Install Node.js 18 or newer, then run this script again.'
    Write-Host 'You can also open index.html directly to view the static website.'
}
