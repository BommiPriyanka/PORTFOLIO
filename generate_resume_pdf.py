import os
import shutil

def sync_resume():
    src = "BommiPriyank(up).pdf"
    if os.path.exists(src):
        shutil.copy(src, "public/resume.pdf")
        if os.path.exists("dist"):
            shutil.copy(src, "dist/resume.pdf")
        print("Successfully synced authentic PDF:", src)
    else:
        print("Source PDF not found:", src)

if __name__ == "__main__":
    sync_resume()
