import requests
response = requests.get("https://dw9to29mmj727.cloudfront.net/misc/newsletter-naruto3.png")

file = open("sample_image.png", "wb")
file.write(response.content)
file.close()