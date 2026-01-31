from flask import Flask
from flask_cors import CORS
from flask import jsonify
from database.dbops import create_task,delete_task,get_task,update_task,get_all_tasks
from flask import request

app = Flask(__name__)


CORS(
    app=app,
    allow_headers=['*'],
    resources={"/*": {"origins": "*", "methods": ["GET","POST","PUT","DELETE"]}}
)

@app.route('/tasks', methods=['GET'])
def get_tasks_end():
    try:
        return jsonify({"message":"success","tasks":get_all_tasks()}),200
    except Exception as e:
        print(e)
        return jsonify({"message":"failed"}),404
    
@app.route('/tasks', methods=['POST'])
def create_task_end():
    try:
        data = dict(request.get_json())
        print(data.keys(),data.values())
        task = create_task(title=data['title'], description=data['description'])
        return jsonify({"message":"success","task":task}),201
    
    except Exception as e:
        print(e)
        return jsonify({"message":"failed"}),400
    
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task_end(task_id):
    try:
        data = dict(request.get_json())
        print(data)
        update_task(task_id=task_id,title=data.get('title'),description=data.get('description'))
        return jsonify({"message":"success","updated_task":task_id}),200
    except Exception as e:
        print(e)
        return jsonify({"message":"failed"}),404

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task_end(task_id):
    try:
        delete_task(task_id=task_id)
        return jsonify({"message":"success"}),200
    except Exception as e:
        print(e)
        return jsonify({"message":"failed"}),404

@app.route('/tasks/<int:task_id>',methods=['GET'])
def get_task_end(task_id):
    try:
        return jsonify({"message":"success","task":get_task(task_id=task_id)}),200
    except Exception as e:
        print(e)
        return jsonify({"message":"failed"}),404

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000,debug=True)