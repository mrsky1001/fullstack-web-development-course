import subprocess
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

server = subprocess.Popen(["python", "-m", "http.server", "8896", "--directory", r"d:\IEEU International East-European University\fullstack-web-development-course\05. step by step 2026 & 2027\01. frontend\webinar-09-final-assembly-my-bookings\basic"])
time.sleep(1.5)

opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--window-size=1280,850")

driver = webdriver.Chrome(options=opts)

# 1. Login page and set auth
driver.get("http://localhost:8896/pages/login.html")
driver.execute_script("localStorage.setItem('currentUser', 'admin');")

# 2. My Bookings page
driver.get("http://localhost:8896/pages/my-bookings.html")
time.sleep(1)
out_raw = r"d:\IEEU International East-European University\fullstack-web-development-course\webinar9_bookings_raw.png"
driver.save_screenshot(out_raw)

driver.quit()
server.terminate()
print("Webinar 9 screenshot captured:", out_raw)

# Crop to 1210x670 (aspect ratio 1.806)
im = Image.open(out_raw)
# Crop top 0 to 670, left 35 to 1245
cropped = im.crop((35, 0, 1245, 670))
exact_path = r"d:\IEEU International East-European University\fullstack-web-development-course\webinar9_result_exact.png"
cropped.save(exact_path)
print("Webinar 9 exact result screenshot created:", exact_path, cropped.size)
