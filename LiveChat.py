import bottle
from bottle import route, run, template, static_file, request
import json
import time

dataBase = []
sampleAns = {'hey':'hello', '123':'1234', '234':'345'}

@route('/')
def index():
    return template('LiveChat')

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

@route ('/message', method='POST')
def post_msg():
    print (request)
    data = request.json

    print(data)
    dataBase.append(data)
    ans = sampleAns[data['msg']]
    data2 = {};
    data2['A_id'] = data['A_id']
    data2['B_id'] = data['B_id']
    data2['msg'] = ans
    data2['timestamp'] = time.time() * 1000
    if data['sender'] == data['A_id']:
        data2['sender'] = data['B_id']
    else:
        data2['sender'] = data['A_id']
    data2['category'] = data['category']
    dataBase.append(data2)
    print (dataBase)
    return dataBase

if __name__ == "__main__":
    run(host='localhost', port=5000, debug=True)
