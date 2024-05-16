import React from "react";
import NiceSelect from "@/ui/nice-select";

const SocialLinkSelect = ({setSingleLink,singleLink}:any) => {
  const handleState = (item: { value: string; label: string }) => {
    setSingleLink({...singleLink,label:item.value});
  };
  return (
    <NiceSelect
      options={[
        { value: "Linkedin", label: "Linkedin" },
        { value: "Twitter", label: "Twitter" },
        { value: "Facebook", label: "Facebook" },
        { value: "Instagram", label: "Instagram" },
        { value: "Github", label: "Github" },  
      ]}
      defaultCurrent={0}
      onChange={(item) => handleState(item)}
      name="State"
    />
  );
};

export default SocialLinkSelect;