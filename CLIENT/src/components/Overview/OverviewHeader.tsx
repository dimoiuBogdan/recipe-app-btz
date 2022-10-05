import Image from "next/image";
import { useRouter } from "next/router";
import PlaceholderProfileImage from "../../resources/images/profile_image_placeholder.png";

const OverviewHeader = () => {
  const router = useRouter();

  const redirectToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-zinc-600 font-medium">Good afternoon,</div>
        <div className="font-medium text-xl">Dimoiu Bogdan</div>
      </div>
      <Image
        onClick={redirectToProfile}
        className="rounded-full shadow-md overflow-hidden cursor-pointer"
        src={PlaceholderProfileImage}
        width="60"
        height="60"
        alt="profile_image"
      />
    </div>
  );
};

export default OverviewHeader;
