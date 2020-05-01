import cv2
import numpy as np
import pytesseract
from PIL import Image
import re
import mmap
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
# Path of working folder on Disk
src_path = "C:\Program Files (x86)\Tesseract-OCR"

def get_string(img_path):
    # Read image with opencv
    img = cv2.imread(img_path)

    # Convert to gray
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply dilation and erosion to remove some noise
    kernel = np.ones((1, 1), np.uint8)
    img = cv2.dilate(img, kernel, iterations=1)
    img = cv2.erode(img, kernel, iterations=1)

    # Write image after removed noise
    cv2.imwrite(src_path + "removed_noise.png", img)

    #  Apply threshold to get image with only black and white
    #img = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)

    # Write the image after apply opencv to do some ...
    cv2.imwrite(src_path + "thres.png", img)

    # Recognize text with tesseract for python
    result = pytesseract.image_to_string(Image.open(img_path))

    # Remove template file
    #os.remove(temp)

    return result


# Function to extract all the numbers from the given string
def Number(str):
    array = re.findall(r'[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+|[0-9][0-9][0-9][0-9][-|""][0-9][0-9][0-9][0-9][-|""][0-9][0-9][0-9][0-9][-|""][0-9][0-9][0-9]', str)
    return array[0]


str = get_string("C:/Program Files/Tesseract-OCR/Temp/22.jpeg")
array = Number(str)
print(*array)
