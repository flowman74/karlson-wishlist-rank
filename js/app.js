const karlsonSteamId = 1228610;

const faqQuestions = document.querySelectorAll('.faq__question');
const faqContents = document.querySelectorAll('.faq__content');
const rankEl = document.querySelector('.rank');

faqQuestions.forEach((el, i) => {
  el.addEventListener('click', () => {
    faqContents[i].classList.toggle('visible');
  });
});

// Shit. I have to use XMLHttpRequest.
// Note: I have never used XMLHttpRequest before.
const setRank = () => {
  const selector = `#table-apps > tbody > tr[data-appid="${karlsonSteamId}"] > td:first-child`;
  const req = new XMLHttpRequest();
  req.open('GET', 'https://steamdb.info/stats/mostwished/', true);
  req.responseType = 'document';
  req.onload = () => {
    if (req.status === 200) {
      const rank = req.responseXML.querySelector(selector).textContent;
      rankEl.textContent = rank.substr(1);
    } else {
      console.error(req.status, req.statusText);
    }
  };
  req.onerror = function (e) {
    console.error(req.status, req.statusText);
  };
  req.send(null);
};

setRank();
