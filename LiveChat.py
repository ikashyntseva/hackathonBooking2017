import bottle
from bottle import route, run, template, static_file, request, response
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
    data = request.json
    dataBase.append(data)
    ans = sampleAns[data['msg']]
    data['msg'] = ans
    data['timestamp'] = time.time() * 1000
    if data['sender'] == data['A_id']:
        data['sender'] = data['B_id']
    else:
        data['sender'] = data['A_id']
    dataBase.append(data)
    response.content_type = 'application/json'
    return json.dumps(dataBase)

if __name__ == "__main__":
    run(host='localhost', port=5000, debug=True)
