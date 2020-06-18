import serial
from serial import Serial
from time import sleep
import RPi.GPIO as GPIO
import time
import pyrebase
ser = serial.Serial(port='/dev/ttyUSB0', baudrate = 9600)

GPIO.setmode(GPIO.BOARD)
GPIO.setup(16,GPIO.OUT)

p = GPIO.PWM(16,50)
p.start(2.5)
config = {
    "apiKey": "AIzaSyCq9swuJpOJGvicULhJZ0yRWBZshwI6ZUI",
    "authDomain": "smart-parking-with-raspberry.firebaseapp.com",
    "databaseURL": "https://smart-parking-with-raspberry.firebaseio.com",
    "projectId": "smart-parking-with-raspberry",
   "storageBucket": "smart-parking-with-raspberry.appspot.com",
    "messagingSenderId": "396954787328"
    }

firebase  = pyrebase.initialize_app(config)
db = firebase.database()
while True:
    
    getVal = ser.readline()
    try:
##        print(getVal)
        a = str(getVal)
        a = a[:-2]
        a = a[1:]
##        print(a)
        my_get =  db.child("nama").child(a).get().val()
##        print(my_get)
        if my_get is not None :
            waktu = time.localtime()
            hari = time.strftime('%d-%m-%Y',waktu)
            jam = time.strftime('%H:%M',waktu)
##            print (hari + jam)
            db.child("dataparkir").child(hari).child(my_get).child("keluar").set(jam)
            p.ChangeDutyCycle(7.5)
            time.sleep(5)
            p.ChangeDutyCycle(2.5)
            time.sleep(1)
        if my_get is None:
            p.ChangeDutyCycle(2.5)
            time.sleep(1)
        
        
    except KeyboardInterrupt:
        GPIO.cleanup()
        sys.exit()
