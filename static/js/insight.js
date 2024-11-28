const Insight = (refined_result) => {
  let insight_element = "";

  const insight_arr = [];
  Object.entries(refined_result).forEach(entry => {
    const [key, value] = entry
    if(key == 'threat_score') {
        let ts_stat = value <= 50;
        insight_arr.push(["Threat Score", ts_stat])
    }
    else if (key == 'age') {
        let url_age = Number(value.split(' ')[0]) > 2;
        insight_arr.push(["Domain Age", url_age])
    }
    else if (key == 'similar_count') {
        let similar_count = value <= 2;
        insight_arr.push(["Similar URLs", similar_count])
    }
    else if (key == 'rank') {
        let rank_value = value != 0;
        insight_arr.push(["Domain Rank", rank_value])
    }
  })

  insight_arr.forEach(insight => {
    const [desc, value] = insight
    let each_insight = `
        <p class="${value ? 'bg-green-500' : 'bg-red-500'} py-2 pl-5 mb-2 rounded-md" id="insight-line">
            <span class="material-symbols-rounded ${value ? 'bg-green-500' : 'bg-red-500'} text-white absolute">${value ? 'task_alt' : 'cancel'}</span>
            <span class="pl-8 text-white">${desc}</span>
        </p>`;

    insight_element += each_insight;
  });

  return insight_element;

};

export { Insight };
