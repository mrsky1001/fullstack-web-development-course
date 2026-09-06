import subprocess
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

server = subprocess.Popen(["python", "-m", "http.server", "8895", "--directory", r"d:\IEEU International East-European University\fullstack-web-development-course\05. step by step 2026 & 2027\01. frontend\webinar-08-filters-and-booking-calc\basic"])
time.sleep(1.5)

opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--window-size=1280,850")

driver = webdriver.Chrome(options=opts)

# 1. Login page and set auth
driver.get("http://localhost:8895/pages/login.html")
driver.execute_script("localStorage.setItem('currentUser', 'admin');")

# 2. Booking page with calculator
driver.get("http://localhost:8895/pages/booking.html?room=focus-1")
time.sleep(1)
out_booking = r"d:\IEEU International East-European University\fullstack-web-development-course\webinar8_booking_auth.png"
driver.save_screenshot(out_booking)

# 3. Catalog page with search and sort
driver.get("http://localhost:8895/pages/catalog.html")
time.sleep(1)
out_catalog = r"d:\IEEU International East-European University\fullstack-web-development-course\webinar8_catalog_auth.png"
driver.save_screenshot(out_catalog)

driver.quit()
server.terminate()
print("Both screenshots captured!")
