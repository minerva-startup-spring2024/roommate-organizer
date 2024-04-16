"use client";

import EntityPreview from "./EntityPreview/EntityPreview";

export default function EntitiesOverview({ entity, entityType }) {
  return (
    <div>
      {entity.length > 0 ? (
        entity.map((entity, index) => (
          <EntityPreview entity={entity} key={index} entityType={entityType} />
        ))
      ) : (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          No {entityType} yet. Create one to get started!
        </p>
      )}
    </div>
  );
}
