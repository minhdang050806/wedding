import gdown

url = "https://drive.google.com/drive/folders/1TX_UOkbEJ2pgIFDHuxPhPWXXDGGKq0Gb"
output_dir = "downloaded_folder"

gdown.download_folder(
    url=url,
    output=output_dir,
    quiet=False,
    use_cookies=False
)