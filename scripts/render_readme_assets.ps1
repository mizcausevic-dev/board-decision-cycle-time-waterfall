$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $bitmap = New-Object System.Drawing.Bitmap 1440, 900
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(90, 103, 224, 190), 3)

  $graphics.FillRectangle($panelBrush, 45, 45, 1350, 810)
  $graphics.DrawRectangle($borderPen, 45, 45, 1350, 810)

  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontTitle = New-Object System.Drawing.Font("Georgia", 32, [System.Drawing.FontStyle]::Bold)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $graphics.DrawString("Board Decision Cycle-Time Waterfall", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $textBrush, [System.Drawing.RectangleF]::new(70, 150, 1220, 170))
  $graphics.DrawString($Subtitle, $fontBody, $mutedBrush, [System.Drawing.RectangleF]::new(70, 315, 1240, 100))

  $y = 430
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 86, $y + 10, 10, 10)
    $graphics.DrawString($bullet, $fontBody, $textBrush, [System.Drawing.RectangleF]::new(110, $y, 1220, 70))
    $y += 78
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 780)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Board-visible timing loss stays explicit before another cycle slips" -Subtitle "This waterfall exposes intake, review, approval, handoff, and rework delay in one board-facing timing surface." -Bullets @(
  "Which lanes are losing the most time and in which stage the loss is really happening.",
  "Where approval dwell, handoff delay, or rework are inflating total cycle time.",
  "What should be collapsed, merged, fast-laned, or frozen next."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-cycle-register-proof.png") -Title "Cycle register keeps each lane, dominant stage, owner, and next move attached" -Subtitle "Every lane retains the timing tier, accountable owner, board audience, and immediate next step." -Bullets @(
  "Each lane stays connected to one owner and one board-facing audience.",
  "Cycle-time loss is visible before it becomes another vague complaint about slow execution.",
  "The next corrective move stays next to the lane instead of disappearing into a separate memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-delay-waterfall-proof.png") -Title "Delay waterfall shows where intake, review, approval, handoff, and rework are accumulating" -Subtitle "The dominant timing drag stays visible so leadership can shorten the right stage first." -Bullets @(
  "The blocking stage is explicit instead of implied.",
  "Stage dwell stays readable at a glance.",
  "Each lane ties to a concrete timing intervention instead of a generic operating complaint."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-timing-posture-proof.png") -Title "Timing posture keeps cycle-time intervention grounded in owners and recoverable value" -Subtitle "The same surface shows which timing move should happen first and what value is still trapped." -Bullets @(
  "Timing intervention stays tied to one owner.",
  "Recoverable value is visible before the next review cycle.",
  "Boards and operators can see which cycle-time fix should move first."
)
