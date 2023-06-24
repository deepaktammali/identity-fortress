import { useAuthStore } from "../stores/auth";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="font-extrabold">
      <div className="flex gap-1 items-end">
        <span>Hello, </span>
        <span className="text-blue-700 text-xl">{user!.attributes.email}</span>
      </div>
    </div>
  );
};

export default HomePage;
