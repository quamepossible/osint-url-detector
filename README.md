# PHISHING URL DETECTOR

This is a web-based tool that checks whether a URL is phishing or not.

This project consists of two parts.
*  Backend
*  Frontend

## **1.  BACKEND**
The backend of this project was developed with **Python** and the **Flask Library**.<br>
The Python script analyzes the given URL and performs several operations to ultimately make a decisive decision. <br>

### DECISION MAKING
1.  The backend contains two datasets containing millions of legitimate and known phishing URLs.
1.  When a URL is sent to the backend for analysis, it is compared against these datasets for quick-decision making. 
1.  If no match is found, the script makes external calls to several APIs to gather more information about the domain.
1.  Various factors are used to determine the legitimacy of a domain, including:
    * **WHOIS** records to check the existence of the domain.
    * extracting domain creation and expiration dates to assess its age.
    * analyzing the **RANK** of the URL to gauge its popularity on the web.
    * lastly, we do **SIMILARITY CHECK**, which. 
        * compares the given URL to both legitimate and phishing datasets.
        * identifies if the URL is attempting to impersonate a legitimate website.
        * calculates a **Similarity Count** based on the number of legitimate URLs the given URL resembles.
1.  Based on these factors, a **THREAT SCORE** is calculated to determine whether the URL is more likely to be a  **Phishing** or **Safe** URL.
1.  After analyzing the URL and calculating the **Threat Score**, a decision is made, and all relevant information about the URL is stored in a Python dictionary, which is then accessible via an endpoint set up using the **Flask Library**.
1. This allows us to send an HTTP request from our fronted web application to the backend.

## **2. FRONTEND** 
The GUI for this project is web-based, developed using HTML, CSS, and Javascript. A web-based interface was chosen to provide easy access to the tool, as all modern devices support web browsers.

### FEATURES
1. An input field to accept a URL.
1. Makes an HTTP request to the backend for analysis.
1. Receives the response from the backend for display.
1. Color coding for improved visualization.
