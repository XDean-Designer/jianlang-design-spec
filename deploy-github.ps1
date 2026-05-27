# 部署到 GitHub Pages（需先登录 GitHub）
# 1. 运行: gh auth login
# 2. 运行: .\deploy-github.ps1

$ErrorActionPreference = "Stop"
$gh = if (Get-Command gh -ErrorAction SilentlyContinue) { "gh" } else { "$env:TEMP\gh-cli\bin\gh.exe" }

if (-not (Test-Path $gh) -and $gh -ne "gh") {
  Write-Host "未找到 gh，请先安装 GitHub CLI 或运行 Cursor 中的部署任务。"
  exit 1
}

& $gh auth status | Out-Null

$repoName = "jianlang-design-spec"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Test-Path ".git")) {
  git init -b main
}

git add index.html "剑琅联盟移动端设计规范.html" preview-server.js .github .gitignore deploy-github.ps1 LOGO2.png logo.png "剑琅联盟logo 1.png" 2>$null
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  $env:GIT_AUTHOR_NAME = "剑琅联盟"
  $env:GIT_AUTHOR_EMAIL = "design-spec@local"
  $env:GIT_COMMITTER_NAME = $env:GIT_AUTHOR_NAME
  $env:GIT_COMMITTER_EMAIL = $env:GIT_AUTHOR_EMAIL
  git commit -m "Deploy 剑琅联盟移动端设计规范 to GitHub Pages"
}

$owner = (& $gh api user -q .login)
$remote = "https://github.com/$owner/$repoName.git"

if (-not (git remote get-url origin 2>$null)) {
  & $gh repo create $repoName --public --source=. --remote=origin --description "剑琅联盟 B 端移动端设计规范" --push 2>$null
  if ($LASTEXITCODE -ne 0) {
    git remote add origin $remote
    git push -u origin main
  }
} else {
  git push -u origin main
}

& $gh api repos/$owner/$repoName/pages -X POST -f build_type=workflow 2>$null

Write-Host ""
Write-Host "仓库: https://github.com/$owner/$repoName"
Write-Host "Pages（部署完成后）: https://$owner.github.io/$repoName/"
