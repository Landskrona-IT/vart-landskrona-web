const urlParams = new URLSearchParams(window.location.search);
const formIdWebParam = urlParams.get("formIdWeb");
const formIdAppParam = urlParams.get("formIdApp");

const AppData = {
  urls: {
    ios: "https://apps.apple.com/se/app/ett-b%C3%A4ttre-helsingborg/id1061079182",
    android: "https://play.google.com/store/apps/details?id=se.helsingborg.EttBattreHelsingborg&hl=sv",
    noLink: "#nolink",
  },
  formIds: {
    app: formIdAppParam || "DI6su97z1SAALJXZBxYA",
    web: formIdWebParam || "DI6su97z1SAALJXZBxYA",
  },
};

export default AppData;