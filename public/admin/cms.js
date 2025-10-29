import CMS from "decap-cms-app";

const ActPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const image = getAsset(data.image);

  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", width: "300px" }}>
      {image && <img src={image} alt={data.title} style={{ width: "100%", borderRadius: "8px" }} />}
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {data.categories && data.categories.map(cat => <span key={cat}>{cat} </span>)}
      {data.keywords && data.keywords.map(tag => <small key={tag}>#{tag} </small>)}
    </div>
  );
};

CMS.registerPreviewTemplate("acts", ActPreview);
