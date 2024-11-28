from flask import Flask, request
from flask_cors import CORS
from urllib.parse import urlparse

# import custom modules
from analyze import legit_url, reset_analyzed_data

app = Flask(__name__)
CORS(app)

@app.post("/analyze")
def analyze():
    form_data = request.get_json()
    print(form_data)
    get_url = form_data['url']


    # 1. extract url information
    parsed_url = urlparse(get_url)
    domain = parsed_url.netloc
    valid_domain = parsed_url.path if len(domain) == 0 else domain

    # 2. run analysis
    analyzed = legit_url(valid_domain)
    send_analyzed = analyzed.copy()

    # 3. reset data
    reset_analyzed_data()
    return {"results": send_analyzed}



if __name__ == '__main__':
    app.run(debug=True)
