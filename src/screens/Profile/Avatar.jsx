import Avatar from "react-avatar";

export default function ProfileAvatar({ image, name, size }) {
    return (
      <div>
        <Avatar name={name} src={image} size={!size ? ("100") : ("50")} round={true} color="#801AE5" />
      </div>
    );
  }