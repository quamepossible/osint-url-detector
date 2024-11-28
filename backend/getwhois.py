import whois
import requests
import base64


class DomainCheck:

    def __init__(self, domain_url):
        self.full_domain_results = {}
        self.domain_url = domain_url


    def domain_integrity(self):
        try:
            target_domain = self.domain_url

            # encode url to base64 before sending request to API
            encoded_url = base64.b64encode(target_domain.encode('utf-8')).decode('utf-8')

            # remove any trailing equal sign (=) from encoded string
            encoded_url = encoded_url.rstrip('=')

            # valid url for API request
            full_url = "https://www.virustotal.com/api/v3/urls/"+encoded_url

            # send API request with base64 encoded url
            response = requests.get(full_url, headers = {"accept":"application/json","x-apikey":"80982581b76e15b0c1f085b7493f3ebf6962422693f517f9907d8fb3c3565cba"})

            # get response in json format
            full_response = response.json()
            integrity_status = full_response["data"]["attributes"]["last_analysis_stats"] if not "error" in full_response.keys() else {"malicious":100,"suspicious":100}

            self.full_domain_results["malicious"] = integrity_status['malicious']
            self.full_domain_results["suspicious"] = integrity_status['suspicious']
        except:
            self.full_domain_results = {"error": "url-integrity-check-failure"}


    def domain_rank(self):
        try:
            target_domain = self.domain_url
            get_rank = requests.get(f"https://tranco-list.eu/api/ranks/domain/{target_domain}")
            rank_response = get_rank.json()
            self.full_domain_results["rank"] =  rank_response['ranks'][0]['rank'] if len(rank_response['ranks']) > 0 else 0
        except:
            self.full_domain_results = {"error": "url-rank-failure"}

    def get_whois_info(self):
        try:
            target_domain = self.domain_url
            run_whois = whois.whois(target_domain)
            print("WhoIsData ===>", run_whois)
            created, expires = run_whois['creation_date'], run_whois['expiration_date']
            self.full_domain_results["domain_created"] = created[0] if isinstance(created, list) else created
            self.full_domain_results["domain_expires"] = expires[0] if isinstance(created, list) else expires

            print()
            print(f"Created Instance ===> {type(created)}")
            print(f"Expires Instance ===> {type(expires)}")
            print()
        except:
            print(f"{self.full_domain_results['domain_created']} \n{self.full_domain_results['domain_expires']}")
            self.full_domain_results = {"error": "invalid-url"}

    def send_domain_output(self):
        self.domain_integrity()
        self.domain_rank()
        self.get_whois_info()
        return self.full_domain_results

