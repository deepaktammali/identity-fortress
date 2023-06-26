interface Props {
  className?: string;
}

const SideNav = ({ children, className }: React.PropsWithChildren<Props>) => {
  return (
    <nav className={className}>
      <ul>{children}</ul>
    </nav>
  );
};

export default SideNav;
