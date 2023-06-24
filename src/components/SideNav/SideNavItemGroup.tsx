import * as Collapsible from "@radix-ui/react-collapsible";

type Props = {
  slug: string;
  heading: string;
};

const SideNavItemGroup = (props: React.PropsWithChildren<Props>) => {
  const { children, heading } = props;

  return (
    <li>
      <Collapsible.Root>
        <Collapsible.Trigger>{heading}</Collapsible.Trigger>
        <Collapsible.Content>
          <ul className="flex flex-col">{children}</ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  );
};

export default SideNavItemGroup;
