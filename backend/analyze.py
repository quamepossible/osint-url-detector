import difflib
from fuzzywuzzy import fuzz
from getwhois import DomainCheck

# this dictionary will store final analyzed data of URL
domain_full_data = {}

# reset analyzed data
def reset_analyzed_data():
    domain_full_data.clear()

# read url files
def read_files(file_path):
    db_list = []
    with open(file_path, mode="r") as urls:
        return set(url.strip() for url in urls)

phishing_list = read_files("phish_urls.txt")
legit_list = read_files("legit_urls.txt")

def legit_url(target_domain):
    try:
        # init object for DomainCheck class
        domain_integrity_obj = DomainCheck(target_domain)
        run_domain_check = domain_integrity_obj.send_domain_output()
        print(run_domain_check)

        # check if url is a valid url
        if "error" in run_domain_check.keys():
            return { "error": "invalid-url" }

        # url
        domain_full_data["url"] = target_domain

        # run whois on url (for additional info)
        domain_full_data["creation_date"] = run_domain_check["domain_created"]
        domain_full_data["expiration_date"] = run_domain_check["domain_expires"]
        print(f"Domain Created ===> {domain_full_data["creation_date"]}")

        # check rank
        domain_full_data["rank"] = run_domain_check["rank"]

        # 1. first check if url is a legitimate URL
        if target_domain in legit_list:
            domain_full_data["status"] = "legit"

        # 2. check if url is in phishing URL
        elif target_domain in phishing_list:
            domain_full_data["status"] = "phishing"

        # 3. URL is not in either legit nor phish database
            # it can either be a new phishing URL or a new legit URL
            # check similarity with legitimate URL database
        else:
            # check if there's any similarity match
            similar_match_one = calculate_similarity(target_domain)
            similar_match_two = check_database(target_domain)
            all_matches = list(set(similar_match_one + similar_match_two))
            # domain_full_data["similar_urls"] = all_matches

            # compare subdomains, malicious, suspicious, rank, and similar matches
            #  to make decision

            # each risk-count has a value of 10
                # a total score of <= 50 is less likely to be a phish
            subdomains_count = target_domain.count('.')# starts counting at 3 (min: 20)
            hyphen_count = target_domain.count('-')# starts counting at 3 (min: 20)
            malicious_count = run_domain_check['malicious']# starts counting at 1 (min: 0)
            suspicious_count = run_domain_check['suspicious']# starts counting at 1 (min: 0)
            match_count = len(all_matches)# starts counting at 2 (min: 10)
            rank_count = domain_full_data['rank'] # rank value will likely be zero(0) for most url
            all_counts = [subdomains_count, hyphen_count, malicious_count, suspicious_count, match_count]

            # sum all counts
            phish_count = sum(list(map(lambda i: i*10, all_counts)))
            domain_full_data["threat_score"] = phish_count

            # number of similar urls
            domain_full_data["similar_count"] = match_count

            # use above calculated score to determine the status of the URL
            domain_full_data["status"] = "safe" if phish_count <= 50 else ("likely" if phish_count <= 100 else ("highly-likely" if phish_count <= 200 else "phishing"))

        return domain_full_data
    except:
        return {"error": "failed-to-analyze"}

# find similarities
    # this function compares "url" to validate with legitimate urls
    # to get list of urls the "url" is trying to impersonate
def calculate_similarity(target_domain):
    similar_urls = []
    for each_url in legit_list:
        score = fuzz.ratio(target_domain, each_url)
        if score > 90:
            similar_urls.append(each_url)

    # sort similar urls
    similar_urls.sort(key=lambda x: x[1], reverse=True)
    return similar_urls if len(similar_urls) > 0 else []


def check_database(target_domain):
    # Find similar domains in legitimate database
    similar_domains = difflib.get_close_matches(target_domain, legit_list, n=10, cutoff=0.9)
    if similar_domains:
        return similar_domains if len(similar_domains) > 0 else []
    else:
        print("not found")
        return []

