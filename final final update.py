import cv2



import numpy as np



import pytesseract



import matplotlib.pyplot as plt



from PIL import Image

import string

import re







# Recognize text with tesseract for python
# path of Tesseract-OCR program on my computer

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"



# Path  of charging photos on my computer

src_path = r"C:/Program Files/Tesseract-OCR/Temp/Temp2/"







def get_string(img_path):



    # Read image with opencv

    img = cv2.imread(img_path)



    # Convert image from colors  to gray

    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


    # Apply  erosion on the image to remove some noise using elipse structuring element

    kernel =cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))

    img_erode = cv2.erode(img, kernel, iterations=1)




    # see the  image after removing noise

    #cv2.imshow('removed_noise.png',img_erode)

    #cv2.waitKey(0)



    # Apply threshold to get image with only black and white

    (thresh,img_threshold) = cv2.threshold(img, 117, 255, cv2.THRESH_BINARY)


    # see the  image after applying threshold

    #cv2.imshow('image_threshold.png',img_threshold)

    #cv2.waitKey(0)





    # Recognize text with tesseract for python

    result = pytesseract.image_to_string(img_path,lang='eng+ara')


   # return the text recognized from image 
    return result







print ("------ Done -------")

# Function to extract all the numbers from the given string

def Number(str):

    array = re.findall(r'[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+|[0-9][0-9][0-9][0-9][-|" "][0-9][0-9][0-9][0-9][-|" "][0-9][0-9][0-9][0-9][-|" "][0-9][0-9][0-9]+', str)
    if (len(array)>1):
        if(array[0]==array[1]):
            array=array[0]
        elif(array[0]!=array[1] or array[0]!=array[1]!=array[2] ):
            return array[0]
        else:array=array[0]
    return ''.join(array)




x="16.jpg"
str = get_string(src_path + x)

array = Number(str)

#array=array.translate({ord(c): None for c in string.whitespace})

array = array.replace("-","").replace(" ","")
x=int(array)
print (x)
#array = [item.replace("-", "") for item in array]
#array = [item.replace(" ", "") for item in array]
#array=array.remove("-")
#print(*array)



def NameC(str):

    ss="i can't detect the sim card :("

    if  (re.findall(r'etisalat|اتصالات|Etisalat|"*إتصالات|"*556', str)):

        ss = "etisalat"

    elif (re.findall(r'فودافون|VODAFONE|vodafone|كارت لفرحة|فونلون|"*585*"|Vodafone', str)):

        ss = "vodafone"

    elif (re.findall(r'اورانج|orange|Orange|اوراتج|اورائج', str)):

        ss="orange"

    elif (re.findall(r'we|WE', str)):

        ss = "we"

    return ss



ss = NameC(str)

#ss = ss.translate({ord(c): None for c in string.whitespace})

#ss= ss.replace("-", "")

print(ss)





            # found = True # Not necessary

#print ('--- Start recognize text from image ---')

#print (get_string("C:/Program Files/Tesseract-OCR/Temp/Temp2/16.jpg"))

#print (Name(get_string("C:/Program Files/Tesseract-OCR/Temp/8.png")))

#print ("------ Done -------")
