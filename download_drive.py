import re
import urllib.request
import json

url = "https://drive.google.com/drive/u/0/folders/1oY-qFyop73I7TYnJbp20NkymrlLNUb9Y"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    print(f"HTML downloaded. Length: {len(html)}")
    
    # Try to find init data
    # Google Drive folder pages embed file lists in a script tag using a JS array format
    matches = re.findall(r'window\.initData\s*=\s*(.*?);', html)
    if matches:
        print("Found window.initData matches:")
        for idx, m in enumerate(matches):
            print(f"Match {idx}: {m[:200]}...")
    else:
        # Search for any large JSON or array structures
        # Look for _F_tdata or similar
        print("No window.initData found. Checking for _F_tdata or other patterns...")
        tdata = re.findall(r'_F_tdata\s*=\s*(.*?);', html)
        if tdata:
            print(f"Found _F_tdata: {tdata[0][:200]}...")
        else:
            print("No common Google Drive JS data patterns found.")
            # Let's save a snippet of the script tags to see what's in there
            scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
            print(f"Found {len(scripts)} script tags.")
            for i, script in enumerate(scripts):
                if "1oY-qFyop73I7TYnJbp20NkymrlLNUb9Y" in script or "folder" in script:
                    print(f"Script {i} contains keywords: {script[:300]}...")
except Exception as e:
    print(f"Error fetching page: {e}")
