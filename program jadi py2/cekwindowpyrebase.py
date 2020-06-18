import pyrebase
import time
config = {
    "apiKey": "AIzaSyCq9swuJpOJGvicULhJZ0yRWBZshwI6ZUI",
    "authDomain": "smart-parking-with-raspberry.firebaseapp.com",
    "databaseURL": "https://smart-parking-with-raspberry.firebaseio.com",
    "projectId": "smart-parking-with-raspberry",
   "storageBucket": "smart-parking-with-raspberry.appspot.com",
    "messagingSenderId": "396954787328"
    }
##config = {
##    "apiKey": "AIzaSyA45kcEW-YQELr4xSAkbKzLtPiMcY86d6Q",
##    "authDomain": "manajerial-plc.firebaseapp.com",
##    "databaseURL": "https://manajerial-plc.firebaseio.com",
##    "projectId": "manajerial-plc",
##    "storageBucket": "manajerial-plc.appspot.com",
##    "messagingSenderId": "4524869581"
##  }


firebase  = pyrebase.initialize_app(config)
db = firebase.database()
time.sleep(5)
my_get =  db.child("dataparkir").child("Agus").child("keluarr").get().val()
if my_get is None :
    print("text")
print(my_get)

##def stream_handler(message):
##    print(message)
##    if(message['data'] is 1):
##        print(message)   
##
##my_stream = db.child("dataparkir").child("Agus").stream(stream_handler,None)
