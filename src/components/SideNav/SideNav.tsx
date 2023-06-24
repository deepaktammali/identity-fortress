interface Props {}

const SideNav = ({ children }: React.PropsWithChildren<Props>) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
};

export default SideNav;
