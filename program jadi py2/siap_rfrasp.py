#!/usr/bin/env python

import signal
import time
import sys
import RPi.GPIO as GPIO
import pyrebase
from pirc522 import RFID

run = True
rdr = RFID()
util = rdr.util()
util.debug = True
#################
GPIO.setmode(GPIO.BOARD)
GPIO.setup(15,GPIO.OUT)

p = GPIO.PWM(15,50)
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

###################

def end_read(signal,frame):
    global run
    print("\nCtrl+C captured, ending read.")
    run = False
    rdr.cleanup()
    GPIO.cleanup()
    sys.exit()

signal.signal(signal.SIGINT, end_read)

print("Starting")
while run:
    rdr.wait_for_tag()

    (error, data) = rdr.request()
##    if not error:
##        print("\nDetected: " + format(data, "02x"))

    (error, uid) = rdr.anticoll()
    if not error:
##        print("Card read UID: "+str(uid[0])+","+str(uid[1])+","+str(uid[2])+","+str(uid[3]))
        ab = " "
        for x  in range(0,4):
##            print(x)
##            print(uid[x])
            if(uid[x] < 16 and x < 1) :
                ab = "0" +"%x" %int(str(uid[x]))
            if(uid[x] > 10 and x < 1) :
                ab = "%x" %int(str(uid[x]))
            if(uid[x] < 16 and x > 0) :
                ab = ab +" " + "0"+ "%x" %int(str(uid[x]))
            elif(uid[x] >10 and x > 0):
                ab = ab +" " + "%x" %int(str(uid[x]))
##                elif x != 0:
##                    ab = ab + " " + "%x" %int(str(uid[x])
##        s = ("%x" %int(str(uid[0])) +" "+"%x" %int(str(uid[1]))+" "+"%x" %int(str(uid[2]))+" "+"%x" %int(str(uid[3]) ))
##        print(ab)
        y = ab.upper()
##        print(y)
        my_get =  db.child("nama").child(y).get().val()
##        print(my_get)
        if my_get is not None :
            waktu = time.localtime()
            hari = time.strftime('%d-%m-%Y',waktu)
            jam = time.strftime('%H:%M',waktu)
##            print (hari + jam)
            db.child("dataparkir").child(hari).child(my_get).child("masuk").set(jam)
            p.ChangeDutyCycle(7.5)
            time.sleep(5)
            p.ChangeDutyCycle(2.5)
            time.sleep(1)
        if my_get is None:
            p.ChangeDutyCycle(2.5)
            time.sleep(1)
##        print("Setting tag")
##        util.set_tag(uid)
##        print("\nAuthorizing")
        #util.auth(rdr.auth_a, [0x12, 0x34, 0x56, 0x78, 0x96, 0x92])
##        util.auth(rdr.auth_b, [0x74, 0x00, 0x52, 0x35, 0x00, 0xFF])
##        print("\nReading")
##        util.read_out(4)
##        print("\nDeauthorizing")
##        util.deauth()

        time.sleep(1)
