from flask import Flask, escape, request

from pymongo import MongoClient


client = MongoClient('localhost', 27017)
alcaldiaCol = client.visual.alcaldia


# records = list(alcaldiaCol.find({"dpto":"ANTIOQUIA"}))
#
# print (len(records))


def deleteID(rec):

  rec["_id"] = None

  return rec


app = Flask(__name__)

@app.route('/data')
def data():
    dpto = request.args.get("dpto", "ANTIOQUIA")
    query = {"dpto":dpto}
    opts = { "_id": 0 }
    return {"records":list(alcaldiaCol.find(query, opts))}



