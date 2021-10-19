type EndomondoPointType = [
  {
    location: [[{ latitude: number }, { longitude: number }]];
  },
  { altitude: number },
  { distance_km: number },
  { speed_kmh: number },
  { timestamp: string },
];

type EndomondoCommentType = [{ author: string }, { created_date: string }, { text: string }];

type EndomondoFileContent = [
  { name: string },
  { sport: string },
  { source: string },
  { created_date: string },
  { start_time: string },
  { end_time: string },
  { notes: string },
  { duration_s: number },
  { distance_km: number },
  { altitude_min_m: number },
  { altitude_max_m: number },
  { speed_avg_kmh: number },
  { speed_max_kmh: number },
  { ascend_m: number },
  { descend_m: number },
  { points: EndomondoPointType[] },
  { comments: EndomondoCommentType[] },
];

type CleanEndomondoPointType = {
  location: {
    latitude: number;
    longitude: number;
  };
  altitude: number;
  distance_km: number;
  speed_kmh: number;
  timestamp: string;
};

type CleanEndomondoCommentType = {
  author: string;
  created_date: string;
  text: string;
};

type CleanEndomondoJson = {
  name: string;
  sport: string;
  source: string;
  created_date: string;
  start_time: string;
  end_time: string;
  notes: string;
  duration_s: number;
  distance_km: number;
  altitude_min_m: number;
  altitude_max_m: number;
  speed_avg_kmh: number;
  speed_max_kmh: number;
  ascend_m: number;
  descend_m: number;
  points: CleanEndomondoPointType[];
  comments: CleanEndomondoCommentType[];
};

function fixEndomondoJson(raw: EndomondoFileContent | EndomondoPointType | EndomondoCommentType): CleanEndomondoJson {
  // @ts-ignore todo
  return raw.reduce((acc, row) => {
    const [[key, value]] = Object.entries(row);
    if (key === 'location') {
      // @ts-ignore todo
      const rawLocation = fixEndomondoJson(value[0]);
      return {
        ...acc,
        location: rawLocation,
      };
    }
    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map((v) => fixEndomondoJson(v)),
      };
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
}

/**
 * @summary Converts Endomondo's JSON data to a friendlier structure.
 * @description Converts Endomondo's JSON data to a friendlier structure. Primarily this means stripping out all the unnecessary arrays.
 *
 * @param {(object|string)} fileContent Source file contents. Contents given as a string will automatically be parsed to json
 * @return object fileContent converted to friendlier JSON structure. See {@link ../README.md|README} for input/output examples.
 *
 * @type {(fileContent: EndomondoFileContent) => CleanEndomondoJson}
 */
function processEndomondoFileContent(fileContent: EndomondoFileContent | string) {
  const rawJson = typeof fileContent === 'string' ? (JSON.parse(fileContent) as EndomondoFileContent) : fileContent;
  return fixEndomondoJson(rawJson);
}

export default processEndomondoFileContent;
