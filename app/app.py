from flask import Flask, render_template

app = Flask(__name__)

mark_ROB = ("PC", "BUSY", "TAG", "TAG OLD")
mark_RS  = ("PC", "BUSY",
    "RS ready", "RT ready", "RD ready", "ISSUED")
size     = 8
type_ROB = ("INST", "RS", "RT", "RD")
type_RS  = ("INST", "RS", "RT", "RD")
inst     = (
    ("add", "r1", "r4", "r3"),
    ("li", "r2", "r5", ""),
    ("mult", "r3", "r4", "r5"),
    ("st", "r2", "r1", ""),
    ("add", "r1", "r4", "r3"),
    ("add", "r1", "r4", "r3"),
    ("mult", "r3", "r4", "r5"),
    ("st", "r2", "r1", ""),
    ("add", "r1", "r4", "r3"),
    ("add", "r1", "r4", "r3")
)

@app.route("/")
def ooo():
    return render_template("ooo.html", size=size, inst=inst,
    type_RS=type_RS,  mark_RS=mark_RS,
    type_ROB=type_ROB, mark_ROB=mark_ROB)