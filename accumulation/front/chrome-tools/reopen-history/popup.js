
function onAnchorClick(event) {
    chrome.tabs.create({
      selected: true,
      url: event.srcElement.href
    });
    return false;
  }

  // Search history to find up to ten links that a user has typed in,
  // and show those links in a popup.
  function buildTypedUrlList(divName) {
    // To look for history items visited in the last week,
    // subtract a week of microseconds from the current time.
    let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 1;
    let oneWeekAgo = new Date().getTime() - microsecondsPerWeek;

    let tabsUrls = [];
    chrome.tabs.query({}, function (tabs) {
      tabsUrls = tabs.map(item => item.url)

      chrome.history.search(
        {
          text: '', // Return every history item....
          startTime: oneWeekAgo,
          maxResults: 100 // that was accessed less than one week ago.
        },
        function (historyItems) {
          let urlSet = new Set();
          for (let i = 0; i < historyItems.length; ++i) {
            if (!tabsUrls.includes(historyItems[i].url)) {
              urlSet.add(JSON.stringify(historyItems[i]));
            }
          }
          let tempHistoryItems = Array.from(urlSet).map(item => {
            let tempItem = JSON.parse(item);
            return {
              url: tempItem.url,
              title: tempItem.title,
              time: formatTime(new Date(tempItem.lastVisitTime))
            }
          });
          buildPopupDom(divName, tempHistoryItems);
        }
      );
    })
  }

  // Given an array of URLs, build a DOM list of those URLs in the
  // browser action popup.
  function buildPopupDom(divName, data) {
    let popupDiv = document.getElementById(divName);

    let ul = document.createElement('ul');
    popupDiv.appendChild(ul);

    for (let i = 0, ie = data.length; i < ie; ++i) {
      console.log(data[i]);
      let url = data[i].url;
      let title = data[i].title;
      let iconUrl = url.split('/')[0] + '/' + url.split('/')[2] + '/favicon.ico';

      let img = document.createElement('img');
      img.src = iconUrl;
      img.style.width = '14px';
      img.style.height = '14px';
      img.style.marginRight = '16px';

      let a = document.createElement('a');
      a.textContent = title;
      a.href = url;
      a.style.overflow = 'hidden';
      a.style.fontSize = '14px';
      a.addEventListener('click', onAnchorClick);

      let li = document.createElement('li');
      li.appendChild(img);
      li.appendChild(a);

      li.style.marginBottom = '12px';
      li.style.dipslay = 'flex';
      li.style.alignItems = 'center';

      ul.appendChild(li);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildTypedUrlList('typedUrl_div');
  });


  function formatTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

