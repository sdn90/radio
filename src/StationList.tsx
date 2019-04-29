import * as React from "react";
import { Station, STATIONS } from "./Station";
import "./StationList.css";

interface StationListProps {
  currentStation: Station | undefined;
  setCurrentStation: (station: Station) => void;
}

function isCurrentStation(
  currentStation: Station | undefined,
  station: Station
) {
  if (currentStation === undefined) return false;
  if (currentStation.id === station.id) return true;
  return false;
}

export default function StationList(props: StationListProps) {
  return (
    <div>
      <div style={{ padding: 8 }}>
        <h4
          style={{
            textTransform: "uppercase",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "0.075rem",
            margin: 0,
            color: "#888"
          }}
        >
          Stations
        </h4>
      </div>
      {STATIONS.map(station => (
        <div style={{ padding: 8 }}>
          <a
            className={`station-list-item${
              isCurrentStation(props.currentStation, station)
                ? " station-list-item-active"
                : ""
            }`}
            onClick={() => props.setCurrentStation(station)}
          >
            {station.name}
            {isCurrentStation(props.currentStation, station) ? (
              <span style={{ fontSize: 14, fontWeight: 400 }}>Playing</span>
            ) : null}
          </a>
          <div>{station.city}</div>
        </div>
      ))}
    </div>
  );
}
