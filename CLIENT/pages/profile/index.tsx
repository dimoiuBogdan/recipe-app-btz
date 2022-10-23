import React from "react";

const ProfilePage = () => {
  return <div>Profile Page</div>;
};

export default ProfilePage;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}
