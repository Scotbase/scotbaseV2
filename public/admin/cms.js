// cms.js
// CMS is already available globally from the decap-cms-app CDN

CMS.registerPreviewTemplate("acts", ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const image = getAsset(data.image);

  return `
    <div style="border:1px solid #ccc; padding:16px; width:300px;">
      ${image ? `<img src="${image}" style="width:100%; border-radius:8px;" />` : ""}
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      ${
        data.categories
          ? data.categories.map(cat => `<span>${cat}</span>`).join(" ")
          : ""
      }
      ${
        data.keywords
          ? data.keywords.map(tag => `<small>#${tag}</small>`).join(" ")
          : ""
      }
    </div>
  `;
});
