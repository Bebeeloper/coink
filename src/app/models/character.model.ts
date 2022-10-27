export interface Characters {
  info:    Info;
  results: Result[];
}

interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

interface Result {
  id:       number;
  name:     string;
  status:   string;
  species:  string;
  type:     string;
  gender:   string;
  origin:   Location;
  location: Location;
  image:    string;
  episode:  string[];
  url:      string;
  created:  Date;
}
