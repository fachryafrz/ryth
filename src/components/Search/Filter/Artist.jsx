import { useRouter, useSearchParams } from "next/navigation";
import AsyncSelectFilter from "./Reusable/AsyncSelectFilter";
import { useEffect, useState } from "react";
import { debounce } from "@mui/material";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";
import axios from "axios";

const SEED_ARTISTS = "seed_artists";

export default function Artist() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [artist, setArtist] = useState();

  const artistsLoadOptions = debounce((inputValue, callback) => {
    const fetchDataWithDelay = async () => {
      const {
        data: { artists },
      } = await axios.get(`/api/search`, {
        params: { q: inputValue, type: "artist" },
      });

      const options = artists.items.map((artist) => ({
        value: artist.id,
        label: artist.name,
      }));

      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );

      callback(filteredOptions);
    };

    fetchDataWithDelay();
  }, 1000);

  const handleArtistChange = (selectedOption) => {
    const value = selectedOption.map((option) => option.value);

    const params = new URLSearchParams({
      ...Object.fromEntries(current),
      [SEED_ARTISTS]: value,
    });

    if (value.length === 0) {
      params.delete(SEED_ARTISTS);
    }

    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    const fetchArtists = async (artists) => {
      const { data } = await axios.get(`/api/artists`, {
        params: { ids: artists },
      });

      const formattedArtists = data.artists.map((artist) => ({
        value: artist.id,
        label: artist.name,
      }));

      setArtist(formattedArtists);
    };

    if (searchParams.get(SEED_ARTISTS)) {
      const artistParams = searchParams.get(SEED_ARTISTS);

      fetchArtists(artistParams);
    } else {
      setArtist(null);
    }
  }, [searchParams]);

  return (
    <AsyncSelectFilter
      title={"Artist"}
      isRequired={isRequired}
      onChange={handleArtistChange}
      loadOptions={artistsLoadOptions}
      value={artist}
      placeholder={"Search for an artist..."}
      isMulti
    />
  );
}
