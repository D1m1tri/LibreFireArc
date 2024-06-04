/*********************
 *** Main Functions ***
 *********************/

// Get and apply the current theme
function setSidebarStyle(theme) {
  var root = document.querySelector(':root');

  if (theme.colors) {
    root.style.setProperty('--bg-color', theme.colors.frame ? theme.colors.frame : "white");
    root.style.setProperty('--tb-color', theme.colors.toolbar ? theme.colors.toolbar : "e0e0e0");
    root.style.setProperty('--tb-text-color', theme.colors.toolbar_text ? theme.colors.toolbar_text : "white");
    root.style.setProperty('--btn-bg-hvr', theme.colors.button_background_hover ? theme.colors.button_background_hover : "555");

    // Tab styles
    root.style.setProperty('--tab-bg-color', theme.colors.tab_selected ? theme.colors.tab_selected : theme.colors.button_background_hover ? theme.colors.button_background_hover : "555");
    root.style.setProperty('--tab-line', theme.colors.tab_line ? theme.colors.tab_line : theme.colors.toolbar_text ? theme.colors.toolbar_text : "white");
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
    tabFavicon.src = tab.favIconUrl;
    tabFavicon.classList.add("tab-favicon");
    tabItem.appendChild(tabFavicon);

    const tabTitle = document.createElement("div");
    tabTitle.textContent = tab.title;
    tabTitle.classList.add("tab-title");
    tabItem.appendChild(tabTitle);

    tabItem.classList.add("tab-item");
    tabItem.addEventListener("dblclick", () => {
      browser.tabs.remove(tab.id);
    });
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
for (let event of ["onActivated", "onAttached", "onCreated", "onDetached", "onHighlighted", "onMoved", "onRemoved", "onReplaced", "onUpdated"]) {
  browser.tabs[event].addListener(async () => {
    tabs = await browser.tabs.query({currentWindow: true});
    displayTabs(tabs);
  });
}

// create tab
document.querySelector(".create-tab").addEventListener("click", () => {
  browser.tabs.create({});
});
// back
document.querySelector(".tab-back").addEventListener("click", () => {
  browser.tabs.goBack();
});
// forward
document.querySelector(".tab-forward").addEventListener("click", () => {
  browser.tabs.goForward();
});
// reload
document.querySelector(".tab-reload").addEventListener("click", () => {
  browser.tabs.reload();
});
