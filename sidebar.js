/*********************
*** Main Functions ***
*********************/

// Get and apply the current theme
function setSidebarStyle(theme) {
  const myElement = document.getElementById("myElement");

  if (theme.colors && theme.colors.frame) {
    document.body.style.backgroundColor = theme.colors.frame;
  }
  else {
    document.body.style.backgroundColor = "white";
  }

  if (theme.colors && theme.colors.toolbar) {
    myElement.style.backgroundColor = theme.colors.toolbar;
  }
  else {
    myElement.style.backgroundColor = "e0e0e0";
  }

  if (theme.colors && theme.colors.toolbar_text) {
    myElement.style.color = theme.colors.toolbar_text;
  }
  else {
    myElement.style.color = "white";
  }
}

// Display current tabs
function displayTabs(tabs) {
  const tabsList = document.getElementById("tabsList");

  // Remove all tabs
  while (tabsList.firstChild) {
    tabsList.removeChild(tabsList.firstChild);
  }

  // Add tabs
  for (let tab of tabs) {
    const tabItem = document.createElement("li");
    const tabFavicon = document.createElement("img");
    const tabTitle = document.createElement("span");
    tabFavicon.src = tab.favIconUrl;
    tabFavicon.classList.add("tab-favicon");
    tabItem.appendChild(tabFavicon);
    tabTitle.textContent = tab.title;
    tabTitle.classList.add("tab-title");
    tabItem.appendChild(tabTitle);
    tabItem.classList.add("tab-item");
    tabItem.addEventListener("click", () => {
      browser.tabs.update(tab.id, {active: true});
    });
    if (tab.active) {
      tabItem.classList.add("active");
    }
    tabsList.appendChild(tabItem);
  }
}



/*********************
 *** Initialization ***
 *********************/

// Initialize the sidebar
async function initSidebar() {
  // Get the current theme
  const theme = await browser.theme.getCurrent();
  tabs = await browser.tabs.query({currentWindow: true});
  setSidebarStyle(theme);
  displayTabs(tabs);
}
initSidebar();



/**********************
*** Event Listeners ***
**********************/

// Listen for theme changes
browser.theme.onUpdated.addListener(async ({theme, windowId}) => {
  const currentWindow = await browser.windows.getCurrent();
  if (!windowId || windowId === currenWindow.id) {
    setSidebarStyle(theme);
  }
});

// Listen for any changes to the tabs
browser.tabs.onActivated.addListener(async ({tabId, windowId}) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onAttached.addListener(async ({tabId, windowId}) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onCreated.addListener(async (tab) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onDetached.addListener(async ({tabId, windowId}) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onHighlighted.addListener(async ({tabIds, windowId}) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onMoved.addListener(async ({tabId, windowId}) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onReplaced.addListener(async ({addedTabId, removedTabId}) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  tabs = await browser.tabs.query({currentWindow: true});
  displayTabs(tabs);
});
