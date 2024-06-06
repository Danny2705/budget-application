import Avatar from "react-avatar";

export default function ProfileAvatar({ image, name }) {
    return (
      <div>
        <Avatar name={name} src={image} size="100" round={true} color="#801AE5" />
      </div>
    );
  }