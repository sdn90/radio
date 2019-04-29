export interface Station {
  id: number;
  name: string;
  city: string;
  streams: StationStream[];
}

export interface StationStream {
  url: string;
}

export const STATIONS: Station[] = [
  {
    id: 1,
    name: "NTS",
    city: "London",
    streams: [
      { url: "https://stream-relay-geo.ntslive.net/stream?client=NTSWebApp" }
    ]
  },
  {
    id: 2,
    name: "Rinse FM",
    city: "London",
    streams: [{ url: "http://206.189.117.157:8000/stream" }]
  },
  {
    id: 3,
    name: "The Lot Radio",
    city: "Brooklyn",
    streams: [
      {
        url: "http://thelot.out.airtime.pro:8000/thelot_b"
      }
    ]
  },
  {
    id: 4,
    name: "Reprezent Radio",
    city: "London",
    streams: [{ url: "http://radio.canstream.co.uk:8022/live.mp3" }]
  },
  {
    id: 5,
    name: "House FM",
    city: "London",
    streams: [{ url: "https://streamer.radio.co/s0de514535/listen" }]
  }
];
