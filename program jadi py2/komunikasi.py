import serial
from serial import Serial
from time import sleep
import RPi.GPIO as GPIO
import time
ser = serial.Serial(port='/dev/ttyUSB0', baudrate = 9600)

GPIO.setmode(GPIO.BOARD)
GPIO.setup(16,GPIO.OUT)

p = GPIO.PWM(16,50)
p.start(12.5)

while True:
    
    getVal = ser.readline()
    try:
        print(getVal)
        a = str(getVal)
        a = a[:-2]
        a = a[1:]
        print(a)
        if(a  =="D6 C1 06 1A"):
            print("bisa")
            
            p.ChangeDutyCycle(7.5)
            
            time.sleep(5)
            p.ChangeDutyCycle(2.5)
            time.sleep(1)
        
        
    except KeyboardInterrupt:
        GPIO.cleanup()
        sys.exit()
