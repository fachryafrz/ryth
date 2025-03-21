import { useRouter, useSearchParams } from "next/navigation";
import AsyncSelectFilter from "./Reusable/AsyncSelectFilter";
import { useEffect, useState } from "react";
import { debounce } from "@mui/material";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";
import axios from "axios";

const SEED_TRACKS = "seed_tracks";

export default function Track() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [track, setTrack] = useState();

  const tracksLoadOptions = debounce((inputValue, callback) => {
    const fetchDataWithDelay = async () => {
      const {
        data: { tracks },
      } = await axios.get(`/api/search`, {
        params: { q: inputValue, type: "track" },
      });

      const options = tracks.items.map((track) => ({
        value: track.id,
        label: track.name,
      }));

      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );

      callback(filteredOptions);
    };

    fetchDataWithDelay();
  }, 1000);

  const handleTrackChange = (selectedOption) => {
    const value = selectedOption.map((option) => option.value);

    const params = new URLSearchParams({
      ...Object.fromEntries(current),
      [SEED_TRACKS]: value,
    });

    if (value.length === 0) {
      params.delete(SEED_TRACKS);
    }

    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    const fetchTracks = async (tracks) => {
      const { data } = await axios.get(`/api/tracks`, {
        params: { ids: tracks },
      });

      const formattedTracks = data.tracks.map((track) => ({
        value: track.id,
        label: track.name,
      }));

      setTrack(formattedTracks);
    };

    if (searchParams.get(SEED_TRACKS)) {
      const trackParams = searchParams.get(SEED_TRACKS);

      fetchTracks(trackParams);
    } else {
      setTrack(null);
    }
  }, [searchParams]);

  return (
    <AsyncSelectFilter
      title={"Song"}
      isRequired={isRequired}
      onChange={handleTrackChange}
      loadOptions={tracksLoadOptions}
      value={track}
      placeholder={"Search for a song..."}
      isMulti
    />
  );
}
