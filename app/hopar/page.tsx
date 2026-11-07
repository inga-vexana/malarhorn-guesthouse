import GroupsHero from "../components/groups/GroupsHero";
import GroupsFacilities from "../components/groups/GroupsFacilities";
import GroupsOccasions from "../components/groups/GroupsOccasions";
import GroupsDiscover from "../components/groups/GroupsDiscover";
import GroupsCta from "../components/groups/GroupsCta";

export default function GroupsPage() {
  return (
    <>
      <GroupsHero />
      <GroupsFacilities />
      <GroupsOccasions />
      <GroupsDiscover />
      <GroupsCta />
    </>
  );
}
