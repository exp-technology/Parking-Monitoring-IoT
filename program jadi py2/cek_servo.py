import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setup(15,GPIO.OUT)
GPIO.setup(16,GPIO.OUT)
p = GPIO.PWM(11,50)
p.start(7.5)
q = GPIO.PWM(16,50)
q.start(7.5)

try :
	while True :
		p.ChangeDutyCycle(7.5)
		time.sleep(1)
		p.ChangeDutyCycle(12.5)
		time.sleep(1)
		p.ChangeDutyCycle(2.5)
		time.sleep(1)	
		q.ChangeDutyCycle(7.5)
                time.sleep(1)
                q.ChangeDutyCycle(12.5)
                time.sleep(1)
                q.ChangeDutyCycle(2.5)
                time.sleep(1)
		print ("test")
except KeyboardInterrupt:
	print ("gagalZZ")
	GPIO.cleanup()
