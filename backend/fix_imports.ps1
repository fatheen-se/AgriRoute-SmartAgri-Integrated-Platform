$dir = "C:\Users\hp pavillion 15\Desktop\Github\AgriRoute-SmartAgri-Integrated-Platform\backend\src\main\java\com\utils\extras"

Get-ChildItem -Path $dir -Filter *.java | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    # Remove the unused imports
    $content = $content -replace "(?m)^import java\.(util|text|io|net)\.\*;\s*\r?\n", ""
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8
    Write-Host "Fixed imports in $($_.Name)"
}

Write-Host "All unused imports have been successfully removed! The IDE warnings should now disappear."
