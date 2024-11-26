"use strict";
import { RefinedRes } from "./RefinedRes.js";

const analyze_form = document.getElementById("analyze-form");
const overlay = document.getElementById("overlay");
const analysis_table = document.getElementById("analysis-tab");
const url_text = document.getElementById("url-text");
const loader = document.getElementById("loader");
const loader_display = document.getElementById("loader-display");

analyze_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.display = "block";

  // get formData
  const form_data = Object.fromEntries(new FormData(analyze_form));
  const url = analyze_form.dataset.url;
  form_data["url"] = form_data["url"].trim();
  console.log(form_data);
  console.log(url);

  try {
    const do_analysis = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: JSON.stringify(form_data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // check status of request
    if (do_analysis.status !== 200) {
      throw new Error("Fetch Failed");
    }

    const analysis_results = await do_analysis.json();

    // extract analyzed results from json output
    const analyzed_data = analysis_results["results"];
    console.log(analyzed_data);

    if (analyzed_data?.error) {
      // domain not found
      loader_display.innerHTML = "";
      const err_code = analyzed_data.error.split("-")[0];
      console.log(err_code);
      const err_image = `<img src="/assets/error.jpg" class="block mx-auto" id="loader-img" width="100px"/>`;
      const err_message =
        err_code == "failed"
          ? "<p class='text-red-500 loader-err'>There was a problem analyzing URL<br/>Please refresh page and try again</p>"
          : "invalid"
          ? "<p class='text-red-500 loader-err'>URL entered is <b>Invalid</b><br/>Enter another URL</p>"
          : "Unknow Error: Contact Admin";
        
      const full_err_mess = err_image + err_message;
      console.log(full_err_mess);
      loader_display.insertAdjacentHTML("beforeend", full_err_mess);
      return;
    }

    // close loader
    loader.style.display = "none";

    // open insights dialog box
    overlay.style.display = "block";

    // display url on-top of page
    url_text.innerHTML = analyzed_data?.url;
    // display phish status on-top of page
    const basic_info = document.getElementById("basic-info");
    const phish_status = analyzed_data.status;
    let status_color =
      phish_status === "legit" || phish_status === "safe"
        ? "border-green-400 text-green-400"
        : phish_status === "phishing"
        ? "border-red-400 text-red-400"
        : phish_status === "likely"
        ? "border-yellow-400 text-yellow-400"
        : "border-blue-400 text-blue-400";

    let info_color =
      phish_status === "legit" || phish_status === "safe"
        ? "info-green"
        : phish_status === "phishing"
        ? "info-red"
        : phish_status === "likely"
        ? "info-yellow"
        : "info-blue";
    basic_info.classList.add(info_color)
    

    const status_span = `<span id="sts" class="${status_color} border-2 border-dashed px-4 py-2 rounded-full"><b>${analyzed_data.status.toUpperCase()}</b></span>`;
    basic_info.insertAdjacentHTML("beforeend", status_span);

    const filteredResults = RefinedRes(analyzed_data);
    console.log("Refined Res ===> ", filteredResults);

    const data_obj_entries = Object.entries(filteredResults);
    let counter = 0;
    let mainObj = [];
    let subObj = [];
    data_obj_entries.forEach((entry, x) => {
      subObj.push(entry);
      counter++;
      if (counter == 2 || x + 1 == data_obj_entries.length) {
        mainObj.push(subObj);
        subObj = [];
        counter = 0;
      }
    });
    console.log(mainObj);

    mainObj.forEach((row) => {
      let cols = ``;
      row.forEach((col) => {
        col[0] =
          col[0] == "creation_date"
            ? "Date Created"
            : col[0] == "expiration_date"
            ? "Expiration Date"
            : col[0] == "threat_score"
            ? "Threat Score"
            : col[0];
        cols += `<td class=""><b>${col[0]}</b>: ${col[1]}</td>`;
      });
      let tab_row = `<tr class="row w-full">${cols}</tr>`;
      analysis_table.insertAdjacentHTML("beforeend", tab_row);
    });
  } catch (e) {
    console.log(e.message);
  }
});
