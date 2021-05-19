from flask import Flask, render_template

app = Flask(__name__)

mark = ("BUSY", "TAG", "TAG_OLD")
size = 8
type = ("INST", "RS", "RT", "RD")
inst = (
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
    return render_template("ooo.html", size=size, type=type, inst=inst, mark=mark)