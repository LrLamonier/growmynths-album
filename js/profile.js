//////////////////////////////
///// Profile
//////////////////////////////

// https://xivapi.com/character/30576346

const characterData = async function () {
  try {
    const response = await fetch("https://xivapi.com/character/30576346");
    const data = await response.json();
    const jobLevels = data.Character.ClassJobs;
    console.log(data);

    const selectJob = function (jobLevels) {
      jobLevels.forEach(function (job, i) {
        const getTextEl = document.querySelector(`[data-job='${i}']`);
        const getJobLvl = job.Level;
        if (getJobLvl === 0) return;
        getTextEl.innerHTML = getJobLvl;
      });
    };
    selectJob(jobLevels);

    const liveViewEl = document.querySelector(".portrait");
    const portrait = data.Character.Portrait;

    const liveViewImg = function (portraitUrl) {
      liveViewEl.src = portraitUrl;
    };

    liveViewImg(portrait);
  } catch (err) {
    console.log(err);
  }
};
characterData();
