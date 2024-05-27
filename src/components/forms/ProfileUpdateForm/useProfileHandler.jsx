import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileByName,
  updateProfile,
} from "../../../store/profile/profileSlice";
import { useEffect, useState } from "react";
import ProfileSettingsAlert from "../../../pages/update/profile/component/Alert";

export const useProfileHandler = (reset) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const profileData = useSelector((state) => state.profile);
  const profileName = profileData.name;
  const venues = useSelector((state) => state.venues.myCreatedVenues);

  useEffect(() => {
    async function fetchAndSetProfile() {
      try {
        if (!profileName) {
          console.error("Profile name is undefined");
          return;
        }

        const response = await dispatch(
          fetchProfileByName(profileName)
        ).unwrap();
        console.log("Fetched profile response:", response);

        const data = response.data;
        const avatarUrl = data.avatar ? data.avatar.url : "";
        const bannerUrl = data.banner ? data.banner.url : "";

        reset({
          bio: data.bio,
          avatar: { url: avatarUrl },
          banner: { url: bannerUrl },
          venueManager: data.venueManager,
        });

        setChecked(data.venueManager);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    }

    fetchAndSetProfile();
  }, [dispatch, reset, profileName]);

  // Handle Submit Profile

  const handleSubmitProfile = async (data) => {
    if (!profileData || !profileData.name) {
      console.error("Profile data is incomplete");
      throw new Error("Profile data is incomplete");
    }

    if (!checked && venues.length > 0) {
      console.log("You must delete all venues before switching to customer.");
      throw new Error(
        "You must delete all venues before switching to customer."
      );
    }

    const processedData = {
      ...data,
      avatar: { url: data.avatar?.url || null },
      banner: { url: data.banner?.url || null },
      venueManager: checked,
    };

    console.log(processedData);

    try {
      const result = await dispatch(
        updateProfile({ profileName: profileData.name, data: processedData })
      ).unwrap();
      console.log("Update successful", result);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    profileData,
    checked,
    setChecked,
    profileName,
    handleSubmitProfile,
  };
};
